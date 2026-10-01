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

  /* camp chooser (G81, spec 10/1): grade entering fall 2027 + skill level + location -> every matching camp */
  const CAMPS = {
    supergold:{name:'SuperGold', len:'12 days', pa:'July 11–22', oh:'', res:2150, com:1900, reg:'supergold', twelve:true},
    superkid:{name:'SuperKid', len:'12 days', pa:'July 11–22', oh:'', res:2150, com:1900, reg:'superkid', twelve:true},
    kids6:{name:'Kids Training Camp, 6-day', len:'6 days', pa:'July 11–16', oh:'June 19–24', res:1800, com:950, rn:'camper + parent', reg:'kids'},
    kids5:{name:'Kids Training Camp, 5-day', len:'5 days', pa:'July 18–22', oh:'', res:1550, com:850, rn:'camper + parent', reg:'kids5', five:true},
    future:{name:'Future Champions', len:'4 days, parent-child', pa:'July 11–14 or July 18–21', oh:'June 19–22', res:1075, com:650, rn:'parent + child room', reg:'future'},
    gold6:{name:'Gold Medal Training Camp, 6-day', len:'6 days', pa:'July 11–16', oh:'June 19–24', res:1050, com:950, reg:'gold'},
    gold5:{name:'Gold Medal Training Camp, 5-day', len:'5 days', pa:'July 18–22', oh:'', res:950, com:850, reg:'fiveday', five:true},
    msgold6:{name:'Middle School Gold Medal Training Camp, 6-day', len:'6 days', pa:'July 11–16', oh:'June 19–24', res:1050, com:950, reg:'msgold'},
    msgold5:{name:'Middle School Gold Medal Training Camp, 5-day', len:'5 days', pa:'July 18–22', oh:'', res:950, com:850, reg:'msgold5', five:true},
    technique:{name:'Technique Camp', len:'4 days', pa:'July 11–14', oh:'June 19–22', res:775, com:700, reg:'technique'}
  };
  const NOTES = {
    overlap:"Third and fourth graders can pick either camp. It's your family's call whether your son or daughter wants the longer, more serious camp or the shorter one.",
    parent:'Campers entering a grade below 6th need a parent staying with them to be a resident camper.',
    rooming:'7th and 8th graders can choose SuperKid or SuperGold. The difference is mostly who they room with: middle schoolers or teens.',
    ohio12:'The 12-day camps run in Pennsylvania only, July 11–22.'
  };
  const GIRLS = {
    sg12:"Girls: SuperGirl is the 12-day girls' camp.",
    same:"Girls: the same camp runs as a girls' camp.",
    coed:'Girls: this camp is for boys and girls together.'
  };
  function choose(grade, skill, loc){
    let ids = [], notes = [];
    if (grade <= 2) ids = ['future'];
    else if (grade <= 4) { ids = skill === 'new' ? ['future'] : ['kids6','kids5']; notes.push('overlap'); }
    else if (grade === 5) { ids = ['kids6','kids5']; if (skill === 'serious') { ids.push('superkid'); notes.push('parent'); } }
    else if (grade <= 8) {
      if (skill === 'new') ids = ['technique'];
      else if (skill === 'dev') ids = ['msgold6','msgold5'];
      else { ids = ['superkid']; if (grade >= 7) { ids.push('supergold'); notes.push('rooming'); } }
    }
    else ids = skill === 'new' ? ['technique'] : skill === 'dev' ? ['gold6','gold5'] : ['supergold'];
    if (loc === 'oh') {
      const had12 = ids.some(id => CAMPS[id].twelve);
      ids = ids.filter(id => !CAMPS[id].twelve && !CAMPS[id].five);
      if (!ids.length) ids = [grade <= 8 ? 'msgold6' : 'gold6'];
      notes = notes.filter(n => n !== 'rooming' && n !== 'parent');
      if (had12) notes.push('ohio12');
    }
    const girls = ids.some(id => CAMPS[id].twelve) ? 'sg12' : ids.some(id => /gold|technique/.test(id)) ? 'same' : 'coed';
    return {ids, notes, girls};
  }
  window.KC_CHOOSE = choose;
  const money = n => '$' + n.toLocaleString('en-US');
  const host = document.querySelector('#camp-finder');
  if (host) {
    host.innerHTML = `<form class="finder fv2" id="finder-form">
      <div class="fields">
        <div class="field"><label for="grade">Grade in fall 2027</label><select id="grade" required><option value="">Choose grade</option>${Array.from({length:12},(_,i)=>`<option value="${i+1}">Grade ${i+1}</option>`).join('')}</select></div>
        <div class="field"><label for="skill">Skill level</label><select id="skill" required><option value="">Choose one</option><option value="new">Newer to wrestling</option><option value="dev">Developing</option><option value="serious">Serious competitor</option></select></div>
        <div class="field"><label for="venue">Location</label><select id="venue" required><option value="">Choose one</option><option value="pa">Pennsylvania</option><option value="oh">Ohio</option></select></div>
      </div>
      <div class="finder-bottom"><p>We'll show every camp that fits. Ken's team confirms every placement.</p><button class="btn" type="submit">Show my camps <span class="arr" aria-hidden="true">→</span></button></div>
    </form>
    <div id="finder-result" class="finder-result fr-v2" role="status" tabindex="-1" hidden></div>`;
    document.querySelector('#finder-form').addEventListener('submit', e => {
      e.preventDefault();
      const grade = Number(document.querySelector('#grade').value);
      const skill = document.querySelector('#skill').value;
      const loc = document.querySelector('#venue').value;
      const r = choose(grade, skill, loc);
      const place = loc === 'oh' ? 'Ohio' : 'Pennsylvania';
      const items = r.ids.map(id => {
        const c = CAMPS[id];
        const q = new URLSearchParams({camp:c.reg, location:loc, grade:String(grade)});
        return `<li data-camp="${id}"><div><h3>${c.name}</h3><p class="fr-meta">${c.len} · ${loc === 'oh' ? c.oh : c.pa}, 2027</p><p class="fr-price">Resident ${money(c.res)}${c.rn ? ` (${c.rn})` : ''} · Commuter ${money(c.com)}</p></div><a class="btn" href="register.html?${q}">Register <span class="arr" aria-hidden="true">→</span></a></li>`;
      }).join('');
      const notes = r.notes.map(n => `<p class="fr-note">${NOTES[n]}</p>`).join('');
      const res = document.querySelector('#finder-result');
      res.innerHTML = `<div class="eyebrow">Camps that fit · Grade ${grade} · ${place}</div><ul class="fr-list">${items}</ul>${notes}<p class="fr-girls">${GIRLS[r.girls]} <a href="supergirl/">Visit SuperGirl <span aria-hidden="true">→</span></a></p>`;
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
