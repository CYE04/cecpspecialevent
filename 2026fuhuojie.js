(function () {
  /* ============================================================
     cecp-easter.js · 2026 复活节培灵聚会组件
     在 Halo HTML 编辑块里粘贴以下一行即可：
     <script src="https://你的用户名.github.io/你的仓库/文件名字.js"></script>
     ============================================================ */

  /* ---------- 样式 ---------- */
  var CSS = `
.cecp-easter-wrap{
  --bg:#f6f3ee;--card:#ffffff;--card-soft:#fbf8f3;--text:#2b241d;
  --muted:#786d62;--line:rgba(91,72,50,.12);--gold:#b98644;
  --gold-soft:#f3e1cb;--tag:#f4ece3;
  --shadow:0 14px 34px rgba(48,34,20,.08);--radius:24px;
  --link:#8d5e2d;--hero1:#2d2117;--hero2:#6b5035;
  --heroText:#fff8f1;--heroMuted:rgba(255,248,241,.84);
  max-width:100%;margin:0;padding:0;
  color:var(--text);
  font-family:"Noto Serif SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",serif;
  line-height:1.75;box-sizing:border-box;
}
.cecp-easter-wrap *{box-sizing:border-box}
@media(prefers-color-scheme:dark){
  .cecp-easter-wrap{
    --bg:#151312;--card:#1d1a17;--card-soft:#221e1b;--text:#f4ede3;
    --muted:#c1b3a4;--line:rgba(255,241,224,.10);--gold:#d1a261;
    --gold-soft:rgba(209,162,97,.14);--tag:#2a241f;
    --shadow:0 16px 42px rgba(0,0,0,.28);--link:#e3b06a;
    --hero1:#1d1713;--hero2:#4f3a27;--heroText:#fff7ed;
    --heroMuted:rgba(255,247,237,.82);
  }
}
.cecp-easter-shell{background:var(--bg);border-radius:0;padding:20px}
.cecp-easter-hero{
  position:relative;overflow:hidden;border-radius:30px;padding:42px 28px 26px;
  background:radial-gradient(circle at 82% 18%,rgba(255,232,198,.92) 0%,rgba(255,232,198,.14) 16%,transparent 33%),
             linear-gradient(135deg,var(--hero1) 0%,var(--hero2) 100%);
  color:var(--heroText);box-shadow:var(--shadow);
}
.cecp-easter-hero::before{
  content:"";position:absolute;right:-70px;bottom:-100px;
  width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,.07)
}
.cecp-easter-hero h2{margin:0;font-size:clamp(30px,5vw,52px);line-height:1.12;font-weight:800;letter-spacing:.02em}
.cecp-easter-hero p{margin:14px 0 0;max-width:760px;color:var(--heroMuted);font-size:16px}
.cecp-easter-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.cecp-easter-pill{
  display:inline-flex;align-items:center;gap:8px;padding:10px 14px;
  border-radius:14px;background:rgba(255,255,255,.10);
  border:1px solid rgba(255,255,255,.16);font-size:14px;color:var(--heroText);text-decoration:none
}
.cecp-welcome{margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
.cecp-text-block{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:22px;box-shadow:var(--shadow)}
.cecp-text-block h3{margin:0 0 10px;font-size:22px;color:var(--gold)}
.cecp-text-block p{margin:0;color:var(--text);font-size:15px}
.cecp-easter-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:22px;margin-top:22px}
.cecp-card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:24px}
.cecp-title{margin:0 0 10px;font-size:24px;line-height:1.3;font-weight:800;color:var(--gold)}
.cecp-sub{margin:0;font-size:14px;color:var(--muted)}
.cecp-day{margin-top:18px;border-radius:20px;overflow:hidden;border:1px solid var(--line);background:var(--card-soft)}
.cecp-day-head{
  display:flex;justify-content:space-between;align-items:center;gap:12px;
  padding:15px 18px;background:var(--tag);border-bottom:1px solid var(--line)
}
.cecp-day-head h3{margin:0;font-size:22px;color:var(--text)}
.cecp-day-badge{
  padding:6px 12px;border-radius:999px;background:var(--card);
  border:1px solid var(--line);font-size:13px;color:var(--muted);white-space:nowrap
}
.cecp-list{padding:10px 18px 18px}
.cecp-row{display:grid;grid-template-columns:160px 1fr;gap:14px;padding:12px 0;border-bottom:1px dashed var(--line)}
.cecp-row:last-child{border-bottom:none}
.cecp-time{font-weight:800;font-size:18px;color:var(--text)}
.cecp-item{font-weight:600;font-size:18px;color:var(--text)}
.cecp-stack{display:grid;gap:18px}
.cecp-mini-list{display:grid;gap:12px;margin-top:10px}
.cecp-mini-item{padding:15px 16px;border-radius:16px;background:var(--card-soft);border:1px solid var(--line)}
.cecp-mini-item strong{display:block;margin-bottom:4px;font-size:16px;color:var(--text)}
.cecp-mini-item span{color:var(--muted);font-size:14px}
.cecp-sermon{padding:15px 16px;border-radius:16px;background:var(--card-soft);border:1px solid var(--line);margin-top:12px}
.cecp-sermon h4{margin:0 0 6px;font-size:16px;color:var(--gold)}
.cecp-sermon p{margin:0;color:var(--text);font-size:15px}
.cecp-link{color:var(--link);text-decoration:none;border-bottom:1px solid transparent;transition:.2s;word-break:break-word}
.cecp-link:hover{border-bottom-color:currentColor}
.cecp-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.cecp-btn{
  appearance:none;border-radius:12px;padding:10px 14px;font-size:14px;cursor:pointer;
  background:var(--tag);color:var(--text);border:1px solid var(--line);
  transition:.2s;text-decoration:none;display:inline-block;font-family:inherit
}
.cecp-btn:hover{transform:translateY(-1px)}
.cecp-copy-tip{font-size:13px;color:var(--muted);margin-top:8px;min-height:20px;display:block}
.cecp-verse{
  margin-top:18px;padding:20px;border-radius:20px;
  background:linear-gradient(135deg,var(--gold-soft),transparent);
  border:1px solid var(--line);font-size:17px;color:var(--text)
}
.cecp-verse strong{display:block;margin-top:8px;font-size:14px;color:var(--gold);letter-spacing:.04em}
.cecp-bottom-cards{margin-top:22px;display:grid;grid-template-columns:1fr;gap:18px}
.cecp-softbox{border-radius:26px;padding:24px 22px;border:1px solid var(--line);box-shadow:var(--shadow);background:var(--card)}
.cecp-softbox h4{margin:0 0 14px;font-size:22px;color:var(--text);font-weight:800}
.cecp-softbox p{margin:0;color:var(--muted);font-size:16px;line-height:1.8}
.cecp-peach{background:linear-gradient(135deg,rgba(185,134,68,.18),rgba(185,134,68,.08))}
.cecp-green{background:linear-gradient(135deg,rgba(90,125,78,.20),rgba(90,125,78,.08))}
.cecp-blue{background:linear-gradient(135deg,rgba(80,110,140,.20),rgba(80,110,140,.08))}

@media(max-width:920px){.cecp-easter-grid,.cecp-welcome{grid-template-columns:1fr}}
@media(max-width:640px){
  .cecp-easter-shell{padding:12px;border-radius:24px}
  .cecp-easter-hero{padding:32px 18px 22px;border-radius:22px}
  .cecp-card,.cecp-text-block,.cecp-softbox{padding:18px;border-radius:18px}
  .cecp-title{font-size:21px}
  .cecp-day-head{flex-direction:column;align-items:flex-start}
  .cecp-row{grid-template-columns:1fr;gap:4px}
  .cecp-time,.cecp-item{font-size:17px}
  .cecp-softbox h4{font-size:20px}
  .cecp-softbox p{font-size:15px}
}
`;

  /* ---------- HTML ---------- */
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
        <p class="cecp-sub">欢迎弟兄姐妹预留时间，一同参加复活节培灵聚会。</p>

        <div class="cecp-day">
          <div class="cecp-day-head">
            <h3>4月5日 礼拜天</h3>
            <span class="cecp-day-badge">13:30 – 17:30</span>
          </div>
          <div class="cecp-list">
            <div class="cecp-row"><div class="cecp-time">12:30 – 13:30</div><div class="cecp-item">用餐</div></div>
            <div class="cecp-row"><div class="cecp-time">13:30 – 14:10</div><div class="cecp-item">祷告会</div></div>
            <div class="cecp-row"><div class="cecp-time">14:10 – 14:40</div><div class="cecp-item">诗歌敬拜、祷告</div></div>
            <div class="cecp-row"><div class="cecp-time">14:40 – 15:40</div><div class="cecp-item">（证道一）</div></div>
            <div class="cecp-row"><div class="cecp-time">15:40 – 15:50</div><div class="cecp-item">诗歌回应</div></div>
            <div class="cecp-row"><div class="cecp-time">15:50 – 16:50</div><div class="cecp-item">（证道二）</div></div>
            <div class="cecp-row"><div class="cecp-time">16:50 – 17:30</div><div class="cecp-item">圣餐</div></div>
            <div class="cecp-row"><div class="cecp-time">17:30</div><div class="cecp-item">祝福祷告</div></div>
          </div>
        </div>

        <div class="cecp-day">
          <div class="cecp-day-head">
            <h3>4月6日 礼拜一</h3>
            <span class="cecp-day-badge">11:20 – 17:00</span>
          </div>
          <div class="cecp-list">
            <div class="cecp-row"><div class="cecp-time">10:30 – 11:20</div><div class="cecp-item">祷告会</div></div>
            <div class="cecp-row"><div class="cecp-time">11:20 – 11:50</div><div class="cecp-item">诗歌敬拜祷告</div></div>
            <div class="cecp-row"><div class="cecp-time">11:50 – 12:50</div><div class="cecp-item">证道一</div></div>
            <div class="cecp-row"><div class="cecp-time">12:50 – 14:00</div><div class="cecp-item">用餐时间</div></div>
            <div class="cecp-row"><div class="cecp-time">14:00 – 14:30</div><div class="cecp-item">诗歌敬拜、祷告</div></div>
            <div class="cecp-row"><div class="cecp-time">14:30 – 15:30</div><div class="cecp-item">证道二</div></div>
            <div class="cecp-row"><div class="cecp-time">15:30 – 15:50</div><div class="cecp-item">诗歌回应</div></div>
            <div class="cecp-row"><div class="cecp-time">15:50 – 16:50</div><div class="cecp-item">证道三</div></div>
            <div class="cecp-row"><div class="cecp-time">16:50 – 17:00</div><div class="cecp-item">祝福祷告散会</div></div>
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
              <span><a class="cecp-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Ugo+Foscolo+4+Padova">Via Ugo Foscolo 4, Padova</a></span>
              <div class="cecp-actions">
                <a class="cecp-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Via+Ugo+Foscolo+4+Padova">打开地图</a>
                <button class="cecp-btn" type="button" data-cecp-copy="Via Ugo Foscolo 4, Padova" data-cecp-msg="已复制地址">复制地址</button>
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
        <h4>我们的聚会时间</h4>
        <p>12:00—13:30 主日青年团契<br>15:00—17:00 主日下午聚会<br>20:00—21:30 主日晚间聚会</p>
      </div>
      <div class="cecp-softbox cecp-green">
        <h4>平时聚会安排</h4>
        <p>周三祷告会 21:00—22:00<br>周六祷告会 07:30—08:30<br>周六唱诗班 21:00—22:30<br>主日祷告会 14:00—14:40</p>
      </div>
      <div class="cecp-softbox cecp-blue">
        <h4>爱心餐食</h4>
        <p>教会每个主日提供爱心午餐及晚餐。<br>午餐时间：13:30—14:10<br>晚餐时间：19:00—19:40</p>
      </div>
    </div>


  </div>
</section>
`;

  /* ---------- 注入样式（防重复） ---------- */
  if (!document.getElementById('cecp-easter-style')) {
    var style = document.createElement('style');
    style.id = 'cecp-easter-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ---------- 注入 HTML（插入到 script 标签位置） ---------- */
  var scripts = document.getElementsByTagName('script');
  var thisScript = scripts[scripts.length - 1];
  var wrapper = document.createElement('div');
  wrapper.innerHTML = HTML;
  thisScript.parentNode.insertBefore(wrapper, thisScript);

  /* ---------- 复制按钮事件委托 ---------- */
  wrapper.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cecp-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-cecp-copy');
    var msg  = btn.getAttribute('data-cecp-msg') || '已复制';
    var tip  = btn.nextElementSibling;

    function showTip() {
      if (tip) { tip.textContent = msg; setTimeout(function(){ tip.textContent = ''; }, 1800); }
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showTip).catch(fallback);
    } else {
      fallback();
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); showTip(); } catch(e) {
        if (tip) { tip.textContent = '复制失败，请手动复制'; setTimeout(function(){ tip.textContent=''; },2200); }
      }
      document.body.removeChild(ta);
    }
  });

})();
