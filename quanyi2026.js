/* ✦ CECP Special Event Songs - Single JS File ✦
 * Upload this file to GitHub Pages, then embed it in Halo:
 * <div id="cecp-special-songs"></div>
 * <script src="https://cye04.github.io/musiclib/special.js"></script>
 */

(function () {
  "use strict";

  const ACCESS_KEY = "cecp2026";

  // 改这里：只显示这 3 首歌
  const SPECIAL_SONG_IDS = [
    "laixiangyehehuagechang",
    "jidushiwomanzu",
    "maranatha"
  ];

  const EVENT_INFO = {
    title: "2026全意夏令营诗歌",
    subtitle: "本次活动敬拜曲目",
    description: "请提前熟悉歌曲、调性、歌词与练习音频。",
    badge: "CECP Worship",
    footer: "CECP 诗歌库 · Special Event"
  };

  const MUSICLIB_JS_URL = "https://cye04.github.io/musiclib/musiclib.js";
  const MUSICLIB_ROOT_ID = "music-library";
  const SPECIAL_ROOT_ID = "cecp-special-songs";

  function buildUrl(songId) {
    const url = new URL(window.location.href);
    url.searchParams.set("key", ACCESS_KEY);
    if (songId) url.searchParams.set("song", songId);
    else url.searchParams.delete("song");
    return url.pathname + url.search + url.hash;
  }

  function goHome() {
    history.pushState({}, "", buildUrl(null));
    render();
  }

  function goSong(songId) {
    history.pushState({}, "", buildUrl(songId));
    render();
  }

  function injectStyle() {
    if (document.getElementById("cecp-special-style")) return;

    const style = document.createElement("style");
    style.id = "cecp-special-style";
    style.textContent = `
      :root {
        --cecp-sp-bg: #f6f1e8;
        --cecp-sp-bg2: #fffdf8;
        --cecp-sp-card: rgba(255,255,255,.76);
        --cecp-sp-text: #1f1b16;
        --cecp-sp-muted: #74695d;
        --cecp-sp-border: rgba(90,70,50,.14);
        --cecp-sp-accent: #b96343;
        --cecp-sp-accent2: #7f5135;
        --cecp-sp-shadow: 0 22px 70px rgba(67,45,22,.13);
      }

      html, body {
        background: var(--cecp-sp-bg) !important;
      }

      #${SPECIAL_ROOT_ID}, #cecp-special-shell {
        box-sizing: border-box;
        width: 100%;
        min-height: 100dvh;
        color: var(--cecp-sp-text);
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Noto Sans SC", "Segoe UI", sans-serif;
      }

      #cecp-special-shell * {
        box-sizing: border-box;
      }

      .cecp-sp-page {
        min-height: 100dvh;
        padding: max(22px, env(safe-area-inset-top)) 16px max(34px, env(safe-area-inset-bottom));
        background:
          radial-gradient(circle at 12% 0%, rgba(185,99,67,.22), transparent 34%),
          radial-gradient(circle at 88% 8%, rgba(127,81,53,.14), transparent 30%),
          linear-gradient(145deg, var(--cecp-sp-bg), var(--cecp-sp-bg2));
      }

      .cecp-sp-wrap {
        width: min(920px, 100%);
        margin: 0 auto;
      }

      .cecp-sp-hero {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--cecp-sp-border);
        border-radius: 30px;
        padding: 28px 22px;
        background: linear-gradient(145deg, rgba(255,255,255,.82), rgba(255,250,241,.58));
        box-shadow: var(--cecp-sp-shadow);
        backdrop-filter: blur(18px);
      }

      .cecp-sp-hero::after {
        content: "♪";
        position: absolute;
        right: 22px;
        top: 10px;
        font-size: 110px;
        line-height: 1;
        color: rgba(185,99,67,.08);
        pointer-events: none;
      }

      .cecp-sp-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(185,99,67,.22);
        background: rgba(185,99,67,.10);
        color: var(--cecp-sp-accent2);
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 13px;
        font-weight: 700;
      }

      .cecp-sp-title {
        margin: 18px 0 8px;
        font-size: clamp(30px, 6vw, 52px);
        line-height: 1.02;
        letter-spacing: -.04em;
        font-weight: 850;
      }

      .cecp-sp-subtitle {
        margin: 0;
        color: var(--cecp-sp-muted);
        font-size: 16px;
        line-height: 1.7;
      }

      .cecp-sp-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 18px;
      }

      .cecp-sp-card {
        position: relative;
        appearance: none;
        width: 100%;
        min-height: 154px;
        text-align: left;
        border: 1px solid var(--cecp-sp-border);
        border-radius: 24px;
        background: var(--cecp-sp-card);
        box-shadow: 0 14px 36px rgba(67,45,22,.08);
        padding: 18px;
        color: inherit;
        cursor: pointer;
        overflow: hidden;
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        backdrop-filter: blur(14px);
      }

      .cecp-sp-card:active {
        transform: scale(.985);
      }

      .cecp-sp-card:hover {
        transform: translateY(-3px);
        border-color: rgba(185,99,67,.34);
        box-shadow: 0 18px 44px rgba(67,45,22,.12);
      }

      .cecp-sp-num {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: rgba(185,99,67,.12);
        color: var(--cecp-sp-accent2);
        font-weight: 850;
        font-size: 14px;
      }

      .cecp-sp-song-title {
        margin: 18px 0 6px;
        font-size: 20px;
        line-height: 1.22;
        font-weight: 820;
        letter-spacing: -.02em;
      }

      .cecp-sp-meta {
        color: var(--cecp-sp-muted);
        font-size: 13px;
        line-height: 1.45;
      }

      .cecp-sp-arrow {
        position: absolute;
        right: 16px;
        bottom: 14px;
        width: 32px;
        height: 32px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: rgba(31,27,22,.06);
        color: var(--cecp-sp-accent2);
        font-weight: 900;
      }

      .cecp-sp-footer {
        margin-top: 18px;
        text-align: center;
        color: rgba(31,27,22,.48);
        font-size: 13px;
      }

      .cecp-sp-error {
        min-height: 65dvh;
        display: grid;
        place-items: center;
        padding: 22px;
      }

      .cecp-sp-error-card {
        width: min(520px, 100%);
        border: 1px solid var(--cecp-sp-border);
        border-radius: 28px;
        padding: 26px;
        background: rgba(255,255,255,.8);
        box-shadow: var(--cecp-sp-shadow);
        text-align: center;
      }

      .cecp-sp-error-card h2 {
        margin: 0 0 10px;
        font-size: 24px;
      }

      .cecp-sp-error-card p {
        margin: 0 0 18px;
        color: var(--cecp-sp-muted);
        line-height: 1.65;
      }

      .cecp-sp-btn {
        border: 0;
        border-radius: 999px;
        padding: 12px 18px;
        background: var(--cecp-sp-text);
        color: white;
        font-weight: 760;
        cursor: pointer;
      }

      .cecp-special-back {
        position: fixed;
        left: max(14px, env(safe-area-inset-left));
        top: max(14px, env(safe-area-inset-top));
        z-index: 2147483000;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        min-height: 42px;
        border: 1px solid rgba(255,255,255,.55);
        border-radius: 999px;
        padding: 0 14px;
        background: rgba(31,27,22,.72);
        color: #fff;
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 12px 34px rgba(0,0,0,.18);
        backdrop-filter: blur(14px);
        cursor: pointer;
      }

      #${MUSICLIB_ROOT_ID}.cecp-special-hidden {
        display: none !important;
      }

      @media (max-width: 760px) {
        .cecp-sp-page {
          padding-left: 12px;
          padding-right: 12px;
        }
        .cecp-sp-hero {
          border-radius: 26px;
          padding: 24px 18px;
        }
        .cecp-sp-list {
          grid-template-columns: 1fr;
        }
        .cecp-sp-card {
          min-height: 132px;
        }
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --cecp-sp-bg: #11100f;
          --cecp-sp-bg2: #1b1714;
          --cecp-sp-card: rgba(35,30,26,.72);
          --cecp-sp-text: #fff8ef;
          --cecp-sp-muted: #c2b3a5;
          --cecp-sp-border: rgba(255,238,220,.13);
          --cecp-sp-accent: #e09a73;
          --cecp-sp-accent2: #f0bd9d;
          --cecp-sp-shadow: 0 22px 70px rgba(0,0,0,.32);
        }

        html, body {
          background: var(--cecp-sp-bg) !important;
        }

        .cecp-sp-arrow {
          background: rgba(255,255,255,.08);
        }

        .cecp-sp-error-card {
          background: rgba(35,30,26,.82);
        }

        .cecp-sp-footer {
          color: rgba(255,248,239,.45);
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getGlobalSongs() {
    const candidates = [
      window.MUSICLIB_SONGS,
      window.CECP_SONGS,
      window.CECP_MUSICLIB_SONGS,
      window.SONGS,
      window.songs,
      window.musicSongs,
      window.musiclibSongs
    ];

    for (const item of candidates) {
      if (Array.isArray(item)) return item;
      if (item && Array.isArray(item.songs)) return item.songs;
    }

    for (const key of Object.keys(window)) {
      const val = window[key];
      if (!val || typeof val !== "object") continue;
      if (Array.isArray(val.songs) && val.songs.length) return val.songs;
      if (Array.isArray(val.SONGS) && val.SONGS.length) return val.SONGS;
    }

    return [];
  }

  function songIdOf(song) {
    return String(song.id || song.slug || song.key || song.song || song.title || "").trim();
  }

  function songTitleOf(song, id) {
    return song.title || song.name || song.songTitle || id;
  }

  function songArtistOf(song) {
    return song.artist || song.author || song.singer || song.source || song.album || "";
  }

  function getSpecialSongs() {
    const songs = getGlobalSongs();

    return SPECIAL_SONG_IDS.map((id) => {
      const found = songs.find((s) => songIdOf(s) === id);
      return found || { id, title: id, artist: "" };
    });
  }

  function hasMusiclibLoaded() {
    if (getGlobalSongs().length) return true;
    if (window.CECPMusicLib || window.MusicLib || window.musiclib) return true;
    return false;
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = Array.from(document.scripts).find((s) => s.src === src);

      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        if (existing.dataset.loaded === "1") resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => {
        script.dataset.loaded = "1";
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function ensureMusiclib() {
    if (hasMusiclibLoaded()) return;
    await loadScriptOnce(MUSICLIB_JS_URL);
    await new Promise((r) => setTimeout(r, 80));
  }

  function ensureRoots() {
    let root = document.getElementById(SPECIAL_ROOT_ID);

    if (!root) {
      root = document.createElement("div");
      root.id = SPECIAL_ROOT_ID;
      document.body.appendChild(root);
    }

    let musicRoot = document.getElementById(MUSICLIB_ROOT_ID);

    if (!musicRoot) {
      musicRoot = document.createElement("div");
      musicRoot.id = MUSICLIB_ROOT_ID;
      document.body.appendChild(musicRoot);
    }

    return { root, musicRoot };
  }

  function renderHome() {
    const { root, musicRoot } = ensureRoots();

    musicRoot.classList.add("cecp-special-hidden");
    root.style.display = "block";

    const specialSongs = getSpecialSongs();

    root.innerHTML = `
      <div id="cecp-special-shell">
        <main class="cecp-sp-page">
          <div class="cecp-sp-wrap">
            <section class="cecp-sp-hero">
              <div class="cecp-sp-badge">${escapeHtml(EVENT_INFO.badge)}</div>
              <h1 class="cecp-sp-title">${escapeHtml(EVENT_INFO.title)}</h1>
              <p class="cecp-sp-subtitle">
                ${escapeHtml(EVENT_INFO.subtitle)}<br>
                ${escapeHtml(EVENT_INFO.description)}
              </p>
            </section>

            <section class="cecp-sp-list" aria-label="特殊活动歌曲列表">
              ${specialSongs.map((song, index) => {
                const id = songIdOf(song) || SPECIAL_SONG_IDS[index];
                const title = songTitleOf(song, id);
                const artist = songArtistOf(song);
                const key = song.origKey || song.key || song.originalKey || "";
                const meta = [artist, key ? `原调 ${key}` : ""].filter(Boolean).join(" · ");

                return `
                  <button class="cecp-sp-card" type="button" data-song-id="${escapeAttr(id)}">
                    <div class="cecp-sp-num">${String(index + 1).padStart(2, "0")}</div>
                    <div class="cecp-sp-song-title">${escapeHtml(title)}</div>
                    <div class="cecp-sp-meta">${escapeHtml(meta || "点击进入练习")}</div>
                    <div class="cecp-sp-arrow">›</div>
                  </button>
                `;
              }).join("")}
            </section>

            <div class="cecp-sp-footer">${escapeHtml(EVENT_INFO.footer)}</div>
          </div>
        </main>
      </div>
    `;

    root.querySelectorAll("[data-song-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        goSong(btn.getAttribute("data-song-id"));
      });
    });
  }

  function renderError(title, text) {
    const { root, musicRoot } = ensureRoots();

    musicRoot.classList.add("cecp-special-hidden");
    root.style.display = "block";

    root.innerHTML = `
      <div id="cecp-special-shell">
        <main class="cecp-sp-page cecp-sp-error">
          <div class="cecp-sp-error-card">
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(text)}</p>
            <button class="cecp-sp-btn" type="button" id="cecp-sp-back-home">返回活动歌曲</button>
          </div>
        </main>
      </div>
    `;

    const btn = document.getElementById("cecp-sp-back-home");
    if (btn) btn.addEventListener("click", goHome);
  }

  async function renderSong(songId) {
    const { root, musicRoot } = ensureRoots();

    if (!SPECIAL_SONG_IDS.includes(songId)) {
      renderError("这首歌不在本次活动列表中", "请从本次特殊活动的 3 首歌里面选择。");
      return;
    }

    root.style.display = "none";
    musicRoot.classList.remove("cecp-special-hidden");

    await ensureMusiclib();

    const url = new URL(window.location.href);
    url.searchParams.set("key", ACCESS_KEY);
    url.searchParams.set("song", songId);
    history.replaceState({}, "", url.pathname + url.search + url.hash);

    addSpecialBackButton();

    const renderFns = [
      window.renderMusicLibrary,
      window.renderMusiclib,
      window.CECP_renderMusicLibrary,
      window.initMusicLibrary,
      window.initMusiclib,
      window.CECPMusicLib && window.CECPMusicLib.render,
      window.CECPMusicLib && window.CECPMusicLib.init,
      window.MusicLib && window.MusicLib.render,
      window.MusicLib && window.MusicLib.init
    ].filter((fn) => typeof fn === "function");

    if (renderFns.length) {
      try {
        renderFns[0]({
          rootId: MUSICLIB_ROOT_ID,
          song: songId,
          specialMode: true
        });
      } catch (e) {
        try {
          renderFns[0]();
        } catch (_) {}
      }
    }

    patchOriginalBackButtons();
  }

  function addSpecialBackButton() {
    let btn = document.getElementById("cecp-special-back-btn");

    if (!btn) {
      btn = document.createElement("button");
      btn.id = "cecp-special-back-btn";
      btn.className = "cecp-special-back";
      btn.type = "button";
      btn.innerHTML = "‹ 活动歌曲";
      document.body.appendChild(btn);
    }

    btn.onclick = goHome;
    btn.style.display = "inline-flex";
  }

  function removeSpecialBackButton() {
    const btn = document.getElementById("cecp-special-back-btn");
    if (btn) btn.style.display = "none";
  }

  function patchOriginalBackButtons() {
    setTimeout(() => {
      const possibleBacks = Array.from(document.querySelectorAll("button, a, [role='button']"))
        .filter((el) => {
          const text = (el.textContent || "").trim();
          const aria = el.getAttribute("aria-label") || "";
          const cls = el.className ? String(el.className) : "";
          return /返回|back|Back|←|‹/.test(text + aria + cls);
        });

      possibleBacks.forEach((el) => {
        if (el.id === "cecp-special-back-btn") return;

        el.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          goHome();
        }, true);
      });
    }, 400);
  }

  async function render() {
    injectStyle();
    ensureRoots();

    const latestParams = new URLSearchParams(window.location.search);
    const key = latestParams.get("key") || "";
    const song = latestParams.get("song") || "";

    if (key !== ACCESS_KEY) {
      renderError("Access denied", "请使用正确的活动链接进入。比如：?key=cecp2026");
      removeSpecialBackButton();
      return;
    }

    if (song) {
      await renderSong(song);
    } else {
      removeSpecialBackButton();
      await ensureMusiclib().catch(() => {});
      renderHome();
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  window.addEventListener("popstate", render);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();