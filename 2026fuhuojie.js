(function () {

  /* ===================== CSS ===================== */
  var CSS = `
.cecp-easter-wrap{
  --card:rgba(255,255,255,0.07);
  --card-soft:rgba(255,255,255,0.04);
  --text:inherit;
  --muted:rgba(128,128,128,0.85);
  --line:rgba(128,128,128,0.15);
  --gold:#c49a4a;
  --gold-soft:rgba(196,154,74,.18);
  --tag:rgba(128,128,128,0.10);
  --shadow:0 8px 24px rgba(0,0,0,.10);
  --radius:24px;
  --link:#c49a4a;
  --hero1:#2d2117;--hero2:#6b5035;
  --heroText:#fff8f1;--heroMuted:rgba(255,248,241,.84);
  width:100%;margin:0;padding:0;color:inherit;
  font-family:"Noto Serif SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",serif;
  line-height:1.75;box-sizing:border-box;
}
.cecp-easter-wrap *{box-sizing:border-box}
.cecp-easter-shell{background:transparent;padding:0}

.cecp-easter-hero{
  position:relative;overflow:hidden;border-radius:28px;
  margin:20px 20px 0;padding:42px 28px 36px;
  background:radial-gradient(circle at 82% 18%,rgba(255,232,198,.92) 0%,rgba(255,232,198,.14) 16%,transparent 33%),
             linear-gradient(135deg,var(--hero1) 0%,var(--hero2) 100%);
  color:var(--heroText);box-shadow:var(--shadow);
}
.cecp-easter-hero::before{content:"";position:absolute;right:-70px;bottom:-100px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,.07)}
.cecp-easter-hero h2{margin:0;font-size:clamp(26px,5vw,52px);line-height:1.12;font-weight:800;letter-spacing:.02em}
.cecp-easter-hero p{margin:12px 0 0;max-width:760px;color:var(--heroMuted);font-size:15px}
.cecp-easter-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.cecp-easter-pill{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16);font-size:13px;color:var(--heroText);text-decoration:none}

.cecp-welcome{margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:0 20px}
.cecp-text-block{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:20px;box-shadow:var(--shadow)}
.cecp-text-block h3{margin:0 0 8px;font-size:20px;color:var(--gold)}
.cecp-text-block p{margin:0;color:var(--text);font-size:14px}

.cecp-easter-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:20px;margin-top:18px;padding:0 20px}
.cecp-card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}
.cecp-title{margin:0 0 6px;font-size:22px;line-height:1.3;font-weight:800;color:var(--gold)}
.cecp-sub{margin:0 0 4px;font-size:13px;color:var(--muted)}
.cecp-stack{display:grid;gap:16px}

/* Accordion */
.cecp-accordion{margin-top:14px;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:var(--card-soft)}
.cecp-accordion-head{
  display:flex;justify-content:space-between;align-items:center;gap:10px;
  padding:13px 16px;background:var(--tag);cursor:pointer;user-select:none;
  border-bottom:1px solid transparent;transition:border-color .2s;
}
.cecp-accordion-head.open{border-bottom-color:var(--line)}
.cecp-accordion-head h3{margin:0;font-size:17px;font-weight:700;color:var(--text);flex:1}
.cecp-accordion-meta{display:flex;align-items:center;gap:8px;flex-shrink:0}
.cecp-accordion-badge{padding:4px 10px;border-radius:999px;background:var(--card);border:1px solid var(--line);font-size:12px;color:var(--muted);white-space:nowrap}
.cecp-accordion-arrow{font-size:11px;color:var(--muted);transition:transform .25s ease;display:inline-block;line-height:1}
.cecp-accordion-head.open .cecp-accordion-arrow{transform:rotate(180deg)}
.cecp-accordion-body{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1)}
.cecp-accordion-body.open{max-height:2000px}

.cecp-list{padding:6px 14px 14px}
.cecp-row{display:grid;grid-template-columns:145px 1fr;gap:10px;padding:9px 0;border-bottom:1px dashed var(--line)}
.cecp-row:last-child{border-bottom:none}
.cecp-time{font-weight:700;font-size:14px;color:var(--muted)}
.cecp-item{font-weight:600;font-size:15px;color:var(--text)}

.cecp-mini-list{display:grid;gap:10px;margin-top:10px}
.cecp-mini-item{padding:13px 14px;border-radius:14px;background:var(--card-soft);border:1px solid var(--line)}
.cecp-mini-item strong{display:block;margin-bottom:3px;font-size:14px;color:var(--text)}
.cecp-mini-item span{color:var(--muted);font-size:13px}
.cecp-sermon{padding:11px 13px;border-radius:13px;background:var(--card-soft);border:1px solid var(--line);margin-top:9px}
.cecp-sermon h4{margin:0 0 3px;font-size:13px;color:var(--gold)}
.cecp-sermon p{margin:0;color:var(--text);font-size:14px}

.cecp-link{color:var(--link);text-decoration:none;border-bottom:1px solid transparent;transition:.2s;word-break:break-word}
.cecp-link:hover{border-bottom-color:currentColor}
.cecp-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px}
.cecp-btn{appearance:none;border-radius:10px;padding:8px 12px;font-size:13px;cursor:pointer;background:var(--tag);color:var(--text);border:1px solid var(--line);transition:.2s;text-decoration:none;display:inline-block;font-family:inherit}
.cecp-btn:hover{transform:translateY(-1px)}
.cecp-copy-tip{font-size:12px;color:var(--muted);margin-top:5px;min-height:16px;display:block}

.cecp-verse{margin-top:14px;padding:16px 18px;border-radius:18px;background:linear-gradient(135deg,var(--gold-soft),transparent);border:1px solid var(--line);font-size:15px;color:var(--text)}
.cecp-verse strong{display:block;margin-top:6px;font-size:12px;color:var(--gold);letter-spacing:.04em}

.cecp-bottom-cards{margin-top:18px;margin-bottom:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 20px}
.cecp-softbox{border-radius:20px;padding:18px 16px;border:1px solid var(--line);box-shadow:var(--shadow);background:var(--card)}
.cecp-softbox h4{margin:0 0 8px;font-size:16px;color:var(--text);font-weight:800}
.cecp-softbox p{margin:0;color:var(--muted);font-size:13px;line-height:1.8}
.cecp-peach{background:linear-gradient(135deg,rgba(185,134,68,.18),rgba(185,134,68,.08))}
.cecp-green{background:linear-gradient(135deg,rgba(90,125,78,.20),rgba(90,125,78,.08))}
.cecp-blue{background:linear-gradient(135deg,rgba(80,110,140,.20),rgba(80,110,140,.08))}

/* Tablet ≤900px */
@media(max-width:900px){
  .cecp-easter-grid{grid-template-columns:1fr}
  .cecp-bottom-cards{grid-template-columns:1fr 1fr}
}

/* Mobile ≤600px */
@media(max-width:600px){
  .cecp-easter-hero{margin:12px 12px 0;padding:26px 16px 24px;border-radius:18px}
  .cecp-easter-hero h2{font-size:clamp(20px,7vw,32px)}
  .cecp-easter-hero p{font-size:13px;margin-top:8px}
  .cecp-easter-meta{margin-top:14px;gap:6px}
  .cecp-easter-pill{padding:7px 10px;font-size:12px}
  .cecp-welcome{grid-template-columns:1fr;padding:0 12px;margin-top:12px;gap:10px}
  .cecp-text-block{padding:14px;border-radius:14px}
  .cecp-text-block h3{font-size:16px}
  .cecp-text-block p{font-size:13px}
  .cecp-easter-grid{padding:0 12px;margin-top:12px;gap:10px}
  .cecp-card{padding:14px;border-radius:16px}
  .cecp-title{font-size:17px}
  .cecp-bottom-cards{grid-template-columns:1fr;padding:0 12px;margin-top:12px;gap:10px;margin-bottom:14px}
  .cecp-softbox{padding:14px;border-radius:14px}
  .cecp-softbox h4{font-size:14px}
  .cecp-softbox p{font-size:12px}
  .cecp-row{grid-template-columns:100px 1fr;gap:6px}
  .cecp-time{font-size:12px}
  .cecp-item{font-size:13px}
  .cecp-accordion-head h3{font-size:15px}
  .cecp-accordion-head{padding:11px 14px}
}
`;

  /* ===================== HTML ===================== */
  var HTML = `
<section class="cecp-easter-wrap">
  <div class="cecp-easter-shell">

    <div class="cecp-easter-hero">
      <h2>2026 复活节培灵聚会</h2>
      <p>欢迎您和家人朋友一同参加我们复活节期间的聚会。愿我们在主里一同思想基督的受死与复活，在真道中得着安慰、盼望与更新。</p>
      <div class="cecp-easter-meta">
        <span class="cecp-easter-pill">📅 2026.4.5 – 2026.4.6</span>
        <span class="cecp-easter-pill">📍 Padova</span>
        <span class="cecp-easter-pill">⛪ 基督教帕多瓦华人教会</span>
      </div>
    </div>

    <div class="cecp-welcome">
      <div class="cecp-text-block">
        <h3>欢迎你来</h3>
        <p>亲爱的朋友，此刻的你，心情还好吗？在忙碌、压力与不安之中，我们常常需要的不只是暂时的放松，而是一份从神而来的真实平安。欢迎你来到复活节聚会，一同认识这位赐下盼望与生命的主。</p>
      </div>
      <div class="cecp-text-block">
        <h3>聚会邀请</h3>
        <p>不在于外在的享乐，而在于主里面真实的喜乐。圣经说："在世上你们有苦难，但你们可以放心，我已经胜了世界。"愿你在这次聚会中，重新得着安慰、力量与盼望。</p>
      </div>
    </div>

    <div class="cecp-easter-grid">
      <div class="cecp-card">
        <h3 class="cecp-title">聚会程序表</h3>
        <p class="cecp-sub">点击日期可展开 / 收起时间表</p>

        <div class="cecp-accordion">
          <div class="cecp-accordion-head open" data-cecp-toggle>
            <h3>4月5日 礼拜天</h3>
            <div class="cecp-accordion-meta">
              <span class="cecp-accordion-badge">13:30–17:30</span>
              <span class="cecp-accordion-arrow">▼</span>
            </div>
          </div>
          <div class="cecp-accordion-body open">
            <div class="cecp-list">
              <div class="cecp-row"><div class="cecp-time">12:30–13:30</div><div class="cecp-item">用餐</div></div>
              <div class="cecp-row"><div class="cecp-time">13:30–14:10</div><div class="cecp-item">祷告会</div></div>
              <div class="cecp-row"><div class="cecp-time">14:10–14:40</div><div class="cecp-item">诗歌敬拜、祷告</div></div>
              <div class="cecp-row"><div class="cecp-time">14:40–15:40</div><div class="cecp-item">证道一</div></div>
              <div class="cecp-row"><div class="cecp-time">15:40–15:50</div><div class="cecp-item">诗歌回应</div></div>
              <div class="cecp-row"><div class="cecp-time">15:50–16:50</div><div class="cecp-item">证道二</div></div>
              <div class="cecp-row"><div class="cecp-time">16:50–17:30</div><div class="cecp-item">圣餐</div></div>
              <div class="cecp-row"><div class="cecp-time">17:30</div><div class="cecp-item">祝福祷告</div></div>
            </div>
          </div>
        </div>

        <div class="cecp-accordion">
          <div class="cecp-accordion-head" data-cecp-toggle>
            <h3>4月6日 礼拜一</h3>
            <div class="cecp-accordion-meta">
              <span class="cecp-accordion-badge">11:20–17:00</span>
              <span class="cecp-accordion-arrow">▼</span>
            </div>
          </div>
          <div class="cecp-accordion-body">
            <div class="cecp-list">
              <div class="cecp-row"><div class="cecp-time">10:30–11:20</div><div class="cecp-item">祷告会</div></div>
              <div class="cecp-row"><div class="cecp-time">11:20–11:50</div><div class="cecp-item">诗歌敬拜祷告</div></div>
              <div class="cecp-row"><div class="cecp-time">11:50–12:50</div><div class="cecp-item">证道一</div></div>
              <div class="cecp-row"><div class="cecp-time">12:50–14:00</div><div class="cecp-item">用餐时间</div></div>
              <div class="cecp-row"><div class="cecp-time">14:00–14:30</div><div class="cecp-item">诗歌敬拜、祷告</div></div>
              <div class="cecp-row"><div class="cecp-time">14:30–15:30</div><div class="cecp-item">证道二</div></div>
              <div class="cecp-row"><div class="cecp-time">15:30–15:50</div><div class="cecp-item">诗歌回应</div></div>
              <div class="cecp-row"><div class="cecp-time">15:50–16:50</div><div class="cecp-item">证道三</div></div>
              <div class="cecp-row"><div class="cecp-time">16:50–17:00</div><div class="cecp-item">祝福祷告散会</div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="cecp-stack">
        <div class="cecp-card">
          <h3 class="cecp-title">证道主题</h3>
          <div class="cecp-sermon"><h4>4月5日｜证道一</h4><p>耶稣的死，使神人和好（罗 5:6–11）</p></div>
          <div class="cecp-sermon"><h4>4月5日｜证道二</h4><p>耶稣的复活，带来盼望喜乐（罗 6:1–14）</p></div>
          <div class="cecp-sermon"><h4>4月6日｜证道一</h4><p>得蒙怜悯，胜过审判（创 18:20–33）</p></div>
          <div class="cecp-sermon"><h4>4月6日｜证道二</h4><p>尊主为大，胜过罪恶（创 32:1–33:17）</p></div>
          <div class="cecp-sermon"><h4>4月6日｜证道三</h4><p>饱尝主恩，胜过仇恨（创 50:19–21）</p></div>
        </div>

        <div class="cecp-card">
          <h3 class="cecp-title">讲员信息</h3>
          <div class="cecp-mini-list">
            <div class="cecp-mini-item">
              <strong>胡维华博士 Th.D｜牧师</strong>
              <span>国际欧华神学院院长、旧约教授；美国戈登康威尔神学院道学硕士、神学硕士；加拿大多伦多大学神学博士。曾任中华福音神学院副教授、教务长、国际长、教牧中心主任、神学硕士科主任等。</span>
            </div>
          </div>
        </div>

        <div class="cecp-card">
          <h3 class="cecp-title">聚会地点与联系</h3>
          <div class="cecp-mini-list">
            <div class="cecp-mini-item">
              <strong>聚会地址</strong>
              <span><a class="cecp-link" target="_blank" rel="noopener" href="https://maps.app.goo.gl/gvzmgk1Wk76TKAQr6">Via Ugo Foscolo, 4, 35131 Padova PD</a></span>
              <div class="cecp-actions">
                <a class="cecp-btn" target="_blank" rel="noopener" href="https://maps.app.goo.gl/gvzmgk1Wk76TKAQr6">打开地图</a>
                <button class="cecp-btn" type="button" data-cecp-copy="Via Ugo Foscolo, 4, 35131 Padova PD" data-cecp-msg="已复制地址">复制地址</button>
                <span class="cecp-copy-tip"></span>
              </div>
            </div>
            <div class="cecp-mini-item">
              <strong>停车场</strong>
              <span><a class="cecp-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Diego+Valeri+11+Padova">Via Diego Valeri 11, Padova</a></span>
              <div class="cecp-actions">
                <a class="cecp-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Diego+Valeri+11+Padova">打开地图</a>
                <button class="cecp-btn" type="button" data-cecp-copy="Via Diego Valeri 11, Padova" data-cecp-msg="已复制停车场地址">复制地址</button>
                <span class="cecp-copy-tip"></span>
              </div>
            </div>
            <div class="cecp-mini-item">
              <strong>联系同工</strong>
              <span>
                <a class="cecp-link" href="tel:+393200117828">陈长老 320 011 7828</a><br>
                <a class="cecp-link" href="tel:+393281648937">金弟兄 328 164 8937</a>
              </span>
              <div class="cecp-actions">
                <a class="cecp-btn" href="tel:+393200117828">拨打陈长老</a>
                <button class="cecp-btn" type="button" data-cecp-copy="3200117828" data-cecp-msg="已复制陈长老电话">复制陈长老电话</button>
                <span class="cecp-copy-tip"></span>
              </div>
              <div class="cecp-actions">
                <a class="cecp-btn" href="tel:+393281648937">拨打金弟兄</a>
                <button class="cecp-btn" type="button" data-cecp-copy="3281648937" data-cecp-msg="已复制金弟兄电话">复制金弟兄电话</button>
                <span class="cecp-copy-tip"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="cecp-verse">
          "我就是复活，我就是生命；信我的人虽然死了，也必复活。"
          <strong>约翰福音 11:25</strong>
        </div>
      </div>
    </div>

    <div class="cecp-bottom-cards">
      <div class="cecp-softbox cecp-peach">
        <h4>聚会时间</h4>
        <p>12:00—13:30 主日青年团契<br>15:00—17:00 主日下午聚会<br>20:00—21:30 主日晚间聚会</p>
      </div>
      <div class="cecp-softbox cecp-green">
        <h4>平时聚会</h4>
        <p>周三祷告会 21:00—22:00<br>周六祷告会 07:30—08:30<br>周六唱诗班 21:00—22:30<br>主日祷告会 14:00—14:40</p>
      </div>
      <div class="cecp-softbox cecp-blue">
        <h4>爱心餐食</h4>
        <p>教会每个主日提供爱心午餐及晚餐。<br>午餐：13:30—14:10<br>晚餐：19:00—19:40</p>
      </div>
    </div>

  </div>
</section>
`;

  /* ===================== 注入样式 ===================== */
  if (!document.getElementById('cecp-easter-style')) {
    var style = document.createElement('style');
    style.id = 'cecp-easter-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ===================== 注入 HTML ===================== */
  var scripts = document.getElementsByTagName('script');
  var thisScript = scripts[scripts.length - 1];
  var wrapper = document.createElement('div');
  wrapper.innerHTML = HTML;
  thisScript.parentNode.insertBefore(wrapper, thisScript);

  /* ===================== 交互：Accordion + 复制 ===================== */
  wrapper.addEventListener('click', function (e) {

    /* Accordion 折叠 */
    var head = e.target.closest('[data-cecp-toggle]');
    if (head) {
      var body = head.nextElementSibling;
      var isOpen = head.classList.contains('open');
      head.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
      return;
    }

    /* 复制按钮 */
    var btn = e.target.closest('[data-cecp-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-cecp-copy');
    var msg  = btn.getAttribute('data-cecp-msg') || '已复制';
    var tip  = btn.nextElementSibling;

    function showTip() {
      if (tip) { tip.textContent = msg; setTimeout(function(){ tip.textContent = ''; }, 1800); }
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showTip).catch(fb);
    } else { fb(); }
    function fb() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand('copy'); showTip(); }
      catch(err) { if(tip){tip.textContent='复制失败，请手动复制';setTimeout(function(){tip.textContent='';},2200);} }
      document.body.removeChild(ta);
    }
  });

})();
