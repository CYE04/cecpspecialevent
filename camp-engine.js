/**
 * camp-engine.js v1.2
 * CECP 读经营 / 特会渲染引擎
 * 托管仓库：cecpspecialevent（GitHub Pages），所有营会帖子共用
 *
 * 使用方式：
 *   <div id="pdc-root"></div>
 *   <script src="https://cye04.github.io/cecpspecialevent/camp-engine.js"></script>
 *   <script>CampEngine.render('PDDuJingYing2026', document.getElementById('pdc-root'));</script>
 *
 * 数据文件：camp/<id>.json（与本文件同仓库；引擎与数据分离，办下一届只需新增一个 JSON）。
 * 诗歌渲染：完全复用 Cecp 仓库 youth-engine.js 暴露的 YouthEngine.buildSongSet(songIds)，
 *           本文件不包含任何和弦谱 / 播放器 / chord-engine 实现。
 *           youth-engine.js 与 songs/*.json 始终从 Cecp 仓库（PDC_YE_SRC / YM_BASE）加载，
 *           若页面未引入 youth-engine.js，会在首次打开敬拜详情时自动动态加载。
 */

/* ══════════ 基础路径 ══════════ */
/* camp 数据：随本脚本所在域（本地测试用本地数据），回退 cecpspecialevent 的 GitHub Pages */
var PDC_BASE = (function () {
  try {
    var cur = document.currentScript && document.currentScript.src ? new URL(document.currentScript.src, location.href) : null;
    if (cur) return cur.href.replace(/\/[^\/]*$/, '');
  } catch (_) {}
  return 'https://cye04.github.io/cecpspecialevent';
})();
/* 诗歌渲染引擎：固定在 Cecp 仓库（歌库 songs/ 也在那里，由 youth-engine 内部的 YM_BASE 决定） */
var PDC_YE_SRC = 'https://cye04.github.io/Cecp/youth-engine.js';

window.CampEngine = {};

