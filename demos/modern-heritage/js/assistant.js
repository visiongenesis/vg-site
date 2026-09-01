// Ask Modern Heritage — floating assistant, tuned to the Ask My Church widget UX:
// light short header w/ refresh + expand, ghost (plain-text) answers, user bubbles,
// unfurling logo-pill launcher, cached chip answers, inline contact form.
(function () {
  var ENDPOINT = 'https://askmy.business/ask/modern-heritage';
  var CONNECT = 'https://askmy.business/ask/modern-heritage/connect';
  var LOGO = 'img/modern-heritage-logo-gold.png';
  var root = document.getElementById('ask-root');
  if (!root) return;
  var history = [];
  var busy = false;
  var chipCache = null; // data/chip-answers.json — pre-verified answers, instant load
  fetch('data/chip-answers.json?v=4').then(function (r) { return r.json(); })
    .then(function (d) { chipCache = d; }).catch(function () {});

  var CHIPS = [
    'What does cabinet refinishing cost?',
    'Can you match my existing trim?',
    'How long does a room repaint take?',
    'Do you work in Maryville?'
  ];
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var refreshSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>';
  var expandSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';

  root.innerHTML =
    '<button class="ask-fab" id="askFab" aria-label="Ask Modern Heritage">' +
    '  <span class="fab-disc"><img src="' + LOGO + '" alt=""></span>' +
    '  <span class="fab-text">Ask Modern Heritage</span>' +
    '</button>' +
    '<div class="ask-panel" id="askPanel" hidden>' +
    '  <div class="ask-head">' +
    '    <img class="ah-logo" src="' + LOGO + '" alt="Modern Heritage logo">' +
    '    <div class="ah-t"><b>Ask Modern Heritage</b><small>Ask anything · Craftsmanship your home deserves</small></div>' +
    '    <div class="ah-ctrls">' +
    '      <button id="askRefresh" title="Start over" aria-label="Start a new conversation">' + refreshSvg + '</button>' +
    '      <button id="askExpand" title="Expand" aria-label="Expand the assistant">' + expandSvg + '</button>' +
    '      <button id="askClose" aria-label="Close">×</button>' +
    '    </div></div>' +
    '  <div class="ask-scroll" id="askScroll"></div>' +
    '  <div class="ask-chips" id="askChips"></div>' +
    '  <div class="ask-input"><input id="askText" type="text" placeholder="Ask about pricing, timing, our process…" maxlength="600">' +
    '    <button id="askSend" aria-label="Send">➤</button></div>' +
    '  <div class="ask-foot">AI assistant · powered by <a href="https://askmy.business" target="_blank" rel="noopener">Ask My Business</a></div>' +
    '</div>';

  var fab = document.getElementById('askFab');
  var panel = document.getElementById('askPanel');
  var scroll = document.getElementById('askScroll');
  var chipsEl = document.getElementById('askChips');
  var input = document.getElementById('askText');
  var expandBtn = document.getElementById('askExpand');

  // ── ambient unfurl: rest as the logo disc, bounce open every ~11s (askmy.church pattern)
  if (!RM) {
    (function cycleSetup() {
      function cycle() {
        if (!panel.hidden) { setTimeout(cycle, 4000); return; }
        fab.classList.add('open');
        setTimeout(function () { fab.classList.remove('open'); }, 4600);
        setTimeout(cycle, 11500);
      }
      setTimeout(cycle, 2200);
    })();
  } else {
    fab.classList.add('open');
  }

  // ── message rendering: user = bubble, assistant = ghost plain text (church UX)
  function mdLite(t) {
    return t
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\n/g, '<br>');
  }
  function bubble(cls, html) {
    var d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.innerHTML = html;
    scroll.appendChild(d);
    scroll.scrollTop = scroll.scrollHeight;
    return d;
  }
  function botGhost(html) {
    var d = document.createElement('div');
    d.className = 'turn-bot';
    d.innerHTML = '<span class="bot-av"><img src="' + LOGO + '" alt=""></span><div class="bot-body">' + html + '</div>';
    scroll.appendChild(d);
    scroll.scrollTop = scroll.scrollHeight;
    return d.querySelector('.bot-body');
  }

  var WELCOME = 'Hi — I’m the Modern Heritage assistant. Ask me anything about cabinet refinishing, trim and moulding, painting, or decks: what things cost, how long they take, or how to get started.';
  function greet() { botGhost(mdLite(WELCOME)); }

  function renderChips(mode) {
    chipsEl.innerHTML = '';
    if (mode !== 'contact-only') {
      CHIPS.forEach(function (q) {
        var b = document.createElement('button');
        b.textContent = q;
        b.addEventListener('click', function () { send(q); });
        chipsEl.appendChild(b);
      });
    }
    var c = document.createElement('button');
    c.className = 'chip-contact';
    c.textContent = '📋 Leave your details';
    c.addEventListener('click', showContactForm);
    chipsEl.appendChild(c);
  }

  function reset() {
    history = [];
    busy = false;
    scroll.innerHTML = '';
    greet();
    renderChips();
  }

  // ── open/close/dock
  function open() { panel.hidden = false; fab.style.display = 'none'; if (!scroll.children.length) reset(); input.focus(); }
  function close() { undock(); panel.hidden = true; fab.style.display = ''; }
  function dock() { document.documentElement.classList.add('ask-docked'); expandBtn.title = 'Collapse'; expandBtn.setAttribute('aria-label', 'Collapse the assistant'); }
  function undock() { document.documentElement.classList.remove('ask-docked'); expandBtn.title = 'Expand'; expandBtn.setAttribute('aria-label', 'Expand the assistant'); }
  fab.addEventListener('click', open);
  document.getElementById('askClose').addEventListener('click', close);
  document.getElementById('askRefresh').addEventListener('click', reset);
  expandBtn.addEventListener('click', function () {
    document.documentElement.classList.contains('ask-docked') ? undock() : dock();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      document.documentElement.classList.contains('ask-docked') ? undock() : close();
    }
  });
  document.getElementById('askSend').addEventListener('click', function () { send(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(input.value); });

  // ── inline contact form (posts to the engine's lead endpoint)
  function showContactForm() {
    if (document.getElementById('askLeadForm')) { scroll.scrollTop = scroll.scrollHeight; return; }
    var host = botGhost(
      '<b>Leave your details</b> and the Modern Heritage team will follow up about your project.' +
      '<form id="askLeadForm" class="lead-form">' +
      '  <input name="name" placeholder="Your name" required maxlength="80">' +
      '  <input name="phone" placeholder="Phone" maxlength="40">' +
      '  <input name="email" type="email" placeholder="Email (or phone above)" maxlength="160">' +
      '  <textarea name="message" rows="2" placeholder="A sentence about your project (optional)" maxlength="1200"></textarea>' +
      '  <input name="company" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '  <button type="submit">Send to Modern Heritage</button>' +
      '  <span class="lead-err" hidden></span>' +
      '</form>');
    host.querySelector('#askLeadForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target;
      var err = f.querySelector('.lead-err');
      var payload = {
        name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(),
        message: f.message.value.trim(), company: f.company.value, reason: 'contact', src: 'web'
      };
      if (!payload.name || (!payload.phone && !payload.email)) {
        err.hidden = false; err.textContent = 'Please add your name and a phone or email.'; return;
      }
      f.querySelector('button').disabled = true;
      fetch(CONNECT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok && d.ok !== false, d: d }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error((res.d && res.d.error) || 'failed');
          host.innerHTML = '<b>Got it, ' + payload.name.split(' ')[0].replace(/[<>&]/g, '') + '.</b> Your details are saved and the team will follow up. If it\'s time-sensitive, call <a href="tel:8652548529">(865) 254-8529</a> (Mon–Fri, 8–5).';
        })
        .catch(function (e) {
          f.querySelector('button').disabled = false;
          err.hidden = false;
          err.textContent = 'That didn\'t go through — please try again, or call (865) 254-8529.';
        });
    });
  }

  // ── send
  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    input.value = '';
    renderChips('contact-only');
    bubble('user', mdLite(text));
    history.push({ role: 'user', content: text });

    // Cached chip answers: pre-verified, instant (no engine round-trip).
    if (chipCache && chipCache[text]) {
      var cached = chipCache[text];
      botGhost(mdLite(cached));
      history.push({ role: 'assistant', content: cached });
      return;
    }

    busy = true;
    var typing = bubble('turn-bot typing', '<span></span><span></span><span></span>');
    var answer = '';
    var el = null;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-12), stream: true })
    }).then(function (res) {
      if (!res.ok || !res.body) throw new Error('http ' + res.status);
      var ctype = res.headers.get('content-type') || '';
      if (ctype.indexOf('event-stream') === -1) {
        return res.json().then(function (d) {
          answer = d.reply || '';
          if (!answer) throw new Error('empty');
          if (typing) { typing.remove(); typing = null; }
          el = botGhost(mdLite(answer));
          return finish();
        });
      }
      var reader = res.body.getReader();
      var dec = new TextDecoder();
      var buf = '';
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return finish();
          buf += dec.decode(r.value, { stream: true });
          var lines = buf.split('\n');
          buf = lines.pop();
          lines.forEach(function (line) {
            if (line.indexOf('data: ') !== 0) return;
            var ev;
            try { ev = JSON.parse(line.slice(6)); } catch (e) { return; }
            if (ev.t) {
              answer += ev.t;
              if (typing) { typing.remove(); typing = null; }
              if (!el) el = botGhost('');
              el.innerHTML = mdLite(answer);
              scroll.scrollTop = scroll.scrollHeight;
            }
            if (ev.done && ev.retract && ev.retract.answer) {
              answer = ev.retract.answer;
              if (!el) el = botGhost('');
              el.innerHTML = mdLite(answer);
            }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function () {
      if (typing) { typing.remove(); typing = null; }
      botGhost('I couldn’t reach the answer service just now. Please try again in a moment, or call us at <a href="tel:8652548529">(865) 254-8529</a> — a real person will pick up.');
      finish(true);
    });

    function finish(failed) {
      if (typing) { typing.remove(); typing = null; }
      if (!failed && answer) history.push({ role: 'assistant', content: answer });
      busy = false;
    }
  }
})();
