(function () {

  /* ===================== CSS ===================== */
  var CSS = [
    '.cecp-easter-wrap{',
    '  --card:rgba(255,255,255,0.07);--card-soft:rgba(255,255,255,0.04);',
    '  --text:inherit;--muted:rgba(128,128,128,0.85);--line:rgba(128,128,128,0.15);',
    '  --gold:#c49a4a;--gold-soft:rgba(196,154,74,.18);--tag:rgba(128,128,128,0.10);',
    '  --shadow:0 8px 24px rgba(0,0,0,.10);--radius:24px;--link:#c49a4a;',
    '  --hero1:#2d2117;--hero2:#6b5035;--heroText:#fff8f1;--heroMuted:rgba(255,248,241,.84);',
    '  width:100%;margin:0;padding:0;color:inherit;',
    '  font-family:"Noto Serif SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",serif;',
    '  line-height:1.75;box-sizing:border-box;}',
    '.cecp-easter-wrap *{box-sizing:border-box}',
    '.cecp-easter-shell{background:transparent;padding:0}',
    '.cecp-easter-hero{position:relative;overflow:hidden;border-radius:28px;margin:20px 20px 0;padding:44px 32px 38px;',
    '  background:radial-gradient(circle at 82% 18%,rgba(255,232,198,.92) 0%,rgba(255,232,198,.14) 16%,transparent 33%),linear-gradient(135deg,#2d2117 0%,#6b5035 100%);',
    '  color:var(--heroText);box-shadow:var(--shadow);}',
    '.cecp-easter-hero::before{content:"";position:absolute;right:-70px;bottom:-100px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,.07)}',
    '.cecp-easter-hero h2{margin:0;font-size:clamp(30px,5vw,56px);line-height:1.12;font-weight:800;letter-spacing:.02em}',
    '.cecp-easter-hero p{margin:14px 0 0;max-width:760px;color:var(--heroMuted);font-size:17px}',
    '.cecp-easter-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}',
    '.cecp-easter-pill{display:inline-flex;align-items:center;gap:6px;padding:10px 14px;border-radius:14px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16);font-size:15px;color:var(--heroText);text-decoration:none}',
    '.cecp-welcome{margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:0 20px}',
    '.cecp-text-block{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:22px;box-shadow:var(--shadow);cursor:pointer;transition:transform .18s,box-shadow .18s}',
    '.cecp-text-block:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.15)}',
    '.cecp-text-block h3{margin:0 0 10px;font-size:22px;color:var(--gold)}',
    '.cecp-text-block p{margin:0;color:var(--text);font-size:16px}',
    '.cecp-easter-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:20px;margin-top:20px;padding:0 20px}',
    '.cecp-card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:24px}',
    '.cecp-title{margin:0 0 6px;font-size:24px;line-height:1.3;font-weight:800;color:var(--gold)}',
    '.cecp-sub{margin:0 0 4px;font-size:14px;color:var(--muted)}',
    '.cecp-stack{display:grid;gap:16px}',
    '.cecp-accordion{margin-top:14px;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:var(--card-soft)}',
    '.cecp-accordion-head{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;background:var(--tag);cursor:pointer;user-select:none;border-bottom:1px solid transparent;transition:border-color .2s}',
    '.cecp-accordion-head.open{border-bottom-color:var(--line)}',
    '.cecp-accordion-head h3{margin:0;font-size:19px;font-weight:700;color:var(--text);flex:1}',
    '.cecp-accordion-meta{display:flex;align-items:center;gap:8px;flex-shrink:0}',
    '.cecp-accordion-badge{padding:5px 11px;border-radius:999px;background:var(--card);border:1px solid var(--line);font-size:13px;color:var(--muted);white-space:nowrap}',
    '.cecp-accordion-arrow{font-size:12px;color:var(--muted);transition:transform .25s ease;display:inline-block;line-height:1}',
    '.cecp-accordion-head.open .cecp-accordion-arrow{transform:rotate(180deg)}',
    '.cecp-accordion-body{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1)}',
    '.cecp-accordion-body.open{max-height:2000px}',
    '.cecp-list{padding:6px 16px 16px}',
    '.cecp-row{display:grid;grid-template-columns:145px 1fr;gap:10px;padding:10px 6px;border-bottom:1px dashed var(--line);cursor:pointer;border-radius:8px;transition:background .15s}',
    '.cecp-row:hover{background:var(--tag)}',
    '.cecp-row:last-child{border-bottom:none}',
    '.cecp-time{font-weight:700;font-size:15px;color:var(--muted)}',
    '.cecp-item{font-weight:600;font-size:17px;color:var(--text)}',
    '.cecp-mini-list{display:grid;gap:10px;margin-top:10px}',
    '.cecp-mini-item{padding:14px 16px;border-radius:14px;background:var(--card-soft);border:1px solid var(--line);cursor:pointer;transition:transform .18s,box-shadow .18s}',
    '.cecp-mini-item:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.12)}',
    '.cecp-mini-item strong{display:block;margin-bottom:4px;font-size:16px;color:var(--text)}',
    '.cecp-mini-item span{color:var(--muted);font-size:14px}',
    '.cecp-sermon{padding:12px 14px;border-radius:13px;background:var(--card-soft);border:1px solid var(--line);margin-top:10px;cursor:pointer;transition:transform .18s,box-shadow .18s}',
    '.cecp-sermon:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.12)}',
    '.cecp-sermon h4{margin:0 0 4px;font-size:14px;color:var(--gold)}',
    '.cecp-sermon p{margin:0;color:var(--text);font-size:16px}',
    '.cecp-link{color:var(--link);text-decoration:none;border-bottom:1px solid transparent;transition:.2s;word-break:break-word}',
    '.cecp-link:hover{border-bottom-color:currentColor}',
    '.cecp-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.cecp-btn{appearance:none;border-radius:10px;padding:9px 14px;font-size:14px;cursor:pointer;background:var(--tag);color:var(--text);border:1px solid var(--line);transition:.2s;text-decoration:none;display:inline-block;font-family:inherit}',
    '.cecp-btn:hover{transform:translateY(-1px)}',
    '.cecp-copy-tip{font-size:13px;color:var(--muted);margin-top:5px;min-height:16px;display:block}',
    '.cecp-verse{margin-top:14px;padding:18px 20px;border-radius:18px;background:linear-gradient(135deg,var(--gold-soft),transparent);border:1px solid var(--line);font-size:17px;color:var(--text)}',
    '.cecp-verse strong{display:block;margin-top:8px;font-size:13px;color:var(--gold);letter-spacing:.04em}',
    '.cecp-bottom-cards{margin-top:20px;margin-bottom:22px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 20px}',
    '.cecp-softbox{border-radius:20px;padding:20px 18px;border:1px solid var(--line);box-shadow:var(--shadow);background:var(--card);cursor:pointer;transition:transform .18s,box-shadow .18s}',
    '.cecp-softbox:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.15)}',
    '.cecp-softbox h4{margin:0 0 10px;font-size:18px;color:var(--text);font-weight:800}',
    '.cecp-softbox p{margin:0;color:var(--muted);font-size:15px;line-height:1.9}',
    '.cecp-peach{background:linear-gradient(135deg,rgba(185,134,68,.18),rgba(185,134,68,.08))}',
    '.cecp-green{background:linear-gradient(135deg,rgba(90,125,78,.20),rgba(90,125,78,.08))}',
    '.cecp-blue{background:linear-gradient(135deg,rgba(80,110,140,.20),rgba(80,110,140,.08))}',
    /* Modal */
    '.cecp-modal-backdrop{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .22s ease;pointer-events:none}',
    '.cecp-modal-backdrop.show{opacity:1;pointer-events:auto}',
    '.cecp-modal{background:#1e1a16;color:#f4ede3;border-radius:24px;padding:32px 28px;max-width:520px;width:100%;box-shadow:0 32px 80px rgba(0,0,0,.5);border:1px solid rgba(255,220,160,.12);transform:translateY(16px) scale(.97);transition:transform .25s ease;max-height:85vh;overflow-y:auto;position:relative}',
    '.cecp-modal-backdrop.show .cecp-modal{transform:translateY(0) scale(1)}',
    '.cecp-modal-close{position:absolute;top:14px;right:16px;background:rgba(255,255,255,.08);border:none;color:#c1b3a4;border-radius:50%;width:32px;height:32px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;line-height:1}',
    '.cecp-modal-close:hover{background:rgba(255,255,255,.15);color:#fff}',
    '.cecp-modal-tag{font-size:12px;color:#c49a4a;letter-spacing:.08em;margin-bottom:8px}',
    '.cecp-modal-title{font-size:22px;font-weight:800;margin:0 0 14px;color:#fff8f1;line-height:1.3}',
    '.cecp-modal-body{font-size:16px;color:#c1b3a4;line-height:1.9}',
    '.cecp-modal-body p{margin:0 0 10px}.cecp-modal-body p:last-child{margin:0}',
    /* Responsive */
    '@media(max-width:900px){.cecp-easter-grid{grid-template-columns:1fr}.cecp-bottom-cards{grid-template-columns:1fr 1fr}}',
    '@media(max-width:600px){',
    '  .cecp-easter-hero{margin:12px 12px 0;padding:28px 18px 26px;border-radius:20px}',
    '  .cecp-easter-hero p{font-size:15px}',
    '  .cecp-easter-pill{padding:8px 11px;font-size:13px}',
    '  .cecp-welcome{grid-template-columns:1fr;padding:0 12px;margin-top:14px;gap:12px}',
    '  .cecp-text-block{padding:18px;border-radius:16px}',
    '  .cecp-text-block h3{font-size:19px}.cecp-text-block p{font-size:15px}',
    '  .cecp-easter-grid{padding:0 12px;margin-top:14px;gap:12px}',
    '  .cecp-card{padding:18px;border-radius:18px}',
    '  .cecp-title{font-size:20px}.cecp-item{font-size:16px}.cecp-time{font-size:14px}',
    '  .cecp-bottom-cards{grid-template-columns:1fr;padding:0 12px;margin-top:14px;gap:12px;margin-bottom:16px}',
    '  .cecp-softbox{padding:16px}.cecp-softbox h4{font-size:17px}.cecp-softbox p{font-size:14px}',
    '  .cecp-accordion-head h3{font-size:17px}',
    '  .cecp-modal{padding:24px 18px;border-radius:20px}.cecp-modal-title{font-size:19px}}'
  ].join('');

  /* ===================== 注入样式 ===================== */
  if (!document.getElementById('cecp-easter-style')) {
    var style = document.createElement('style');
    style.id = 'cecp-easter-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ===================== 注入 HTML ===================== */
  var wrapper = document.createElement('div');
  wrapper.innerHTML = [
    '<section class="cecp-easter-wrap"><div class="cecp-easter-shell">',

    /* Hero */
    '<div class="cecp-easter-hero">',
    '<h2>2026 复活节培灵聚会</h2>',
    '<p>欢迎您和家人朋友一同参加我们复活节期间的聚会。愿我们在主里一同思想基督的受死与复活，在真道中得着安慰、盼望与更新。</p>',
    '<div class="cecp-easter-meta">',
    '<span class="cecp-easter-pill">📅 2026.4.5 \u2013 2026.4.6</span>',
    '<span class="cecp-easter-pill">📍 Padova</span>',
    '<span class="cecp-easter-pill">⛪ 基督教帕多瓦华人教会</span>',
    '</div></div>',

    /* Welcome */
    '<div class="cecp-welcome">',
    '<div class="cecp-text-block cecp-clickable" data-modal-tag="欢迎" data-modal-title="欢迎你来">',
    '<h3>欢迎你来</h3>',
    '<p>亲爱的朋友，此刻的你，心情还好吗？在忙碌、压力与不安之中，我们常常需要的不只是暂时的放松，而是一份从神而来的真实平安。欢迎你来到复活节聚会，一同认识这位赐下盼望与生命的主。</p>',
    '</div>',
    '<div class="cecp-text-block cecp-clickable" data-modal-tag="邀请" data-modal-title="聚会邀请">',
    '<h3>聚会邀请</h3>',
    '<p>不在于外在的享乐，而在于主里面真实的喜乐。圣经说：\u201c在世上你们有苦难，但你们可以放心，我已经胜了世界。\u201d愿你在这次聚会中，重新得着安慰、力量与盼望。</p>',
    '</div></div>',

    /* Grid */
    '<div class="cecp-easter-grid">',
    '<div class="cecp-card">',
    '<h3 class="cecp-title">聚会程序表</h3>',
    '<p class="cecp-sub">点击日期展开 · 点击项目放大查看</p>',

    /* Day 1 */
    '<div class="cecp-accordion">',
    '<div class="cecp-accordion-head open" data-cecp-toggle>',
    '<h3>4月5日 礼拜天</h3>',
    '<div class="cecp-accordion-meta"><span class="cecp-accordion-badge">13:30\u201317:30</span><span class="cecp-accordion-arrow">\u25bc</span></div>',
    '</div>',
    '<div class="cecp-accordion-body open"><div class="cecp-list">',
    row('4月5日','用餐','12:30\u201313:30','用餐'),
    row('4月5日','祷告会','13:30\u201314:10','祷告会'),
    row('4月5日','诗歌敬拜、祷告','14:10\u201314:40','诗歌敬拜、祷告'),
    row('4月5日｜证道一','证道一','14:40\u201315:40','证道一\u2003耶稣的死，使神人和好（罗 5:6\u201311）'),
    row('4月5日','诗歌回应','15:40\u201315:50','诗歌回应'),
    row('4月5日｜证道二','证道二','15:50\u201316:50','证道二\u2003耶稣的复活，带来盼望喜乐（罗 6:1\u201314）'),
    row('4月5日','圣餐','16:50\u201317:30','圣餐'),
    row('4月5日','祝福祷告','17:30','祝福祷告'),
    '</div></div></div>',

    /* Day 2 */
    '<div class="cecp-accordion">',
    '<div class="cecp-accordion-head" data-cecp-toggle>',
    '<h3>4月6日 礼拜一</h3>',
    '<div class="cecp-accordion-meta"><span class="cecp-accordion-badge">09:30\u201317:00</span><span class="cecp-accordion-arrow">\u25bc</span></div>',
    '</div>',
    '<div class="cecp-accordion-body"><div class="cecp-list">',
    row('4月6日','早餐','09:30 开始','早餐'),
    row('4月6日','祷告会','10:30\u201311:20','祷告会'),
    row('4月6日','诗歌敬拜祷告','11:20\u201311:50','诗歌敬拜祷告'),
    row('4月6日｜证道一','证道一','11:50\u201312:50','证道一\u2003得蒙怜悯，胜过审判（创 18:20\u201333）'),
    row('4月6日','用餐时间','12:50\u201314:00','用餐时间'),
    row('4月6日','诗歌敬拜、祷告','14:00\u201314:30','诗歌敬拜、祷告'),
    row('4月6日｜证道二','证道二','14:30\u201315:30','证道二\u2003尊主为大，胜过罪恶（创 32:1\u201333:17）'),
    row('4月6日','诗歌回应','15:30\u201315:50','诗歌回应'),
    row('4月6日｜证道三','证道三','15:50\u201316:50','证道三\u2003饱尝主恩，胜过仇恨（创 50:19\u201321）'),
    row('4月6日','祝福祷告散会','16:50\u201317:00','祝福祷告散会'),
    '</div></div></div>',
    '</div>', /* end card */

    /* Right stack */
    '<div class="cecp-stack">',

    /* Sermons */
    '<div class="cecp-card"><h3 class="cecp-title">证道主题</h3>',
    sermon('4月5日｜证道一','耶稣的死，使神人和好（罗 5:6\u201311）'),
    sermon('4月5日｜证道二','耶稣的复活，带来盼望喜乐（罗 6:1\u201314）'),
    sermon('4月6日｜证道一','得蒙怜悯，胜过审判（创 18:20\u201333）'),
    sermon('4月6日｜证道二','尊主为大，胜过罪恶（创 32:1\u201333:17）'),
    sermon('4月6日｜证道三','饱尝主恩，胜过仇恨（创 50:19\u201321）'),
    '</div>',

    /* Speaker */
    '<div class="cecp-card"><h3 class="cecp-title">讲员信息</h3>',
    '<div class="cecp-mini-list">',
    '<div class="cecp-mini-item cecp-clickable" data-modal-tag="讲员" data-modal-title="胡维华博士 Th.D｜牧师">',
    '<strong>胡维华博士 Th.D｜牧师</strong>',
    '<span>国际欧华神学院院长、旧约教授；美国戈登康威尔神学院道学硕士、神学硕士；加拿大多伦多大学神学博士。曾任中华福音神学院副教授、教务长、国际长、教牧中心主任、神学硕士科主任等。</span>',
    '</div></div></div>',

    /* Location */
    '<div class="cecp-card"><h3 class="cecp-title">聚会地点与联系</h3>',
    '<div class="cecp-mini-list">',
    '<div class="cecp-mini-item">',
    '<strong>聚会地址</strong>',
    '<span><a class="cecp-link" target="_blank" rel="noopener" href="https://maps.app.goo.gl/gvzmgk1Wk76TKAQr6">Via Ugo Foscolo, 4, 35131 Padova PD</a></span>',
    '<div class="cecp-actions">',
    '<a class="cecp-btn" target="_blank" rel="noopener" href="https://maps.app.goo.gl/gvzmgk1Wk76TKAQr6">打开地图</a>',
    '<button class="cecp-btn" type="button" data-cecp-copy="Via Ugo Foscolo, 4, 35131 Padova PD" data-cecp-msg="已复制地址">复制地址</button>',
    '<span class="cecp-copy-tip"></span>',
    '</div></div>',
    '<div class="cecp-mini-item">',
    '<strong>停车场</strong>',
    '<span><a class="cecp-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Diego+Valeri+11+Padova">Via Diego Valeri 11, Padova</a></span>',
    '<div class="cecp-actions">',
    '<a class="cecp-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Diego+Valeri+11+Padova">打开地图</a>',
    '<button class="cecp-btn" type="button" data-cecp-copy="Via Diego Valeri 11, Padova" data-cecp-msg="已复制停车场地址">复制地址</button>',
    '<span class="cecp-copy-tip"></span>',
    '</div></div>',
    '<div class="cecp-mini-item">',
    '<strong>联系同工</strong>',
    '<span><a class="cecp-link" href="tel:+393200117828">陈长老 320 011 7828</a><br><a class="cecp-link" href="tel:+393281648937">金弟兄 328 164 8937</a></span>',
    '<div class="cecp-actions">',
    '<a class="cecp-btn" href="tel:+393200117828">拨打陈长老</a>',
    '<button class="cecp-btn" type="button" data-cecp-copy="3200117828" data-cecp-msg="已复制陈长老电话">复制陈长老电话</button>',
    '<span class="cecp-copy-tip"></span>',
    '</div>',
    '<div class="cecp-actions">',
    '<a class="cecp-btn" href="tel:+393281648937">拨打金弟兄</a>',
    '<button class="cecp-btn" type="button" data-cecp-copy="3281648937" data-cecp-msg="已复制金弟兄电话">复制金弟兄电话</button>',
    '<span class="cecp-copy-tip"></span>',
    '</div></div></div></div>',

    /* Verse */
    '<div class="cecp-verse">',
    '\u201c我就是复活，我就是生命；信我的人虽然死了，也必复活。\u201d',
    '<strong>约翰福音 11:25</strong>',
    '</div>',

    '</div></div>', /* end stack + grid */

    /* Bottom cards */
    '<div class="cecp-bottom-cards">',
    softbox('cecp-peach','主日聚会','聚会时间','12:00\u201413:30 主日青年团契<br>15:00\u201417:00 主日下午聚会<br>20:00\u201421:30 主日晚间聚会'),
    softbox('cecp-green','平时聚会','平时聚会','周三祷告会 21:00\u201422:00<br>周六祷告会 07:30\u201408:30<br>周六唱诗班 21:00\u201422:30<br>主日祷告会 14:00\u201414:40'),
    softbox('cecp-blue','爱心餐食','爱心餐食','教会每个主日提供爱心午餐及晚餐。<br>午餐：13:30\u201414:10<br>晚餐：19:00\u201419:40'),
    '</div>',

    '</div></section>',

    /* Modal */
    '<div class="cecp-modal-backdrop" id="cecpModalBackdrop">',
    '<div class="cecp-modal" id="cecpModal">',
    '<button class="cecp-modal-close" id="cecpModalClose">\u2715</button>',
    '<div class="cecp-modal-tag" id="cecpModalTag"></div>',
    '<div class="cecp-modal-title" id="cecpModalTitle"></div>',
    '<div class="cecp-modal-body" id="cecpModalBody"></div>',
    '</div></div>'
  ].join('');

  /* helper: schedule row */
  function row(tag, title, time, detail) {
    return '<div class="cecp-row cecp-clickable" data-modal-tag="' + tag + '" data-modal-title="' + title + '" data-modal-detail="' + detail + '">'
      + '<div class="cecp-time">' + time + '</div>'
      + '<div class="cecp-item">' + title + '</div>'
      + '</div>';
  }

  /* helper: sermon */
  function sermon(tag, text) {
    return '<div class="cecp-sermon cecp-clickable" data-modal-tag="' + tag + '" data-modal-title="' + tag + '" data-modal-detail="' + text + '">'
      + '<h4>' + tag + '</h4><p>' + text + '</p>'
      + '</div>';
  }

  /* helper: softbox */
  function softbox(cls, tag, title, content) {
    return '<div class="cecp-softbox ' + cls + ' cecp-clickable" data-modal-tag="' + tag + '" data-modal-title="' + title + '" data-modal-detail="' + content + '">'
      + '<h4>' + title + '</h4><p>' + content + '</p>'
      + '</div>';
  }

  var scripts = document.getElementsByTagName('script');
  var thisScript = scripts[scripts.length - 1];
  thisScript.parentNode.insertBefore(wrapper, thisScript);

  /* ===================== 交互 ===================== */
  var backdrop   = wrapper.querySelector('#cecpModalBackdrop');
  var modalTag   = wrapper.querySelector('#cecpModalTag');
  var modalTitle = wrapper.querySelector('#cecpModalTitle');
  var modalBody  = wrapper.querySelector('#cecpModalBody');
  var modalClose = wrapper.querySelector('#cecpModalClose');

  function openModal(tag, title, bodyHtml) {
    modalTag.textContent   = tag;
    modalTitle.textContent = title;
    modalBody.innerHTML    = bodyHtml;
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function(e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

  wrapper.addEventListener('click', function(e) {

    /* Accordion */
    var head = e.target.closest('[data-cecp-toggle]');
    if (head) {
      var body = head.nextElementSibling;
      var isOpen = head.classList.contains('open');
      head.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
      return;
    }

    /* Skip links/buttons */
    if (e.target.closest('a, button')) return;

    /* Modal: read displayed text from DOM */
    var trigger = e.target.closest('.cecp-clickable');
    if (trigger) {
      var tag   = trigger.getAttribute('data-modal-tag') || '';
      var title = trigger.getAttribute('data-modal-title') || '';
      /* Use data-modal-detail if set, otherwise grab inner text of p/span/strong */
      var detail = trigger.getAttribute('data-modal-detail');
      var bodyHtml;
      if (detail) {
        bodyHtml = '<p>' + detail + '</p>';
      } else {
        var parts = [];
        var nodes = trigger.querySelectorAll('p, span, strong');
        for (var i = 0; i < nodes.length; i++) {
          var t = nodes[i].textContent.trim();
          if (t) parts.push('<p>' + t + '</p>');
        }
        bodyHtml = parts.join('') || '<p>' + trigger.textContent.trim() + '</p>';
      }
      openModal(tag, title, bodyHtml);
      return;
    }

    /* Copy */
    var btn = e.target.closest('[data-cecp-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-cecp-copy');
    var msg  = btn.getAttribute('data-cecp-msg') || '已复制';
    var tip  = btn.nextElementSibling;
    function showTip() { if (tip) { tip.textContent = msg; setTimeout(function() { tip.textContent = ''; }, 1800); } }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showTip).catch(fb);
    } else { fb(); }
    function fb() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand('copy'); showTip(); }
      catch(err) { if (tip) { tip.textContent = '复制失败，请手动复制'; setTimeout(function() { tip.textContent = ''; }, 2200); } }
      document.body.removeChild(ta);
    }
  });

})();
