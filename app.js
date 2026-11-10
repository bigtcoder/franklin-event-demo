(function(){
  var SB_URL='https://favlmzawjyhhgnsbuwld.supabase.co/rest/v1/franklin_demo_registrations';
  var SB_KEY='sb_publishable_aloB5avvX57YFVyEv6JP_g_BW4Iu_gt';
  var f=document.getElementById('regForm'),err=document.getElementById('formErr'),btn=document.getElementById('submitBtn'),ok=document.getElementById('success');
  var sticky=document.getElementById('stickyCta'),reg=document.getElementById('register');
  var heroCta=document.querySelector('.hero .btn-main'),vis={};
  sticky.classList.add('hide');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target===reg?'r':'h']=e.isIntersecting});sticky.classList.toggle('hide',!!(vis.r||vis.h))},{threshold:0});io.observe(reg);if(heroCta)io.observe(heroCta)}
  function v(n){var el=f.elements[n];return el?(el.value||'').trim():''}
  function bad(el,on){if(el)el.classList.toggle('bad',on)}
  function show(m,el){err.textContent=m;err.hidden=false;if(el&&el.focus){el.focus()}else err.scrollIntoView({block:'center'})}
  f.addEventListener('input',function(e){bad(e.target,false);if(e.target.name==='division')bad(f.querySelector('.seg'),false);err.hidden=true});
  f.addEventListener('submit',function(e){
    e.preventDefault();err.hidden=true;
    var p1=f.elements.player1_name,p2=f.elements.player2_name,ph=f.elements.phone;
    if(v('player1_name').length<2){bad(p1,true);return show('Please enter player 1\'s name.',p1)}
    if(v('player2_name').length<2){bad(p2,true);return show('Please enter player 2\'s name.',p2)}
    var div=f.querySelector('input[name=division]:checked');
    if(!div){bad(f.querySelector('.seg'),true);return show('Please pick a division.')}
    var digits=v('phone').replace(/[^\d]/g,'');
    if(digits.length<9||digits.length>15){bad(ph,true);return show('Please enter a phone / Zalo number we can reach.',ph)}
    var em=v('email');
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){bad(f.elements.email,true);return show('That email doesn\'t look right (or leave it blank).',f.elements.email)}
    if(!f.elements.consent.checked){return show('Please tick the box to agree to be contacted.',f.elements.consent)}
    var g=f.querySelector('input[name=franklin_gear]:checked');
    var row={player1_name:v('player1_name'),player2_name:v('player2_name'),phone:v('phone').slice(0,20),email:em||null,division:div.value,
      p1_system:v('p1_system'),p1_rating:v('p1_rating')||null,p2_system:v('p2_system'),p2_rating:v('p2_rating')||null,
      franklin_gear:!!(g&&g.value==='yes'),notes:v('notes')||null,consent:true,user_agent:(navigator.userAgent||'').slice(0,300)};
    btn.disabled=true;btn.textContent='Sending…';
    fetch(SB_URL,{method:'POST',headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(row)})
    .then(function(r){if(!r.ok)throw new Error(r.status);
      document.getElementById('sName').textContent=row.player1_name+' & '+row.player2_name;
      document.getElementById('sPhone').textContent=row.phone;
      f.hidden=true;ok.hidden=false;ok.focus();ok.scrollIntoView({block:'start'});
    }).catch(function(){show('Couldn\'t send right now. Please try again, or message us on Zalo.')})
    .finally(function(){btn.disabled=false;btn.textContent='Send registration'});
  });
  document.getElementById('again').addEventListener('click',function(){f.reset();ok.hidden=true;f.hidden=false;f.elements.player1_name.focus()});
})();
