/* EDIT CAMP DATES HERE. Every [data-camp-date] on the page is filled from this one spot.
   (The same text sits in the HTML as a no-JS fallback.) */
var SG_CAMP_DATES={pa:"July 11\u201322,\u00a02027",oh:"June 19\u201324,\u00a02027"};
(function(){[].forEach.call(document.querySelectorAll('[data-camp-date]'),function(el){var v=SG_CAMP_DATES[el.getAttribute('data-camp-date')];if(v)el.textContent=v;});})();
/* SuperGirl: menu toggle + progressive scroll reveal. Content is fully visible without JS. */
(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    menu.addEventListener('click',function(e){
      if(e.target.closest('a')){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');}
    });
  }
  var els=[].slice.call(document.querySelectorAll('.rv'));
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)||!els.length) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
  },{rootMargin:'0px 0px -6% 0px',threshold:0.01});
  /* Nothing is hidden at load (so screenshots, crawlers and no-JS show everything).
     On the visitor's first scroll, blocks still below the fold are armed to fade up. */
  function arm(){
    var vh=window.innerHeight||document.documentElement.clientHeight;
    els.forEach(function(el){ if(el.getBoundingClientRect().top>vh+40){ el.classList.add('pre'); io.observe(el); } });
  }
  window.addEventListener('scroll',arm,{passive:true,once:true});
})();

/* G110 #3: floating Register shows on desktop only after the first screen (hero) has scrolled away. CSS gates it to >=900px. */
(function(){function go(){var f=document.querySelector('.reg-fab');if(!f)return;var h=document.querySelector('main > section, main section, .hero');
if(!h||!('IntersectionObserver' in window)){f.classList.add('show');return;}
document.documentElement.classList.add('fab-io');
new IntersectionObserver(function(es){es.forEach(function(e){f.classList.toggle('show',!e.isIntersecting);});},{threshold:0}).observe(h);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
