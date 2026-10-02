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
  /* Register codes per location; prices, dates and links come from camp-links.js (KC_REG), never typed here */
  const CAMPS = {
    supergold:{name:'SuperGold', len:'12 days', pa:['sg12'], oh:[], twelve:true},
    sgms:{name:'SuperGold Middle School', len:'12 days', pa:['sk12'], oh:[], twelve:true},
    kids6:{name:'Kids Training Camp, 6-day', len:'6 days', pa:['kt6'], oh:['okt6']},
    kids5:{name:'Kids Training Camp, 5-day', len:'5 days', pa:['kt5'], oh:[], five:true},
    future:{name:'Future Champions', len:'4 days, parent-child', pa:['fc1','fc2'], oh:['ofc']},
    gold6:{name:'High School Gold Medal Training Camp, 6-day', len:'6 days', pa:['hs6'], oh:['ohs6']},
    gold5:{name:'High School Gold Medal Training Camp, 5-day', len:'5 days', pa:['hs5'], oh:[], five:true},
    msgold6:{name:'Middle School Gold Medal Training Camp, 6-day', len:'6 days', pa:['ms6'], oh:['oms6']},
    msgold5:{name:'Middle School Gold Medal Training Camp, 5-day', len:'5 days', pa:['ms5'], oh:[], five:true},
    technique:{name:'Technique Camp', len:'4 days', pa:['tc4'], oh:['otc4']},
    /* girls' camps: same dates and prices, own codes */
    supergirl:{name:'SuperGirl', len:'12 days', pa:['gl12'], oh:[], twelve:true, gender:'girl'},
    sgirlms:{name:'SuperGirl Middle School', len:'12 days', pa:['sgm12'], oh:[], twelve:true, gender:'girl'},
    ggold6:{name:'Girls High School Gold Medal Training Camp, 6-day', len:'6 days', pa:['gg6'], oh:['ogg6'], gender:'girl'},
    ggold5:{name:'Girls High School Gold Medal Training Camp, 5-day', len:'5 days', pa:['gg5'], oh:[], five:true, gender:'girl'},
    gmsgold6:{name:'Girls Middle School Gold Medal Training Camp, 6-day', len:'6 days', pa:['gms6'], oh:['ogms6'], gender:'girl'},
    gmsgold5:{name:'Girls Middle School Gold Medal Training Camp, 5-day', len:'5 days', pa:['gms5'], oh:[], five:true, gender:'girl'},
    gtechnique:{name:'Girls Technique Camp', len:'4 days', pa:['gt4'], oh:['ogt4'], gender:'girl'}
  };
  const GMAP = {supergold:'supergirl', sgms:'sgirlms', gold6:'ggold6', gold5:'ggold5', msgold6:'gmsgold6', msgold5:'gmsgold5', technique:'gtechnique'};
  const NOTES = {
    overlap:"Third and fourth graders can pick either camp. It's your family's call whether your son or daughter wants the longer, more serious camp or the shorter one.",
    rooming:'7th and 8th graders can choose SuperGold Middle School or SuperGold. The difference is mostly who they room with: middle schoolers or teens.',
    roomingG:'7th and 8th graders can choose SuperGirl Middle School or SuperGirl. The difference is mostly who they room with: middle schoolers or teens.',
    ohio12:'The 12-day camps run in Pennsylvania only, July 11–22.'
  };
  function choose(grade, skill, loc, gender){
    const girl = gender === 'girl';
    let ids = [], notes = [];
    if (grade <= 2) ids = ['future'];
    else if (grade <= 4) { ids = skill === 'new' ? ['future'] : ['kids6','kids5']; notes.push('overlap'); }
    else if (grade === 5) { ids = ['kids6','kids5']; }
    else if (grade <= 8) {
      if (skill === 'new') ids = ['technique'];
      else if (skill === 'dev') ids = ['msgold6','msgold5'];
      else { ids = ['sgms']; if (grade >= 7) { ids.push('supergold'); notes.push('rooming'); } }
    }
    else ids = skill === 'new' ? ['technique'] : skill === 'dev' ? ['gold6','gold5'] : ['supergold'];
    if (loc === 'oh') {
      const had12 = ids.some(id => CAMPS[id].twelve);
      ids = ids.filter(id => !CAMPS[id].twelve && !CAMPS[id].five);
      if (!ids.length) ids = [grade <= 8 ? 'msgold6' : 'gold6'];
      notes = notes.filter(n => n !== 'rooming' && n !== 'roomingG');
      if (had12) notes.push('ohio12');
    }
    /* girls in grades 6-12 get the girls' camp named directly (own Register button); grades 1-5 camps are boys and girls together */
    const swap = girl && grade >= 6;
    if (swap) { ids = ids.map(id => GMAP[id] || id); notes = notes.map(n => n === 'rooming' ? 'roomingG' : n); }
    return {ids, notes, girlsLink: swap};
  }
  window.KC_CHOOSE = choose;
  const host = document.querySelector('#camp-finder');
  if (host) {
    host.innerHTML = `<form class="finder fv2" id="finder-form">
      <div class="fields">
        <div class="field"><label for="gender">Wrestler</label><select id="gender" required><option value="">Choose one</option><option value="boy">Boy</option><option value="girl">Girl</option></select></div>
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
      const gender = document.querySelector('#gender').value;
      const r = choose(grade, skill, loc, gender);
      const place = loc === 'oh' ? 'Ohio' : 'Pennsylvania';
      const R = window.KC_REG;
      const items = r.ids.map(id => {
        const c = CAMPS[id];
        const codes = loc === 'oh' ? c.oh : c.pa;
        const rows = codes.map(code => { const d = R.byCode[code]; return `<div class="rs-row"><p class="rs-d"><b>${d.dates}, 2027</b>${d.rn ? ` · resident price covers ${d.rn}` : ''}</p><div class="rs-btns">${R.btn(code,'r')}${R.btn(code,'c')}</div></div>`; }).join('');
        return `<li data-camp="${id}"><div><h3>${c.name}</h3><p class="fr-meta">${c.len} · ${place}</p><div class="regset">${rows}</div></div></li>`;
      }).join('');
      const notes = r.notes.map(n => `<p class="fr-note">${NOTES[n]}</p>`).join('');
      const res = document.querySelector('#finder-result');
      res.innerHTML = `<div class="eyebrow">Camps that fit · ${gender === 'girl' ? 'Girl' : 'Boy'} · Grade ${grade} · ${place}</div><ul class="fr-list">${items}</ul>${notes}${r.girlsLink ? '<p class="fr-girls">Want to see the girls\' program first? <a href="supergirl/">See the SuperGirl site <span aria-hidden="true">→</span></a></p>' : ''}`;
      res.hidden = false; res.focus({preventScroll:true});
      res.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'nearest'});
    });
  }


  /* Camp options: three tabs (Pennsylvania | Ohio | Girls). Without JS all three tables show. */
  document.querySelectorAll('.copts').forEach(box => {
    const list = box.querySelector('[role=tablist]'); if (!list) return;
    const tabs = [...list.querySelectorAll('[role=tab]')];
    const show = (id, focus) => tabs.forEach(tb => { const on = tb.id === id; tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1; document.getElementById(tb.getAttribute('aria-controls')).hidden = !on; if (on && focus) tb.focus(); });
    tabs.forEach((tb, i) => {
      tb.addEventListener('click', () => show(tb.id));
      tb.addEventListener('keydown', e => { const k = {ArrowRight:i+1, ArrowLeft:i-1, Home:0, End:tabs.length-1}[e.key]; if (k === undefined) return; e.preventDefault(); show(tabs[(k + tabs.length) % tabs.length].id, true); });
    });
    list.hidden = false;
    const pick = () => show(location.hash === '#camp-girls' ? 'tab-girls' : location.hash === '#camp-ohio' ? 'tab-oh' : 'tab-pa');
    pick(); addEventListener('hashchange', pick);
  });

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

/* G106 editor pass: keep dates, ranges, "N days", grades and camp names from splitting across lines, including text the picker, table and date filler add later */
(function(){var M='(January|February|March|April|May|June|July|August|September|October|November|December)';
var R=[[new RegExp(M+' (?=\\d)','g'),'$1\u00a0'],[/(\d)\u2013(\d)/g,'$1\u2060\u2013\u2060$2'],[/(\d) (days?|DAYS?|nights?)\b/g,'$1\u00a0$2'],[/(\d)-(day)/g,'$1-\u2060$2'],[/\b(grades?|Grades?|GRADES?) (\d)/g,'$1\u00a0$2'],[/\b(Gold|Middle|High|Future|SuperGold|SuperGirl|Kids) (Medal|School|Champions|Middle|Training)\b/g,'$1\u00a0$2'],[/ (\u2192|\u00b7)/g,'\u00a0$1']];
function fx(root){if(!root)return;var w=document.createTreeWalker(root,4),n;while((n=w.nextNode())){var p=n.parentNode;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))continue;var t=n.nodeValue,u=t;for(var i=0;i<R.length;i++)u=u.replace(R[i][0],R[i][1]);if(u!==t)n.nodeValue=u;}}
function go(){fx(document.body);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(x){if(x.nodeType===1)fx(x);else if(x.nodeType===3&&x.parentNode)fx(x.parentNode);});});}).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();

/* G110 #3: floating Register shows on desktop only after the first screen (hero) has scrolled away. CSS gates it to >=900px. */
(function(){function go(){var f=document.querySelector('.reg-fab');if(!f)return;var h=document.querySelector('main > section, main section, .hero');
if(!h||!('IntersectionObserver' in window)){f.classList.add('show');return;}
document.documentElement.classList.add('fab-io');
new IntersectionObserver(function(es){es.forEach(function(e){f.classList.toggle('show',!e.isIntersecting);});},{threshold:0}).observe(h);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