(function () {
  'use strict';

  var C = null;   // 当前营会数据
  var ROOT = null;

  /* ══════════════ DOM helpers ══════════════ */
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function div(cls, children) { return el('div', { class: cls }, children); }

  function findById(list, id) {
    list = list || [];
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === id) return list[i];
    return null;
  }

  /* ══════════════ youth-engine 按需加载 ══════════════ */
  var _yePromise = null;
  function ensureYouthEngine() {
    if (window.YouthEngine && typeof window.YouthEngine.buildSongSet === 'function') {
      return Promise.resolve();
    }
    if (_yePromise) return _yePromise;
    _yePromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = PDC_YE_SRC;
      s.onload = function () {
        if (window.YouthEngine && typeof window.YouthEngine.buildSongSet === 'function') resolve();
        else reject(new Error('youth-engine.js 已加载，但未找到 buildSongSet API'));
      };
      s.onerror = function () { reject(new Error('无法加载 youth-engine.js（诗歌渲染依赖）')); };
      document.head.appendChild(s);
    });
    return _yePromise;
  }

  /* ══════════════ CSS 只注入一次 ══════════════ */
  var _cssInjected = false;
  function injectCSS() {
    if (_cssInjected) return;
    _cssInjected = true;

    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;800;900&display=swap';
    document.head.appendChild(fontLink);

    var style = document.createElement('style');
    style.textContent = `
:root{
  --pdc-bg:#f6f8fb;--pdc-card:#ffffff;--pdc-ink:#1a1815;--pdc-ink2:#7c746c;--pdc-ink3:#b0a89f;
  --pdc-border:rgba(0,0,0,.08);--pdc-border-md:rgba(0,0,0,.15);--pdc-soft:rgba(26,24,21,.05);
  --pdc-sh:0 2px 10px rgba(15,23,42,.06),0 1px 2px rgba(15,23,42,.04);
  --pdc-sh-lg:0 18px 56px rgba(15,23,42,.16),0 3px 10px rgba(15,23,42,.06);
  --pdc-brand:#3157f6;--pdc-brand-soft:rgba(49,87,246,.09);--pdc-brand-ln:rgba(49,87,246,.22);
  --pdc-gold:#b58a2c;--pdc-gold-soft:rgba(181,138,44,.10);--pdc-gold-ln:rgba(181,138,44,.28);
  --pdc-mint:#0e9f89;--pdc-mint-soft:rgba(14,159,137,.09);
  --pdc-bk:rgba(15,23,42,.58);
  --pdc-glass:rgba(255,255,255,.82);
  --pdc-serif:"Noto Serif SC","Songti SC",serif;
}
@media(prefers-color-scheme:dark){
  :root{
    --pdc-bg:#0f172a;--pdc-card:#141d31;--pdc-ink:rgba(255,255,255,.90);--pdc-ink2:rgba(255,255,255,.50);--pdc-ink3:rgba(255,255,255,.26);
    --pdc-border:rgba(255,255,255,.09);--pdc-border-md:rgba(255,255,255,.18);--pdc-soft:rgba(255,255,255,.06);
    --pdc-sh:0 2px 10px rgba(0,0,0,.4),0 1px 3px rgba(0,0,0,.3);
    --pdc-sh-lg:0 20px 60px rgba(0,0,0,.55),0 3px 10px rgba(0,0,0,.35);
    --pdc-brand:#7c9cff;--pdc-brand-soft:rgba(124,156,255,.13);--pdc-brand-ln:rgba(124,156,255,.30);
    --pdc-gold:#e2b656;--pdc-gold-soft:rgba(226,182,86,.12);--pdc-gold-ln:rgba(226,182,86,.30);
    --pdc-mint:#38cdb4;--pdc-mint-soft:rgba(56,205,180,.12);
    --pdc-bk:rgba(0,0,0,.74);
    --pdc-glass:rgba(17,24,39,.82);
  }
}
.pdc-page,.pdc-page *{box-sizing:border-box}

/* ── 动效 ── */
.pdc-reveal{opacity:0}
.pdc-reveal.in{animation:pdc-rise .65s cubic-bezier(.2,.7,.2,1) both}
@keyframes pdc-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes pdc-drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,22px) scale(1.1)}}
@keyframes pdc-body-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){
  .pdc-reveal{opacity:1!important;transform:none!important;transition:none!important}
  .pdc-page *{animation-duration:.01ms!important;animation-iteration-count:1!important}
}
.pdc-page{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:var(--pdc-ink);line-height:1.65;max-width:1020px;margin:0 auto;padding:8px 4px 56px;font-size:clamp(14px,.3vw + 13px,16px)}
.pdc-hr{border:none;border-top:1px solid var(--pdc-border);margin:38px 0}

/* ── Hero ── */
.pdc-hero{position:relative;overflow:hidden;background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:26px;box-shadow:var(--pdc-sh-lg);padding:44px 26px 34px;text-align:center;isolation:isolate}
.pdc-hero::before{content:'';position:absolute;width:420px;height:420px;left:-140px;top:-220px;border-radius:50%;background:radial-gradient(circle,var(--pdc-brand-soft),transparent 65%);filter:blur(8px);z-index:-1;animation:pdc-drift 16s ease-in-out infinite alternate}
.pdc-hero::after{content:'';position:absolute;width:460px;height:460px;right:-160px;bottom:-260px;border-radius:50%;background:radial-gradient(circle,var(--pdc-gold-soft),transparent 65%);filter:blur(8px);z-index:-1;animation:pdc-drift 20s ease-in-out infinite alternate-reverse}
.pdc-hero>*{animation:pdc-rise .7s cubic-bezier(.2,.8,.2,1) both}
.pdc-hero>*:nth-child(2){animation-delay:.08s}
.pdc-hero>*:nth-child(3){animation-delay:.16s}
.pdc-hero>*:nth-child(4){animation-delay:.24s}
.pdc-hero>*:nth-child(5){animation-delay:.32s}
.pdc-hero>*:nth-child(6){animation-delay:.40s}
.pdc-hero>*:nth-child(7){animation-delay:.48s}
.pdc-hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:.78em;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:var(--pdc-ink3);margin:0 0 16px}
.pdc-hero-eyebrow::before,.pdc-hero-eyebrow::after{content:'';width:34px;height:1px;background:var(--pdc-gold-ln)}
.pdc-hero-title{font-family:var(--pdc-serif);font-size:clamp(1.9em,5.4vw,2.9em);font-weight:900;margin:0 0 12px;letter-spacing:.02em;line-height:1.25}
.pdc-hero-sub{font-family:var(--pdc-serif);font-size:clamp(1em,2.8vw,1.22em);font-weight:700;color:var(--pdc-gold);margin:0 0 18px;line-height:1.6}
.pdc-hero-divider{width:56px;height:2px;margin:0 auto 18px;background:linear-gradient(90deg,transparent,var(--pdc-gold),transparent)}
.pdc-hero-intro{color:var(--pdc-ink2);max-width:660px;margin:0 auto 24px;text-align:justify;text-align-last:center;line-height:1.9}
.pdc-pills{display:flex;flex-wrap:wrap;gap:9px;justify-content:center}
.pdc-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:999px;background:var(--pdc-glass);border:1px solid var(--pdc-border-md);font-size:.9em;font-weight:650;box-shadow:var(--pdc-sh);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.pdc-info{margin:18px auto 0;max-width:620px;text-align:left;border:1px dashed var(--pdc-border-md);border-radius:14px;padding:12px 18px;font-size:.9em;color:var(--pdc-ink2)}
.pdc-info b{color:var(--pdc-ink)}
.pdc-info>div{margin:7px 0;line-height:1.8}

/* ── Section title ── */
.pdc-sec-title{font-family:var(--pdc-serif);font-size:1.35em;font-weight:800;margin:0 0 6px;display:flex;align-items:center;gap:9px}
.pdc-sec-cap{font-size:.85em;color:var(--pdc-ink2);margin:0 0 18px}

/* ── 整体时间表 ── */
.pdc-tt-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:4px 2px 12px;scrollbar-width:thin}
.pdc-tt{display:grid;grid-template-columns:repeat(4,minmax(228px,1fr));gap:12px;min-width:940px}
.pdc-tt-col{background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:18px;box-shadow:var(--pdc-sh);padding:12px;display:flex;flex-direction:column;gap:7px}
.pdc-tt-head{display:flex;align-items:baseline;gap:8px;padding:4px 6px 10px;border-bottom:2px solid var(--pdc-gold-ln);margin-bottom:4px}
.pdc-tt-date{font-family:var(--pdc-serif);font-size:1.25em;font-weight:900;color:var(--pdc-brand)}
.pdc-tt-label{font-weight:700;color:var(--pdc-ink2);font-size:.9em}
.pdc-tt-item{display:flex;flex-direction:column;gap:1px;border:1px solid var(--pdc-border);border-radius:12px;padding:7px 10px;font:inherit;color:var(--pdc-ink);text-align:left;background:var(--pdc-soft)}
.pdc-tt-item .t{font-size:.76em;font-weight:700;color:var(--pdc-ink2);font-variant-numeric:tabular-nums;letter-spacing:.02em}
.pdc-tt-item .e{font-size:.9em;font-weight:650;line-height:1.45}
.pdc-tt-item.is-sermon{background:var(--pdc-brand-soft);border-color:var(--pdc-brand-ln)}
.pdc-tt-item.is-sermon .e{color:var(--pdc-brand)}
.pdc-tt-item.is-worship{background:var(--pdc-gold-soft);border-color:var(--pdc-gold-ln)}
.pdc-tt-item.is-worship .e{color:var(--pdc-gold)}
.pdc-tt-item.is-groups{background:var(--pdc-mint-soft);border-color:var(--pdc-mint)}
.pdc-tt-item.is-groups .e{color:var(--pdc-mint)}
button.pdc-tt-item{cursor:pointer;transition:transform .14s ease,box-shadow .14s ease}
button.pdc-tt-item:hover{transform:translateY(-1px);box-shadow:var(--pdc-sh)}
.pdc-tt-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font-size:.82em;color:var(--pdc-ink2)}
.pdc-tt-legend span{display:inline-flex;align-items:center;gap:6px}
.pdc-tt-legend i{width:11px;height:11px;border-radius:4px;display:inline-block}
.pdc-tt-legend .lg-sermon i{background:var(--pdc-brand-soft);border:1px solid var(--pdc-brand-ln)}
.pdc-tt-legend .lg-worship i{background:var(--pdc-gold-soft);border:1px solid var(--pdc-gold-ln)}
.pdc-tt-legend .lg-groups i{background:var(--pdc-mint-soft);border:1px solid var(--pdc-mint)}
.pdc-tt-legend .lg-plain i{background:var(--pdc-soft);border:1px solid var(--pdc-border)}
.pdc-tt-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 12px}
.pdc-zoom-btn{display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:.88em;font-weight:700;color:var(--pdc-brand);background:var(--pdc-brand-soft);border:1px solid var(--pdc-brand-ln);border-radius:999px;padding:7px 16px;cursor:pointer;transition:transform .12s,filter .15s}
.pdc-zoom-btn:hover{filter:brightness(1.06);transform:translateY(-1px)}

/* ── 时间表放大查看器 ── */
.pdc-zoom{display:flex;flex-direction:column;height:100%;min-height:0}
.pdc-zoom-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:0 0 12px}
.pdc-zoom-tools button{font:inherit;font-size:.85em;font-weight:700;color:var(--pdc-ink);background:var(--pdc-card);border:1px solid var(--pdc-border-md);border-radius:999px;padding:6px 14px;cursor:pointer;transition:background .15s,transform .12s}
.pdc-zoom-tools button:hover{background:var(--pdc-soft)}
.pdc-zoom-tools button:active{transform:scale(.94)}
.pdc-zoom-pct{font-size:.82em;color:var(--pdc-ink2);font-variant-numeric:tabular-nums;min-width:44px;text-align:center}
.pdc-zoom-hint{font-size:.78em;color:var(--pdc-ink3);margin-left:auto}
.pdc-zoom-area{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;border:1px solid var(--pdc-border);border-radius:16px;background:var(--pdc-soft)}
.pdc-zoom-sizer{position:relative}
.pdc-zoom-inner{position:absolute;left:0;top:0;transform-origin:0 0;padding:12px}
.pdc-zoom-inner .pdc-tt{min-width:0}

/* ── 分组名单 ── */
.pdc-groups-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.pdc-group-card{background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:16px;padding:14px 16px;box-shadow:var(--pdc-sh)}
.pdc-group-name{font-family:var(--pdc-serif);font-weight:900;font-size:1.05em;margin:0 0 8px;color:var(--pdc-mint)}
.pdc-group-leader{display:inline-flex;align-items:center;gap:5px;font-size:.8em;font-weight:700;color:var(--pdc-mint);background:var(--pdc-mint-soft);border:1px solid var(--pdc-mint);border-radius:999px;padding:2px 10px;margin-bottom:9px}
.pdc-group-members{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:6px}
.pdc-group-members li{background:var(--pdc-soft);border:1px solid var(--pdc-border);border-radius:8px;padding:3px 10px;font-size:.88em}

/* ── Day accordion ── */
.pdc-day{background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:20px;box-shadow:var(--pdc-sh);margin-bottom:14px;overflow:hidden;transition:box-shadow .2s ease}
.pdc-day.open{box-shadow:var(--pdc-sh-lg)}
.pdc-day-head{display:flex;align-items:center;gap:14px;width:100%;padding:16px 20px;background:none;border:none;cursor:pointer;font:inherit;color:var(--pdc-ink);text-align:left}
.pdc-day-head:hover{background:var(--pdc-soft)}
.pdc-day-badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:50px;padding:6px 12px;border-radius:12px;background:linear-gradient(135deg,var(--pdc-brand-soft),var(--pdc-gold-soft));border:1px solid var(--pdc-brand-ln);color:var(--pdc-brand);font-family:var(--pdc-serif);font-weight:900;font-size:1em}
.pdc-day-label{font-family:var(--pdc-serif);font-weight:800;font-size:1.12em;flex:1}
.pdc-day-count{font-size:.8em;color:var(--pdc-ink3);margin-right:4px}
.pdc-day-arrow{color:var(--pdc-ink3);transition:transform .22s ease;font-size:1.15em}
.pdc-day.open .pdc-day-arrow{transform:rotate(90deg)}
.pdc-day-body{display:none;padding:2px 14px 16px}
.pdc-day.open .pdc-day-body{display:block;animation:pdc-body-in .32s cubic-bezier(.2,.8,.2,1)}

/* ── Schedule rows ── */
.pdc-row{display:flex;align-items:center;gap:10px;width:100%;padding:10px 10px;border:none;background:none;font:inherit;color:var(--pdc-ink);text-align:left;border-radius:12px;border-bottom:1px solid var(--pdc-border)}
.pdc-row:last-child{border-bottom:none}
.pdc-row-time{flex-shrink:0;width:110px;font-variant-numeric:tabular-nums;font-size:.86em;color:var(--pdc-ink2);font-weight:600}
.pdc-row-emoji{flex-shrink:0;width:24px;text-align:center}
.pdc-row-main{flex:1;min-width:0}
.pdc-row-event{font-weight:650}
.pdc-row-sub{display:block;font-size:.82em;color:var(--pdc-ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdc-row-go{flex-shrink:0;color:var(--pdc-ink3);font-size:1.15em}
button.pdc-row{cursor:pointer;transition:background .15s,border-color .15s}
button.pdc-row:hover{background:var(--pdc-brand-soft)}
button.pdc-row .pdc-row-event{color:var(--pdc-brand)}
button.pdc-row[data-reftype="worship"]:hover{background:var(--pdc-gold-soft)}
button.pdc-row[data-reftype="worship"] .pdc-row-event{color:var(--pdc-gold)}
button.pdc-row[data-reftype="groups"]:hover{background:var(--pdc-mint-soft)}
button.pdc-row[data-reftype="groups"] .pdc-row-event{color:var(--pdc-mint)}
@media(max-width:520px){.pdc-row-time{width:90px;font-size:.8em}}

/* ── Overview cards ── */
.pdc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:13px}
.pdc-card{position:relative;background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:18px;box-shadow:var(--pdc-sh);padding:16px 18px;font:inherit;color:var(--pdc-ink);text-align:left;cursor:pointer;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease;overflow:hidden}
.pdc-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--pdc-brand),transparent)}
.pdc-card.is-worship::before{background:linear-gradient(180deg,var(--pdc-gold),transparent)}
.pdc-card:hover{transform:translateY(-3px);box-shadow:var(--pdc-sh-lg);border-color:var(--pdc-border-md)}
.pdc-card-tag{display:inline-flex;align-items:center;gap:6px;font-size:.8em;font-weight:700;color:var(--pdc-brand);background:var(--pdc-brand-soft);border:1px solid var(--pdc-brand-ln);border-radius:999px;padding:2px 11px;margin-bottom:9px}
.pdc-card.is-worship .pdc-card-tag{color:var(--pdc-gold);background:var(--pdc-gold-soft);border-color:var(--pdc-gold-ln)}
.pdc-card-title{font-weight:750;line-height:1.5;margin:0 0 4px}
.pdc-card-sub{font-size:.85em;color:var(--pdc-ink2);margin:0}
.pdc-card-meta{font-size:.8em;color:var(--pdc-ink3);margin-top:9px}
/* 手机上总览卡片保持最少两列 */
@media(max-width:600px){
  .pdc-grid{grid-template-columns:1fr 1fr;gap:9px}
  .pdc-card{padding:11px 11px;border-radius:14px}
  .pdc-card-tag{font-size:.72em;padding:2px 9px;margin-bottom:7px}
  .pdc-card-title{font-size:.88em;line-height:1.45}
  .pdc-card-sub{font-size:.76em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .pdc-card-meta{font-size:.72em;margin-top:7px}
}

/* ── Modal ── */
html.pdc-lock,html.pdc-lock body{overflow:hidden!important}
#pdc-overlay{position:fixed;inset:0;background:var(--pdc-bk);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:2147483000;display:none}
#pdc-overlay.open{display:block;animation:pdc-fade .22s ease}
@keyframes pdc-fade{from{opacity:0}to{opacity:1}}
#pdc-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(880px,calc(100vw - 20px));max-height:min(92vh,980px);background:var(--pdc-bg);color:var(--pdc-ink);border:1px solid var(--pdc-border-md);border-radius:24px;box-shadow:0 48px 140px rgba(0,0,0,.4);overflow:hidden;z-index:2147483001;display:none;font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
#pdc-modal.open{display:flex;flex-direction:column;animation:pdc-pop .3s cubic-bezier(.2,.8,.2,1)}
@keyframes pdc-pop{from{opacity:0;transform:translate(-50%,-47.5%) scale(.965)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
#pdc-modal.pdc-m-wide{width:min(1240px,calc(100vw - 16px));height:min(94vh,1200px);max-height:94vh}
.pdc-m-head{display:flex;align-items:center;gap:10px;padding:15px 20px;border-bottom:1px solid var(--pdc-border);background:var(--pdc-glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.pdc-m-title{flex:1;font-family:var(--pdc-serif);font-weight:800;font-size:1.1em;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdc-m-close{flex-shrink:0;width:36px;height:36px;border-radius:50%;border:1px solid var(--pdc-border-md);background:var(--pdc-soft);color:var(--pdc-ink2);font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:color .15s,border-color .15s,transform .12s}
.pdc-m-close:hover{color:var(--pdc-ink);border-color:var(--pdc-ink3)}
.pdc-m-close:active{transform:scale(.92)}
.pdc-m-body{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:20px}
#pdc-modal.pdc-m-wide .pdc-m-body{padding:14px clamp(8px,2vw,26px) 26px}
/* 手机上弹窗全屏，谱面最大化 */
@media(max-width:640px){
  #pdc-modal,#pdc-modal.pdc-m-wide{left:0;top:0;transform:none;width:100vw;height:100dvh;max-height:100dvh;border-radius:0;border:none}
  #pdc-modal.open{animation:pdc-sheet .3s cubic-bezier(.2,.8,.2,1)}
  @keyframes pdc-sheet{from{opacity:0;transform:translateY(4%)}to{opacity:1;transform:none}}
  .pdc-m-body{padding:14px 10px 30px}
  #pdc-modal.pdc-m-wide .pdc-m-body{padding:10px 6px 30px}
}
/* 诗歌谱图 / 灯箱：youth 灯箱 z-index(999999) 低于本弹窗，强制抬到最上层 */
#ym-lb-overlay{z-index:2147483400!important}
/* 和弦浏览器底部面板（<chord-explorer> 的 :host 默认 2147482000）同样抬到弹窗之上 */
chord-explorer{z-index:2147483350!important}
#pdc-modal .sw-score img{max-width:100%;height:auto;cursor:zoom-in}

/* ── Detail (sermon / worship) ── */
.pdc-d-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.pdc-d-chip{display:inline-flex;align-items:center;gap:6px;font-size:.82em;font-weight:650;color:var(--pdc-ink2);background:var(--pdc-soft);border:1px solid var(--pdc-border);border-radius:999px;padding:3px 12px}
.pdc-d-title{font-family:var(--pdc-serif);font-size:1.42em;font-weight:900;line-height:1.45;margin:0 0 6px}
.pdc-d-sub{color:var(--pdc-gold);font-weight:700;margin:0 0 18px;font-family:var(--pdc-serif)}
.pdc-d-block{background:var(--pdc-card);border:1px solid var(--pdc-border);border-radius:18px;padding:16px 18px;margin-bottom:13px;box-shadow:var(--pdc-sh)}
.pdc-d-block-title{font-size:.83em;font-weight:800;color:var(--pdc-ink2);margin:0 0 9px;letter-spacing:.08em}
.pdc-d-scripture{font-weight:650;margin:0}
.pdc-keyverse{margin:0;padding:14px 18px;border-left:3px solid var(--pdc-gold);background:var(--pdc-gold-soft);border-radius:0 14px 14px 0;font-weight:650;line-height:1.85;font-family:var(--pdc-serif)}
.pdc-questions{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:11px}
.pdc-questions li{line-height:1.75}
.pdc-questions li::marker{color:var(--pdc-brand);font-weight:800}
.pdc-ppt-link{display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--pdc-brand);text-decoration:none;border:1px solid var(--pdc-brand-ln);background:var(--pdc-brand-soft);border-radius:999px;padding:9px 20px;transition:filter .15s,transform .12s}
.pdc-ppt-link:hover{filter:brightness(1.06);transform:translateY(-1px)}
.pdc-ppt-empty{margin:0;color:var(--pdc-ink2)}
.pdc-songs-empty{margin:0;color:var(--pdc-ink2);text-align:center;padding:34px 10px}
.pdc-songs-loading{text-align:center;color:var(--pdc-ink2);padding:44px 10px}
.pdc-songs-loading .pdc-spin{font-size:28px;display:block;margin-bottom:10px;animation:pdc-spin 1.2s linear infinite}
@keyframes pdc-spin{to{transform:rotate(360deg)}}
.pdc-songs-error{text-align:center;color:#ef4444;padding:30px 10px}

/* ── Loading / error（页面级）── */
.pdc-loading,.pdc-error{text-align:center;padding:60px 20px;font-family:system-ui;color:var(--pdc-ink2)}
.pdc-error{color:#ef4444}
.pdc-loading .big,.pdc-error .big{font-size:32px;margin-bottom:12px}
`;
    document.head.appendChild(style);
  }

  /* ══════════════ 滚动渐显 ══════════════ */
  var _revealObserver = null;
  function reveal(node, idx) {
    node.classList.add('pdc-reveal');
    if (typeof idx === 'number') node.style.animationDelay = Math.min(idx * 60, 360) + 'ms';
    if (!_revealObserver && 'IntersectionObserver' in window) {
      _revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          _revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    }
    if (_revealObserver) _revealObserver.observe(node);
    else node.classList.add('in');
    return node;
  }

  /* ══════════════ Modal ══════════════ */
  var _overlay = null, _modal = null, _mTitle = null, _mBody = null;

  function ensureModal() {
    if (_modal) return;
    _overlay = el('div', { id: 'pdc-overlay' });
    _modal = el('div', { id: 'pdc-modal', role: 'dialog', 'aria-modal': 'true' });
    _mTitle = el('div', { class: 'pdc-m-title' });
    var closeBtn = el('button', { class: 'pdc-m-close', 'aria-label': '关闭', text: '✕' });
    _mBody = div('pdc-m-body');
    _modal.appendChild(el('div', { class: 'pdc-m-head' }, [_mTitle, closeBtn]));
    _modal.appendChild(_mBody);
    document.body.appendChild(_overlay);
    document.body.appendChild(_modal);

    closeBtn.addEventListener('click', closeModal);
    _overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !_modal.classList.contains('open')) return;
      /* 若灯箱 / 和弦面板开着，Esc 先关它们（youth 自己处理），弹窗不动 */
      var lb = document.getElementById('ym-lb-overlay');
      if (lb && lb.classList.contains('open')) return;
      if (document.querySelector('chord-explorer.open')) return;
      closeModal();
    });
  }

  function openModal(title, contentEl, opts) {
    ensureModal();
    _modal.classList.toggle('pdc-m-wide', !!(opts && opts.wide));
    _mTitle.textContent = title || '';
    _mBody.innerHTML = '';
    _mBody.appendChild(contentEl);
    _mBody.scrollTop = 0;
    _overlay.classList.add('open');
    _modal.classList.add('open');
    document.documentElement.classList.add('pdc-lock');
  }

  function closeModal() {
    if (!_modal) return;
    /* 关闭时暂停详情里所有播放器，避免背景播放 */
    Array.prototype.forEach.call(_mBody.querySelectorAll('audio'), function (a) {
      try { a.pause(); } catch (_) {}
    });
    _overlay.classList.remove('open');
    _modal.classList.remove('open');
    document.documentElement.classList.remove('pdc-lock');
  }

  /* ══════════════ 讲道详情 ══════════════ */
  function buildSermonDetail(s) {
    var wrap = div('');

    var meta = div('pdc-d-meta');
    meta.appendChild(el('span', { class: 'pdc-d-chip', text: '📖 ' + (s.label || '') }));
    if (s.day || s.time) meta.appendChild(el('span', { class: 'pdc-d-chip', text: '🗓 ' + [s.day, s.time].filter(Boolean).join(' · ') }));
    var speaker = s.speaker || (C.info && C.info.speakers) || '';
    if (speaker) meta.appendChild(el('span', { class: 'pdc-d-chip', text: '👤 ' + speaker }));
    wrap.appendChild(meta);

    wrap.appendChild(el('h3', { class: 'pdc-d-title', text: s.title || '' }));
    if (s.subtitle) wrap.appendChild(el('p', { class: 'pdc-d-sub', text: s.subtitle }));

    if (s.scripture) {
      wrap.appendChild(div('pdc-d-block', [
        el('p', { class: 'pdc-d-block-title', text: '📜 经文' }),
        el('p', { class: 'pdc-d-scripture', text: s.scripture })
      ]));
    }
    if (s.keyVerse) {
      wrap.appendChild(div('pdc-d-block', [
        el('p', { class: 'pdc-d-block-title', text: '✨ 精句' }),
        el('blockquote', { class: 'pdc-keyverse', text: s.keyVerse })
      ]));
    }
    if (s.questions && s.questions.length) {
      var ol = el('ol', { class: 'pdc-questions' });
      s.questions.forEach(function (q) { ol.appendChild(el('li', { text: q })); });
      wrap.appendChild(div('pdc-d-block', [
        el('p', { class: 'pdc-d-block-title', text: '💬 小组讨论题' }),
        ol
      ]));
    }

    /* PPT 区：照 youth buildPPT 的逻辑 */
    var pptInner;
    if (s.pptUrl) {
      pptInner = el('a', {
        class: 'pdc-ppt-link', href: s.pptUrl, target: '_blank', rel: 'noopener noreferrer',
        text: (s.pptLabel || '讲员PPT') + ' > 📥 查看 / 下载'
      });
    } else {
      pptInner = el('p', { class: 'pdc-ppt-empty', text: '本讲暂未提供讲员 PPT 🙏' });
    }
    wrap.appendChild(div('pdc-d-block', [
      el('p', { class: 'pdc-d-block-title', text: '📑 讲员 PPT' }),
      pptInner
    ]));

    return wrap;
  }

  /* ══════════════ 敬拜详情（诗歌渲染委托 youth-engine）══════════════ */
  var _songSetCache = {};   // worship.id -> 已渲染好的 HTMLElement

  function buildWorshipDetail(w) {
    var wrap = div('');

    var meta = div('pdc-d-meta');
    meta.appendChild(el('span', { class: 'pdc-d-chip', text: '🎶 ' + (w.label || '') }));
    if (w.day || w.time) meta.appendChild(el('span', { class: 'pdc-d-chip', text: '🗓 ' + [w.day, w.time].filter(Boolean).join(' · ') }));
    wrap.appendChild(meta);

    var ids = w.songs || [];
    if (!ids.length) {
      wrap.appendChild(el('p', { class: 'pdc-songs-empty', text: '本场诗歌待定 🙏' }));
      return wrap;
    }

    var area = div('');
    wrap.appendChild(area);

    if (_songSetCache[w.id]) {
      area.appendChild(_songSetCache[w.id]);
      return wrap;
    }

    var loading = div('pdc-songs-loading');
    loading.innerHTML = '<span class="pdc-spin">🎵</span>正在加载诗歌与和弦谱…';
    area.appendChild(loading);

    ensureYouthEngine()
      .then(function () { return window.YouthEngine.buildSongSet(ids); })
      .then(function (songSetEl) {
        _songSetCache[w.id] = songSetEl;
        area.innerHTML = '';
        area.appendChild(songSetEl);
      })
      .catch(function (err) {
        area.innerHTML = '';
        area.appendChild(el('p', { class: 'pdc-songs-error', text: '诗歌加载失败：' + err.message }));
        console.error('[CampEngine]', err);
      });

    return wrap;
  }

  /* ══════════════ 分组名单 ══════════════ */
  function buildGroupsDetail() {
    var wrap = div('');
    var gs = C.groups || [];
    if (!gs.length) {
      wrap.appendChild(el('p', { class: 'pdc-songs-empty', text: '分组名单待公布 🙏' }));
      return wrap;
    }
    var grid = div('pdc-groups-grid');
    gs.forEach(function (g) {
      var card = div('pdc-group-card');
      card.appendChild(el('p', { class: 'pdc-group-name', text: g.name || '' }));
      if (g.leader) card.appendChild(el('span', { class: 'pdc-group-leader', text: '👑 组长 · ' + g.leader }));
      if (g.members && g.members.length) {
        var ul = el('ul', { class: 'pdc-group-members' });
        g.members.forEach(function (m) { ul.appendChild(el('li', { text: m })); });
        card.appendChild(ul);
      }
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  /* ══════════════ ref 点击入口 ══════════════ */
  function openRef(ref) {
    if (!ref) return;
    if (ref.type === 'sermon') {
      var s = findById(C.sermons, ref.id);
      if (s) openModal((s.label || '讲道') + ' · ' + (s.title || ''), buildSermonDetail(s));
    } else if (ref.type === 'worship') {
      var w = findById(C.worship, ref.id);
      /* 敬拜用大弹窗：和弦谱/简谱图需要更大可视区域 */
      if (w) openModal((w.label || '敬拜') + ' · 诗歌敬拜', buildWorshipDetail(w), { wide: true });
    } else if (ref.type === 'groups') {
      openModal('📢 分组名单', buildGroupsDetail());
    }
  }

  /* ══════════════ Hero ══════════════ */
  function buildHero() {
    var hero = div('pdc-hero');
    if (C.church) hero.appendChild(el('p', { class: 'pdc-hero-eyebrow', text: C.church }));
    hero.appendChild(el('h1', { class: 'pdc-hero-title', text: C.title || '' }));
    if (C.subtitle) hero.appendChild(el('p', { class: 'pdc-hero-sub', text: C.subtitle }));
    hero.appendChild(div('pdc-hero-divider'));
    if (C.intro) hero.appendChild(el('p', { class: 'pdc-hero-intro', text: C.intro }));

    var pills = div('pdc-pills');
    if (C.dateRange) pills.appendChild(el('span', { class: 'pdc-pill', text: '📅 ' + C.dateRange }));
    if (C.location) pills.appendChild(el('span', { class: 'pdc-pill', text: '📍 ' + C.location }));
    hero.appendChild(pills);

    /* 附加信息（讲员 / 地址 / 停车 / 联系）：有值才显示 */
    var info = C.info || {};
    var infoRows = [
      ['👤 讲员', info.speakers],
      ['📝 讲员简介', info.speakerBio],
      ['🏠 地址', info.address],
      ['🅿️ 停车', info.parking],
      ['📞 联系', info.contact]
    ].filter(function (r) { return r[1]; });
    if (infoRows.length) {
      var box = div('pdc-info');
      infoRows.forEach(function (r) {
        box.appendChild(el('div', { html: '<b>' + r[0] + '</b>　' }));
        box.lastChild.appendChild(document.createTextNode(r[1]));
      });
      hero.appendChild(box);
    }
    return hero;
  }

  /* ══════════════ 整体时间表（四天一览）══════════════ */
  function refTypeClass(ref) {
    if (!ref) return '';
    if (ref.type === 'sermon') return ' is-sermon';
    if (ref.type === 'worship') return ' is-worship';
    if (ref.type === 'groups') return ' is-groups';
    return '';
  }

  /* 生成四列时间表 grid；withReveal=false 用于放大查看器（无需滚动渐显） */
  function buildTTGrid(withReveal) {
    var grid = div('pdc-tt');
    grid.style.gridTemplateColumns = 'repeat(' + Math.max((C.days || []).length, 1) + ',minmax(228px,1fr))';
    (C.days || []).forEach(function (day, di) {
      var col = div('pdc-tt-col');
      if (withReveal) reveal(col, di);
      col.appendChild(div('pdc-tt-head', [
        el('span', { class: 'pdc-tt-date', text: day.date || '' }),
        el('span', { class: 'pdc-tt-label', text: day.label || '' })
      ]));
      (day.schedule || []).forEach(function (item) {
        var ref = item.ref || null;
        var cls = 'pdc-tt-item' + refTypeClass(ref);
        var kids = [
          el('span', { class: 't', text: item.time || '' }),
          el('span', { class: 'e', text: (item.emoji ? item.emoji + ' ' : '') + (item.event || '') })
        ];
        if (ref) {
          var btn = el('button', { class: cls, type: 'button' }, kids);
          btn.addEventListener('click', function () { openRef(ref); });
          col.appendChild(btn);
        } else {
          col.appendChild(div(cls, kids));
        }
      });
      grid.appendChild(col);
    });
    return grid;
  }

  /* 放大查看器：全屏弹窗 + 缩放控制，色块保持可点击 */
  function openTimetableZoom() {
    var content = div('pdc-zoom');
    var tools = div('pdc-zoom-tools');
    var area = div('pdc-zoom-area');
    var sizer = div('pdc-zoom-sizer');
    var inner = div('pdc-zoom-inner');
    inner.appendChild(buildTTGrid(false));
    sizer.appendChild(inner);
    area.appendChild(sizer);

    var scale = 1, baseW = 0, baseH = 0;
    var pct = el('span', { class: 'pdc-zoom-pct', text: '100%' });
    function apply() {
      inner.style.transform = 'scale(' + scale + ')';
      sizer.style.width = Math.ceil(baseW * scale) + 'px';
      sizer.style.height = Math.ceil(baseH * scale) + 'px';
      pct.textContent = Math.round(scale * 100) + '%';
    }
    function fit() {
      if (!baseW) return;
      scale = Math.max(0.25, Math.min(2.5, (area.clientWidth - 2) / baseW));
      apply();
    }
    function mkBtn(label, fn) {
      var b = el('button', { type: 'button', text: label });
      b.addEventListener('click', fn);
      return b;
    }
    tools.appendChild(mkBtn('适应宽度', fit));
    tools.appendChild(mkBtn('－', function () { scale = Math.max(0.25, scale - 0.15); apply(); }));
    tools.appendChild(pct);
    tools.appendChild(mkBtn('＋', function () { scale = Math.min(2.5, scale + 0.15); apply(); }));
    tools.appendChild(mkBtn('100%', function () { scale = 1; apply(); }));
    tools.appendChild(el('span', { class: 'pdc-zoom-hint', text: '色块可点击查看详情' }));
    content.appendChild(tools);
    content.appendChild(area);
    content.style.height = '100%';

    openModal('⏱ 整体时间表 · 放大查看', content, { wide: true });

    /* 布局完成后测量原始尺寸，默认适应宽度 */
    requestAnimationFrame(function () {
      baseW = inner.scrollWidth || 960;
      baseH = inner.scrollHeight || 800;
      fit();
    });
  }

  function buildTimetable() {
    var frag = document.createDocumentFragment();
    frag.appendChild(el('h2', { class: 'pdc-sec-title', text: '⏱ 整体时间表' }));

    var bar = div('pdc-tt-bar');
    bar.appendChild(el('p', { class: 'pdc-sec-cap', style: 'margin:0', text: '四天日程一览 · 彩色块可点击查看详情' }));
    var zoomBtn = el('button', { class: 'pdc-zoom-btn', type: 'button', text: '🔍 放大查看' });
    zoomBtn.addEventListener('click', openTimetableZoom);
    bar.appendChild(zoomBtn);
    frag.appendChild(bar);

    var scroll = div('pdc-tt-scroll');
    scroll.appendChild(buildTTGrid(true));
    frag.appendChild(scroll);

    var legend = div('pdc-tt-legend');
    legend.innerHTML =
      '<span class="lg-sermon"><i></i>讲道（主题 / 经文 / 讨论题 / PPT）</span>' +
      '<span class="lg-worship"><i></i>敬拜（诗歌和弦谱 + 播放器）</span>' +
      '<span class="lg-groups"><i></i>分组名单</span>' +
      '<span class="lg-plain"><i></i>用餐 / 休息 / 活动</span>';
    frag.appendChild(legend);
    return frag;
  }

  /* ══════════════ 日程（accordion，默认第一天展开）══════════════ */
  /* ref → { clickable, sub }：日程行 / 总表共用 */
  function describeRef(ref) {
    if (!ref) return { clickable: false, sub: '' };
    if (ref.type === 'sermon') {
      var s = findById(C.sermons, ref.id);
      return s ? { clickable: true, sub: s.title || '' } : { clickable: false, sub: '' };
    }
    if (ref.type === 'worship') {
      var w = findById(C.worship, ref.id);
      if (!w) return { clickable: false, sub: '' };
      return { clickable: true, sub: (w.songs && w.songs.length) ? '共 ' + w.songs.length + ' 首诗歌 · 点击查看和弦谱' : '诗歌待定 · 点击查看' };
    }
    if (ref.type === 'groups') {
      return { clickable: true, sub: (C.groups && C.groups.length) ? '点击查看分组名单' : '分组名单待公布 · 点击查看' };
    }
    return { clickable: false, sub: '' };
  }

  function buildScheduleRow(item) {
    var ref = item.ref || null;
    var d = describeRef(ref);

    var main = div('pdc-row-main');
    main.appendChild(el('span', { class: 'pdc-row-event', text: item.event || '' }));
    if (d.sub) main.appendChild(el('span', { class: 'pdc-row-sub', text: d.sub }));

    var kids = [
      el('span', { class: 'pdc-row-time', text: item.time || '' }),
      el('span', { class: 'pdc-row-emoji', text: item.emoji || '' }),
      main
    ];

    if (d.clickable) {
      kids.push(el('span', { class: 'pdc-row-go', text: '›' }));
      var btn = el('button', { class: 'pdc-row', type: 'button', 'data-reftype': ref.type }, kids);
      btn.addEventListener('click', function () { openRef(ref); });
      return btn;
    }
    return div('pdc-row', kids);
  }

  function buildDays() {
    var frag = document.createDocumentFragment();
    frag.appendChild(el('h2', { class: 'pdc-sec-title', text: '🗓 每日详细日程' }));
    frag.appendChild(el('p', { class: 'pdc-sec-cap', text: '点击每天展开 · 讲道与敬拜条目可点开详情' }));
    (C.days || []).forEach(function (day, i) {
      var card = reveal(div('pdc-day' + (i === 0 ? ' open' : '')), i);
      var nRefs = (day.schedule || []).filter(function (it) { return it.ref; }).length;
      var head = el('button', { class: 'pdc-day-head', type: 'button' }, [
        el('span', { class: 'pdc-day-badge', text: day.date || '' }),
        el('span', { class: 'pdc-day-label', text: day.label || '' }),
        el('span', { class: 'pdc-day-count', text: nRefs ? nRefs + ' 场讲道/敬拜' : '' }),
        el('span', { class: 'pdc-day-arrow', text: '›' })
      ]);
      head.addEventListener('click', function () { card.classList.toggle('open'); });
      var body = div('pdc-day-body');
      (day.schedule || []).forEach(function (item) { body.appendChild(buildScheduleRow(item)); });
      card.appendChild(head);
      card.appendChild(body);
      frag.appendChild(card);
    });
    return frag;
  }

  /* ══════════════ 总览：讲道主题一览 ══════════════ */
  function buildSermonOverview() {
    var frag = document.createDocumentFragment();
    frag.appendChild(el('h2', { class: 'pdc-sec-title', text: '📖 讲道主题一览' }));
    frag.appendChild(el('p', { class: 'pdc-sec-cap', text: '点击卡片查看主题、经文、讨论题与讲员 PPT' }));
    var grid = div('pdc-grid');
    (C.sermons || []).forEach(function (s, i) {
      var card = reveal(el('button', { class: 'pdc-card', type: 'button' }), i % 4);
      card.appendChild(el('span', { class: 'pdc-card-tag', text: s.label || '' }));
      card.appendChild(el('p', { class: 'pdc-card-title', text: s.title || '' }));
      if (s.subtitle) card.appendChild(el('p', { class: 'pdc-card-sub', text: s.subtitle }));
      var when = [s.day, s.time].filter(Boolean).join(' · ');
      card.appendChild(el('p', { class: 'pdc-card-meta', text: when || '时间待定' }));
      card.addEventListener('click', function () { openRef({ type: 'sermon', id: s.id }); });
      grid.appendChild(card);
    });
    frag.appendChild(grid);
    return frag;
  }

  /* ══════════════ 总览：敬拜诗歌一览 ══════════════ */
  function buildWorshipOverview() {
    var frag = document.createDocumentFragment();
    frag.appendChild(el('h2', { class: 'pdc-sec-title', text: '🎶 敬拜诗歌一览' }));
    frag.appendChild(el('p', { class: 'pdc-sec-cap', text: '点击卡片查看完整和弦谱与播放器' }));
    var grid = div('pdc-grid');
    (C.worship || []).forEach(function (w, i) {
      var n = (w.songs || []).length;
      var card = reveal(el('button', { class: 'pdc-card is-worship', type: 'button' }), i % 4);
      card.appendChild(el('span', { class: 'pdc-card-tag', text: w.label || '' }));
      card.appendChild(el('p', { class: 'pdc-card-title', text: n ? '共 ' + n + ' 首诗歌' : '诗歌待定 🙏' }));
      card.appendChild(el('p', { class: 'pdc-card-sub', text: n ? '点击查看完整和弦谱与播放器' : '敬拜同工安排中' }));
      var when = [w.day, w.time].filter(Boolean).join(' · ');
      card.appendChild(el('p', { class: 'pdc-card-meta', text: when }));
      card.addEventListener('click', function () { openRef({ type: 'worship', id: w.id }); });
      grid.appendChild(card);
    });
    frag.appendChild(grid);
    return frag;
  }

  /* ══════════════ Assemble ══════════════ */
  function hr() { return el('hr', { class: 'pdc-hr' }); }

  function buildPage() {
    var page = div('pdc-page');
    page.appendChild(buildHero());
    page.appendChild(hr());
    page.appendChild(buildTimetable());
    page.appendChild(hr());
    page.appendChild(buildDays());
    page.appendChild(hr());
    page.appendChild(buildSermonOverview());
    page.appendChild(hr());
    page.appendChild(buildWorshipOverview());
    ROOT.appendChild(page);
  }

  /* ══════════════ 对外 API ══════════════ */
  window.CampEngine.render = function (campId, root) {
    if (!root) root = document.getElementById('pdc-root');
    if (!root) { console.error('[CampEngine] root element not found'); return; }
    ROOT = root;

    injectCSS();
    root.innerHTML = '<div class="pdc-loading"><div class="big">⏳</div><div>正在加载营会页面...</div></div>';

    fetch(PDC_BASE + '/camp/' + campId + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('营会数据不存在: ' + campId);
        return r.json();
      })
      .then(function (data) {
        C = data;
        root.innerHTML = '';
        buildPage();
      })
      .catch(function (err) {
        root.innerHTML = '<div class="pdc-error"><div class="big">❌</div><div>' + err.message + '</div></div>';
        console.error('[CampEngine]', err);
      });
  };

})();
