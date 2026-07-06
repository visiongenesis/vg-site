/* ============================================================================
   KEN CHERTOW "ASK COACH" — embeddable loader for kenchertow.com (HubSpot).
   One line in HubSpot's Site Footer HTML loads this file from visiongenesisai.com;
   it injects a floating launcher that opens the ONE canonical AI assistant
   (https://visiongenesisai.com/kc-camps/ask-coach/) in a panel. Same engine as
   every other surface — never fork the assistant (see chertow memory 6/16).
   Source of truth: clients/ken-chertow/embed/embed.js → deployed to
   vg-site gh-pages at /kc-camps/embed.js via embed/deploy-embed.py.
   ============================================================================ */
(function () {
  if (window.__kcAskCoach) return; // double-inject guard (HubSpot can render footer HTML twice)
  window.__kcAskCoach = true;

  var ORIGIN = 'https://visiongenesisai.com';
  var COACH_URL = ORIGIN + '/kc-camps/ask-coach/';

  function init() {
    if (document.getElementById('kcacBtn')) return;

    // Oswald for the button label (skip if the site already loads it)
    if (!document.querySelector('link[href*="family=Oswald"]')) {
      var f = document.createElement('link');
      f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap';
      document.head.appendChild(f);
    }

    var css = document.createElement('style');
    css.textContent =
      '#kcacBtn,#kcacWrap,#kcacWrap *{box-sizing:border-box;margin:0;padding:0;}' +
      /* launcher — bottom-right, above any HubSpot sticky chrome */
      '#kcacBtn{position:fixed;bottom:22px;right:22px;z-index:2147482998;display:flex;align-items:center;gap:10px;' +
        'background:#bf0a30;color:#fff;border:0;cursor:pointer;font-family:Oswald,Arial,sans-serif;text-transform:uppercase;' +
        'letter-spacing:.1em;font-size:14px;font-weight:600;line-height:1;padding:14px 20px 14px 16px;border-radius:999px;' +
        'box-shadow:0 14px 34px -10px rgba(191,10,48,.75);transition:transform .2s,box-shadow .2s;}' +
      '#kcacBtn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 18px 40px -10px rgba(191,10,48,.85);}' +
      '#kcacBtn .kcac-ic{position:relative;display:flex;}' +
      '#kcacBtn .kcac-label{white-space:nowrap;transition:opacity .26s ease;}' +
      '#kcacBtn.kcac-swap .kcac-label{opacity:0;}' +
      '#kcacBtn .kcac-ping{position:absolute;top:-3px;right:-3px;width:9px;height:9px;background:#f2b705;border-radius:50%;' +
        'animation:kcacPing 2.4s ease-in-out infinite;}' +
      '@keyframes kcacPing{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:1;transform:scale(1.25);}}' +
      /* panel */
      '#kcacWrap{position:fixed;bottom:22px;right:22px;z-index:2147482999;' +
        'width:min(392px,calc(100vw - 24px));height:min(640px,calc(100vh - 44px));' +
        'border-radius:16px;overflow:hidden;border:1px solid rgba(242,183,5,.32);' +
        'box-shadow:0 30px 80px rgba(0,0,0,.55);background:#030b1c;' +
        'transform:translateY(12px) scale(.97);opacity:0;pointer-events:none;' +
        'transition:.28s cubic-bezier(.2,.8,.2,1);transform-origin:bottom right;}' +
      '#kcacWrap.kcac-open{transform:none;opacity:1;pointer-events:auto;}' +
      '#kcacWrap iframe{width:100%;height:100%;border:0;display:block;background:#030b1c;}' +
      '#kcacClose{position:absolute;top:9px;right:10px;z-index:2;width:30px;height:30px;border-radius:50%;' +
        'background:rgba(3,11,28,.55);border:1px solid rgba(255,255,255,.22);color:#fff;cursor:pointer;' +
        'display:flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);transition:.15s;}' +
      '#kcacClose:hover{background:rgba(191,10,48,.85);border-color:transparent;}' +
      /* phones: use the whole screen */
      '@media (max-width:520px){#kcacWrap{bottom:0;right:0;width:100vw;height:100dvh;border-radius:0;border:0;}}';
    document.head.appendChild(css);

    var btn = document.createElement('button');
    btn.id = 'kcacBtn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open Ask Coach — Ken Chertow camp assistant');
    btn.innerHTML =
      '<span class="kcac-ic">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>' +
        '<span class="kcac-ping"></span>' +
      '</span><span class="kcac-label">Ask Coach</span>';

    var wrap = document.createElement('div');
    wrap.id = 'kcacWrap';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Ask Coach');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<button id="kcacClose" type="button" aria-label="Close Ask Coach">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<iframe id="kcacFrame" title="Ask Coach — Ken Chertow camp assistant" loading="lazy"></iframe>';

    document.body.appendChild(btn);
    document.body.appendChild(wrap);

    // Rotating label — cycles the pill between "Ask Coach" and a few teasers so
    // a parent's eye catches what it can actually do. Pauses while the chat is
    // open; disabled entirely for reduced-motion users (label stays "Ask Coach").
    var label = btn.querySelector('.kcac-label');
    var PHRASES = [
      'Ask Coach',
      'Ask me anything about camp',
      'Ask Coach',
      'How to get ready for camp',
      'Ask Coach',
      'Transportation details',
      'Ask Coach',
      'Need help registering?'
    ];
    var pIdx = 0, rotTimer = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function rotateLabel() {
      btn.classList.add('kcac-swap');           // fade current text out
      setTimeout(function () {
        pIdx = (pIdx + 1) % PHRASES.length;
        label.textContent = PHRASES[pIdx];
        btn.classList.remove('kcac-swap');       // fade the new text in
      }, 260);
    }
    function startRotation() { if (reduceMotion || rotTimer) return; rotTimer = setInterval(rotateLabel, 3600); }
    function stopRotation() { if (rotTimer) { clearInterval(rotTimer); rotTimer = null; } }

    var frame = wrap.querySelector('#kcacFrame');
    function openCoach() {
      if (!frame.src) frame.src = COACH_URL; // lazy: load the assistant only on first open
      stopRotation();
      btn.classList.remove('kcac-swap');
      label.textContent = 'Ask Coach';
      pIdx = 0;
      wrap.classList.add('kcac-open');
      wrap.setAttribute('aria-hidden', 'false');
      btn.style.display = 'none';
    }
    function closeCoach() {
      wrap.classList.remove('kcac-open');
      wrap.setAttribute('aria-hidden', 'true');
      btn.style.display = 'flex';
      startRotation();
    }
    startRotation();
    btn.addEventListener('click', openCoach);
    wrap.querySelector('#kcacClose').addEventListener('click', closeCoach);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrap.classList.contains('kcac-open')) closeCoach();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
