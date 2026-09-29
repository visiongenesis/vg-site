'use strict';
/* Main site behaviour: menu, camp finder (logic adapted from the Sept 28 demo app.js), progressive reveal. */
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* menu */
  const menu = document.querySelector('.menu'), nav = document.querySelector('#main-nav');
  if (menu && nav) {
    const close = () => { menu.setAttribute('aria-expanded','false'); nav.classList.remove('open'); };
    menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* camp finder */
  const camps = {
    supergold:{name:'SuperGold', len:'12 days'},
    supergirl:{name:'SuperGirl', len:'12 days'},
    gold:{name:'Gold Medal Training Camp', len:'6 days'},
    technique:{name:'Technique Camp', len:'4 days'},
    girlstech:{name:'Girls Technique', len:'4 days'},
    future:{name:'Future Champions', len:'Parent-child camp'}
  };
  const host = document.querySelector('#camp-finder');
  if (host) {
    host.innerHTML = `<form class="finder" id="finder-form">
      <div class="fields">
        <div class="field"><label for="grade">Grade next fall</label><select id="grade" required><option value="">Choose grade</option>${Array.from({length:12},(_,i)=>`<option value="${i+1}">Grade ${i+1}</option>`).join('')}</select></div>
        <div class="field"><label for="readiness">Where are they now?</label><select id="readiness" required><option value="">Choose one</option><option value="new">Newer: building a foundation</option><option value="building">Developing: wants a full week</option><option value="intensive">Committed: ready for 12 days</option></select></div>
        <div class="field"><label for="program">Camp for</label><select id="program"><option value="boys">Boys and youth camps</option><option value="girls">Girls camps (SuperGirl)</option></select></div>
        <div class="field"><label for="venue">Location</label><select id="venue"><option value="either">Pennsylvania or Ohio</option><option value="pa">Pennsylvania</option><option value="oh">Ohio</option></select></div>
      </div>
      <div class="finder-bottom"><p>We'll suggest a starting camp. Ken's team confirms every placement.</p><button class="btn" type="submit">Show my camp <span class="arr" aria-hidden="true">→</span></button></div>
    </form>
    <div id="finder-result" class="finder-result" role="status" tabindex="-1" hidden></div>`;
    document.querySelector('#finder-form').addEventListener('submit', e => {
      e.preventDefault();
      const grade = Number(document.querySelector('#grade').value);
      const r = document.querySelector('#readiness').value;
      const girls = document.querySelector('#program').value === 'girls';
      const venue = document.querySelector('#venue').value;
      let id;
      if (grade <= 3) id = 'future';
      else if (grade <= 7) id = r === 'new' ? (girls ? 'girlstech' : 'technique') : 'gold';
      else id = r === 'intensive' ? (girls ? 'supergirl' : 'supergold') : r === 'new' ? (girls ? 'girlstech' : 'technique') : 'gold';
      const why = grade <= 3 ? 'For the youngest wrestlers, start with a parent alongside.'
        : grade <= 7 ? (r === 'new' ? 'Four days of fundamentals is the right first step.' : 'A full training week suits a younger wrestler who is ready for more.')
        : r === 'intensive' ? 'Twelve days gives a committed wrestler time for skills to stick.'
        : r === 'new' ? 'Four days of fundamentals is the right first step.' : 'A full training week builds on what they already know.';
      const c = camps[id];
      const place = venue === 'pa' ? 'Pennsylvania' : venue === 'oh' ? 'Ohio' : 'Pennsylvania or Ohio';
      const q = new URLSearchParams({camp:id, location:venue, grade:String(grade)});
      if (girls) q.set('program','supergirl');
      const res = document.querySelector('#finder-result');
      res.innerHTML = `<div><div class="eyebrow">Your starting camp · ${place}</div><h3>${c.name}</h3><p>${c.len}. ${why}</p></div><a class="btn" href="register.html?${q}">Register <span class="arr" aria-hidden="true">→</span></a>`;
      res.hidden = false; res.focus({preventScroll:true});
      res.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'nearest'});
    });
  }

  /* keep headings from ending on a lone word */
  document.querySelectorAll('h2,h3,.qtile .display,.t-q2 .display,.kenq blockquote').forEach(h => {
    const w = h.lastChild;
    if (w && w.nodeType === 3) { w.textContent = w.textContent.replace(/ (\S+)\s*$/, ' $1'); }
    else if (w && w.nodeType === 1 && w.lastChild && w.lastChild.nodeType === 3) { w.lastChild.textContent = w.lastChild.textContent.replace(/ (\S+)\s*$/, ' $1'); }
  });

  /* progressive reveal: only below-the-fold items, never for automation or reduced motion */
  if (!reduce && !navigator.webdriver && 'IntersectionObserver' in window) {
    const els = [...document.querySelectorAll('[data-reveal]')].filter(el => el.getBoundingClientRect().top > innerHeight);
    els.forEach(el => el.classList.add('pre'));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); en.target.classList.remove('pre'); io.unobserve(en.target); }
    }), {rootMargin:'0px 0px -8% 0px'});
    els.forEach(el => io.observe(el));
    setTimeout(() => els.forEach(el => { el.classList.add('in'); el.classList.remove('pre'); }), 6000);
  }
})();

/* Camp dates: one edit spot, window.CAMP_DATES in index.html <head> */
(function(){var d=window.CAMP_DATES||{};document.querySelectorAll('[data-dates]').forEach(function(el){var v=d[el.getAttribute('data-dates')];if(v)el.textContent=v;});})();
