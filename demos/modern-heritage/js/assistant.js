// Ask Modern Heritage — floating assistant panel.
// Streams answers from the Ask My Business engine (vg-worker, tenant: modern-heritage).
(function () {
  var ENDPOINT = 'https://askmy.business/ask/modern-heritage';
  var LOGO = 'img/modern-heritage-logo-gold.png';
  var root = document.getElementById('ask-root');
  if (!root) return;
  var history = [];
  var busy = false;

  var CHIPS = [
    'What do you charge to refinish kitchen cabinets?',
    'Do you work in Maryville?',
    'How long does a room repaint take?',
    'Can you match my existing trim?'
  ];

  root.innerHTML =
    '<button class="ask-fab" id="askFab"><span class="dot">M</span> Ask Modern Heritage</button>' +
    '<div class="ask-panel" id="askPanel" hidden>' +
    '  <div class="ask-head"><img src="' + LOGO + '" alt="">' +
    '    <div><b>Ask Modern Heritage</b><small>Answers about our work, pricing &amp; process</small></div>' +
    '    <button id="askClose" aria-label="Close">×</button></div>' +
    '  <div class="ask-scroll" id="askScroll"></div>' +
    '  <div class="ask-chips" id="askChips"></div>' +
    '  <div class="ask-input"><input id="askText" type="text" placeholder="Ask about pricing, timing, our process…" maxlength="600">' +
    '    <button id="askSend" aria-label="Send">➤</button></div>' +
    '  <div class="ask-foot">AI assistant · answers from Modern Heritage’s own information · powered by Ask My Business</div>' +
    '</div>';

  var fab = document.getElementById('askFab');
  var panel = document.getElementById('askPanel');
  var scroll = document.getElementById('askScroll');
  var chipsEl = document.getElementById('askChips');
  var input = document.getElementById('askText');

  function renderChips() {
    chipsEl.innerHTML = '';
    CHIPS.forEach(function (q) {
      var b = document.createElement('button');
      b.textContent = q;
      b.addEventListener('click', function () { send(q); });
      chipsEl.appendChild(b);
    });
  }

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

  function greet() {
    if (scroll.children.length) return;
    bubble('bot', 'Hi — I’m the Modern Heritage assistant. Ask me anything about cabinet refinishing, trim and moulding, painting, or decks: what things cost, how long they take, or how to get started.');
  }

  function open() { panel.hidden = false; fab.style.display = 'none'; greet(); renderChips(); input.focus(); }
  function close() { panel.hidden = true; fab.style.display = ''; }
  fab.addEventListener('click', open);
  document.getElementById('askClose').addEventListener('click', close);
  document.getElementById('askSend').addEventListener('click', function () { send(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(input.value); });

  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    input.value = '';
    chipsEl.innerHTML = '';
    bubble('user', mdLite(text));
    history.push({ role: 'user', content: text });
    var typing = bubble('bot typing', '<span></span><span></span><span></span>');
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
        // Engine answered as one JSON object instead of a stream.
        return res.json().then(function (d) {
          answer = d.reply || '';
          if (!answer) throw new Error('empty');
          if (typing) { typing.remove(); typing = null; }
          el = bubble('bot', mdLite(answer));
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
              if (!el) el = bubble('bot', '');
              el.innerHTML = mdLite(answer);
              scroll.scrollTop = scroll.scrollHeight;
            }
            if (ev.done && ev.retract && ev.retract.answer) {
              answer = ev.retract.answer;
              if (!el) el = bubble('bot', '');
              el.innerHTML = mdLite(answer);
            }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function () {
      if (typing) { typing.remove(); typing = null; }
      bubble('bot', 'I couldn’t reach the answer service just now. Please try again in a moment, or call us at <a href="tel:8652548529">(865) 254-8529</a> — a real person will pick up.');
      finish(true);
    });

    function finish(failed) {
      if (typing) { typing.remove(); typing = null; }
      if (!failed && answer) history.push({ role: 'assistant', content: answer });
      busy = false;
    }
  }
})();
