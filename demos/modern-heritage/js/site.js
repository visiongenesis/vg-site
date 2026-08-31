// Modern Heritage — shared site behavior
(function () {
  // mobile nav
  var burger = document.querySelector('.hamburger');
  if (burger) burger.addEventListener('click', function () {
    document.querySelector('header.site').classList.toggle('mobile-open');
  });

  // reveal on scroll (with safety fallback so content can never stay hidden)
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
  if (location.search.indexOf('noanim') !== -1 || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    setTimeout(revealAll, 3500);
  }

  // before/after sliders
  document.querySelectorAll('.ba').forEach(function (ba) {
    function setCut(clientX) {
      var r = ba.getBoundingClientRect();
      var pct = Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100));
      ba.style.setProperty('--cut', pct + '%');
    }
    ba.addEventListener('pointerdown', function (ev) {
      ba.setPointerCapture(ev.pointerId);
      setCut(ev.clientX);
      function mv(e) { setCut(e.clientX); }
      function up() { ba.removeEventListener('pointermove', mv); ba.removeEventListener('pointerup', up); }
      ba.addEventListener('pointermove', mv);
      ba.addEventListener('pointerup', up);
    });
  });

  // gallery filters
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    filterBar.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button'); if (!btn) return;
      filterBar.querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      var f = btn.dataset.f;
      document.querySelectorAll('.masonry figure').forEach(function (fig) {
        fig.classList.toggle('hidden', f !== 'all' && fig.dataset.cat.indexOf(f) === -1);
      });
    });
  }

  // lightbox
  document.querySelectorAll('.masonry figure img, .story figure img').forEach(function (img) {
    img.parentElement.addEventListener('click', function () {
      var lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button>';
      var big = document.createElement('img');
      big.src = img.src; big.alt = img.alt;
      lb.appendChild(big);
      lb.addEventListener('click', function () { lb.remove(); });
      document.body.appendChild(lb);
    });
  });

  // estimate form (preview mode — no live submission wired yet)
  document.querySelectorAll('form.estimate').forEach(function (f) {
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = (f.querySelector('[name=name]') || {}).value || '';
      var ok = document.createElement('div');
      ok.className = 'form-ok';
      ok.innerHTML = '<b>Thanks' + (name ? ', ' + name.split(' ')[0] : '') + '.</b> ' +
        'In the live version this request goes straight to Modern Heritage and you hear back within one business day. ' +
        '(Preview build — nothing was sent. Call <a href="tel:8652548529">(865) 254-8529</a> to reach the real crew.)';
      f.replaceWith(ok);
    });
  });
})();
