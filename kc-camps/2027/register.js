'use strict';
/* Registration preview. Behaviour kept from the Sept 28 demo checkout (app.js "checkout" branch); prices from the 2027 candidate card.
   Accepts ?camp=<id> (or ?program=superkid), ?program=supergirl, ?location=pa|oh, ?grade=1-12. Nothing is submitted anywhere. */
(function(){
  const params = new URLSearchParams(location.search);
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const camps = {
    supergold:{name:'SuperGold',days:'12 days · July 11–22',commuter:1900,resident:2150,photo:'camp-supergold.jpg',min:7,max:12},
    superkid:{name:'SuperKid',days:'12 days · July 11–22 · entering grades 5–8',commuter:1900,resident:2150,photo:'r2-camp-superkid.jpg',min:5,max:8},
    supergirl:{name:'SuperGirl',days:'12 days · July 11–22',commuter:1900,resident:2150,photo:'camp-girls.jpg',min:4,max:12},
    gold:{name:'Gold Medal Training Camp, 6-day',days:'6 days · July 11–16 (Ohio June 19–24)',commuter:950,resident:1050,photo:'camp-gold.jpg',min:6,max:12},
    msgold:{name:'Middle School Gold Medal Training Camp, 6-day',days:'6 days · July 11–16 (Ohio June 19–24) · entering grades 6–8',commuter:950,resident:1050,photo:'camp-future.jpg',min:6,max:8},
    msgold5:{name:'Middle School Gold Medal Training Camp, 5-day',days:'5 days · Pennsylvania, July 18–22 · entering grades 6–8',commuter:850,resident:950,photo:'camp-future.jpg',min:6,max:8},
    kids:{name:'Kids Training Camp, 6-day',days:'6 days · July 11–16 (Ohio June 19–24) · entering grades 3–5 · resident price covers camper + parent',commuter:950,resident:1800,photo:'r2-staff-moment.jpg',min:3,max:5},
    kids5:{name:'Kids Training Camp, 5-day',days:'5 days · Pennsylvania, July 18–22 · entering grades 3–5 · resident price covers camper + parent',commuter:850,resident:1550,photo:'r2-staff-moment.jpg',min:3,max:5},
    fiveday:{name:'Gold Medal Training Camp, 5-day',days:'5 days · Pennsylvania, July 18–22',commuter:850,resident:950,photo:'r2-life-coach.jpg',min:6,max:12},
    technique:{name:'Technique Camp',days:'4 days · July 11–14 (Ohio June 19–22)',commuter:700,resident:775,photo:'camp-technique.jpg',min:6,max:12},
    girlstech:{name:'Girls Technique Camp',days:'4 days · July 11–14 (Ohio June 19–22)',commuter:700,resident:775,photo:'camp-girls.jpg',min:6,max:12},
    future:{name:'Future Champions',days:'4 days, parent-child · July 11–14 or July 18–21 (Ohio June 19–22) · entering grades 1–4',commuter:650,resident:1075,photo:'r4-future-champs-tieup.jpg',min:1,max:4}
  };
  const girls = params.get('program') === 'supergirl' || params.get('site') === 'girls';
  let id = Object.hasOwn(camps, params.get('camp')) ? params.get('camp') : (girls ? 'supergirl' : Object.hasOwn(camps, params.get('program')) ? params.get('program') : 'supergold');
  if (girls && ['supergold','technique'].includes(id)) id = id === 'supergold' ? 'supergirl' : 'girlstech';
  const camp = Object.assign({}, camps[id]);
  if (girls && ['gold','fiveday','msgold','msgold5'].includes(id)) camp.name = 'Girls ' + camp.name;

  if (girls) {
    document.body.classList.add('sg');
    document.querySelector('#brand-name').textContent = 'SUPERGIRL';
    document.querySelector('#brand-sub').textContent = 'A KEN CHERTOW GOLD MEDAL TRAINING CAMP';
    document.querySelector('#home-link').href = 'supergirl/';
    document.querySelector('#back-link').href = 'supergirl/';
    document.querySelector('#back-link').textContent = '← Back to SuperGirl';
    document.querySelector('#reg-kicker').textContent = 'Register · SuperGirl';
  }

  const placeName = v => ({pa:'Pennsylvania', oh:'Ohio'}[v] || 'Choose a location');
  const img = document.querySelector('#summary-image');
  img.src = 'assets/img/' + camp.photo;
  document.querySelector('#summary-name').textContent = camp.name;
  const venueSel = document.querySelector('#checkout-venue');
  venueSel.value = ['pa','oh'].includes(params.get('location')) ? params.get('location') : '';
  const details = () => { document.querySelector('#summary-details').textContent = `${camp.days} · ${placeName(venueSel.value)}`; };
  details(); venueSel.addEventListener('change', details);

  const g = Number(params.get('grade'));
  document.querySelector('#camper-grade').value = String(Number.isInteger(g) && g >= 1 && g <= 12 ? g : id === 'future' ? 2 : id === 'superkid' ? 5 : 9);

  const form = document.querySelector('#registration-form');
  let total = camp.resident, due = total;
  function update(){
    const housing = form.elements.housing.value, plan = form.elements.plan.value;
    total = camp[housing]; due = plan === 'split' ? total / 2 : total;
    document.querySelector('#summary-total').textContent = money(total);
    document.querySelector('#summary-due').textContent = money(due);
    document.querySelector('#summary-later').textContent = money(total - due);
    document.querySelector('#summary-plan').textContent = plan === 'split' ? 'The second half is charged automatically later. Date to be set with 2027 registration.' : 'Paid in full. Nothing due later.';
  }
  form.addEventListener('change', update); update();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const grade = Number(document.querySelector('#camper-grade').value);
    const note = document.querySelector('#fit-note');
    if (grade < camp.min || grade > camp.max) {
      note.textContent = `${camp.name} is set up for grades ${camp.min} to ${camp.max} in this preview. Go back to Find your camp for a better fit. Ken's team confirms every placement.`;
      note.hidden = false; return;
    }
    note.hidden = true;
    document.querySelector('#checkout-content').hidden = true;
    const ok = document.querySelector('#confirmation'); ok.hidden = false;
    document.querySelector('#confirmation-camp').textContent = `${camp.name} · ${camp.days}`;
    document.querySelector('#confirmation-amount').textContent = `${money(due)} today in this preview; ${money(total - due)} later.`;
    document.querySelector('#emergency-name').value = form.elements.guardian.value;
    document.querySelector('#emergency-phone').value = form.elements.phone.value;
    document.querySelector('#same-contact').checked = true;
    ok.focus(); window.scrollTo({top:0, behavior:'instant'});
  });
  document.querySelector('#same-contact').addEventListener('change', e => {
    document.querySelector('#emergency-name').value = e.target.checked ? form.elements.guardian.value : '';
    document.querySelector('#emergency-phone').value = e.target.checked ? form.elements.phone.value : '';
    document.querySelectorAll('#emergency-fields input').forEach(i => { i.readOnly = e.target.checked; });
  });
  document.querySelector('#post-payment-form').addEventListener('submit', e => { e.preventDefault(); document.querySelector('#draft-notice').hidden = false; });
  document.querySelector('#restart').addEventListener('click', () => {
    document.querySelector('#confirmation').hidden = true;
    document.querySelector('#checkout-content').hidden = false;
    document.querySelector('.checkout-title').focus();
  });
})();
