/* v4 shared conversion layer — identical across v4-a / v4-b / v4-c.
   Form wiring byte-compatible with production index.html: POST https://formspree.io/f/xykvzzvn
   → Formspree → vg-worker /webhook/audit. Payload shape unchanged. */

/* ---------- Voice Unlock recorder — the conversion event as a working object.
   Lineage: vg-worker prep-template recorder (MediaRecorder, opus 32kbps, waveform, prompts).
   Spec: labs/website-v3/VOICE-UNLOCK-SPEC.md ---------- */
(function(){
  var $=function(id){return document.getElementById(id)};
  var card=$("vu-card");
  if(!card)return;
  var recBtn=$("vu-rec"),recLbl=$("vu-rec-label"),timeEl=$("vu-time"),guideEl=$("vu-guide"),
      wave=$("vu-wave"),micBtn=$("vu-mictest"),pauseBtn=$("vu-pause"),stopBtn=$("vu-stop"),
      takesEl=$("vu-takes"),sendEl=$("vu-send"),emailEl=$("vu-email"),subBtn=$("vu-submit"),
      errEl=$("vu-err"),doneEl=$("vu-done"),promptsEl=$("vu-prompts"),unsupEl=$("vu-unsupported");

  var supported=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
  if(!supported){
    card.hidden=true;
    if(unsupEl)unsupEl.hidden=false;
    return;
  }

  var mr=null,stream=null,chunks=[],takes=[],marks=[],
      elapsed=0,tick=null,raf=null,actx=null,analyser=null,recording=false,paused=false;

  function css(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim()}
  var GOLD=css("--gold")||"#ECB838";
  var WAVE_DIM=css("--vu-wave-dim")||"rgba(236,184,56,.28)";

  function fmt(s){var m=Math.floor(s/60),x=s%60;return (m<10?"0":"")+m+":"+(x<10?"0":"")+x}
  function err(m,html){if(!errEl)return;if(html){errEl.innerHTML=m}else{errEl.textContent=m}errEl.hidden=false}
  function clearErr(){if(errEl)errEl.hidden=true}

  function drawWave(){
    if(!analyser||!wave)return;
    var ctx2=wave.getContext("2d"),W=wave.width,H=wave.height;
    var data=new Uint8Array(analyser.frequencyBinCount);
    function frame(){
      raf=requestAnimationFrame(frame);
      analyser.getByteFrequencyData(data);
      ctx2.clearRect(0,0,W,H);
      var bars=48,step=Math.floor(data.length/bars);
      for(var i=0;i<bars;i++){
        var v=data[i*step]/255,h=Math.max(2,v*H*.92);
        ctx2.fillStyle=(recording&&!paused)?GOLD:WAVE_DIM;
        ctx2.fillRect(i*(W/bars)+1,(H-h)/2,(W/bars)-3,h);
      }
    }
    frame();
  }
  function stopWave(){if(raf){cancelAnimationFrame(raf);raf=null}
    if(wave){var c=wave.getContext("2d");c.clearRect(0,0,wave.width,wave.height)}}

  function attachAnalyser(s){
    try{
      actx=actx||new (window.AudioContext||window.webkitAudioContext)();
      var src=actx.createMediaStreamSource(s);
      analyser=actx.createAnalyser();analyser.fftSize=256;
      src.connect(analyser);drawWave();
    }catch(e){}
  }

  function pickMime(){
    var list=["audio/webm;codecs=opus","audio/webm","audio/mp4","audio/ogg;codecs=opus"];
    for(var i=0;i<list.length;i++){if(MediaRecorder.isTypeSupported(list[i]))return list[i]}
    return "";
  }

  function startTimer(){
    tick=setInterval(function(){
      if(paused)return;
      elapsed++;timeEl.textContent=fmt(elapsed);
      if(elapsed===300){timeEl.classList.add("vu-gold");guideEl.textContent="enough to work with — keep going if you want"}
      if(elapsed===900){guideEl.textContent="plenty — wrap up when ready"}
      if(elapsed>=2100){finishTake()}
    },1000);
  }
  function stopTimer(){if(tick){clearInterval(tick);tick=null}}

  function setRecUI(on){
    recording=on;
    recBtn.classList.toggle("vu-live",on);
    if(recLbl)recLbl.textContent=on?(paused?"Paused":"Recording — tap to finish"):"Tap to record";
    pauseBtn.hidden=!on;stopBtn.hidden=!on;micBtn.hidden=on;
  }

  recBtn.addEventListener("click",function(){
    clearErr();
    if(recording){finishTake();return}
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){
      stream=s;chunks=[];paused=false;
      var mime=pickMime();
      var opts={audioBitsPerSecond:32000};if(mime)opts.mimeType=mime;
      try{mr=new MediaRecorder(s,opts)}catch(e){mr=new MediaRecorder(s)}
      mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
      mr.onstop=function(){
        var blob=new Blob(chunks,{type:mr.mimeType||"audio/webm"});
        if(blob.size>0)addTake(blob,elapsed);
        stream.getTracks().forEach(function(t){t.stop()});stream=null;
        stopWave();stopTimer();setRecUI(false);
        if(takes.length)sendEl.hidden=false;
      };
      mr.start(1000);
      attachAnalyser(s);
      setRecUI(true);startTimer();
      if(guideEl)guideEl.textContent="guide: 5–15 minutes — talk through the prompts";
    }).catch(function(){
      err("Mic didn’t connect. No dead end — the typed version right below works the same.");
      var f=document.getElementById("bu-form");
      if(f)f.scrollIntoView({block:"center",behavior:"smooth"});
    });
  });

  pauseBtn.addEventListener("click",function(){
    if(!mr)return;
    if(paused){mr.resume();paused=false;pauseBtn.textContent="Pause"}
    else{mr.pause();paused=true;pauseBtn.textContent="Resume"}
    if(recLbl)recLbl.textContent=paused?"Paused":"Recording — tap to finish";
  });
  stopBtn.addEventListener("click",function(){finishTake()});

  function finishTake(){if(mr&&mr.state!=="inactive")mr.stop()}

  function addTake(blob,dur){
    takes.push({blob:blob,dur:dur});
    var d=document.createElement("div");d.className="vu-take";
    var n=takes.length;
    d.innerHTML='<span class="vu-take-n">Take '+n+' · '+fmt(dur)+'</span>';
    var au=document.createElement("audio");au.controls=true;au.src=URL.createObjectURL(blob);
    var rm=document.createElement("button");rm.type="button";rm.className="vu-take-rm";rm.textContent="Remove";
    rm.addEventListener("click",function(){
      var i=takes.findIndex(function(t){return t.blob===blob});
      if(i>-1)takes.splice(i,1);
      d.remove();
      if(!takes.length)sendEl.hidden=true;
    });
    d.appendChild(au);d.appendChild(rm);
    takesEl.appendChild(d);
  }

  /* mic test — 5s level check, nothing recorded */
  micBtn.addEventListener("click",function(){
    clearErr();micBtn.disabled=true;var old=micBtn.textContent;micBtn.textContent="Listening… say something";
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){
      attachAnalyser(s);
      var peak=0,data=new Uint8Array(analyser.frequencyBinCount);
      var iv=setInterval(function(){analyser.getByteFrequencyData(data);
        for(var i=0;i<data.length;i++)if(data[i]>peak)peak=data[i]},200);
      setTimeout(function(){
        clearInterval(iv);s.getTracks().forEach(function(t){t.stop()});stopWave();
        micBtn.textContent=peak>40?"Mic OK ✓":"Very quiet — check your mic";
        micBtn.disabled=false;
        setTimeout(function(){micBtn.textContent=old},4000);
      },5000);
    }).catch(function(){micBtn.textContent=old;micBtn.disabled=false;
      err("Mic didn’t connect. The typed version below works the same.")});
  });

  /* prompt rail — tap marks the question; timestamps land in the metadata */
  if(promptsEl)promptsEl.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    b.classList.toggle("hit");
    if(recording&&b.classList.contains("hit"))marks.push((b.textContent||"").trim().slice(0,40)+" @ "+fmt(elapsed));
  });

  /* drag a file in (optional) */
  card.addEventListener("dragover",function(e){e.preventDefault();card.classList.add("vu-drag")});
  card.addEventListener("dragleave",function(){card.classList.remove("vu-drag")});
  card.addEventListener("drop",function(e){
    e.preventDefault();card.classList.remove("vu-drag");
    var f=e.dataTransfer.files&&e.dataTransfer.files[0];
    if(f&&/^audio\//.test(f.type)){addTake(f,0);sendEl.hidden=false}
  });

  /* send → Formspree (same inbox as the form; distinct subject + tier, like the Brief waitlist).
     Audio attach attempted; on rejection falls back to metadata + download-and-email path. */
  function totalDur(){return takes.reduce(function(a,t){return a+(t.dur||0)},0)}
  function basePayload(email){
    var fd=new FormData();
    fd.append("_subject","Bottleneck Unlock — Voice recording");
    fd.append("tier","voice-unlock");
    fd.append("email",email);
    fd.append("takes",String(takes.length));
    fd.append("duration_seconds",String(totalDur()));
    fd.append("prompts_marked",marks.join(" | ")||"none marked");
    fd.append("variant",document.body.getAttribute("data-variant")||"v4");
    return fd;
  }
  subBtn.addEventListener("click",function(){
    clearErr();
    var email=(emailEl.value||"").trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){err("We need a working email to send your unlock plan.");emailEl.focus();return}
    if(!takes.length){err("Record at least one take first — or use the typed version below.");return}
    subBtn.disabled=true;subBtn.textContent="Sending…";
    var withFile=basePayload(email);
    var t=takes[0];
    var ext=(t.blob.type.indexOf("mp4")>-1)?"m4a":(t.blob.type.indexOf("ogg")>-1?"ogg":"webm");
    withFile.append("recording",t.blob,"unlock-recording."+ext);
    fetch("https://formspree.io/f/xykvzzvn",{method:"POST",body:withFile,headers:{Accept:"application/json"}})
      .then(function(r){if(r.ok)return r;
        /* attachment refused — send the metadata, keep the lead */
        return fetch("https://formspree.io/f/xykvzzvn",{method:"POST",body:basePayload(email),headers:{Accept:"application/json"}});
      })
      .then(function(r){
        if(!r.ok)throw 0;
        card.querySelector(".vu-main").hidden=true;
        doneEl.hidden=false;
      })
      .catch(function(){
        subBtn.disabled=false;subBtn.textContent="Send my recording →";
        var url=URL.createObjectURL(takes[0].blob);
        err('That didn’t go through. <a href="'+url+'" download="unlock-recording.'+ext+'">Download your recording</a> and email it to <a href="mailto:vision@visiongenesisai.com?subject=Bottleneck%20Unlock%20%E2%80%94%20Voice%20recording">vision@visiongenesisai.com</a> — a human runs it by hand.',true);
      });
  });
})();

/* ---------- Bottleneck Unlock — wiring unchanged:
   POST https://formspree.io/f/xykvzzvn → Formspree → vg-worker /webhook/audit ---------- */
(function(){
  var FORM_ID="xykvzzvn";
  var QS=[
    {name:"q1_vertical",label:"What kind of business do you run?",hint:"This routes your read to the right pattern.",type:"tag",options:["Service business (trades, field ops)","Hospitality (restaurant, hotel, venue)","Multi-unit operator (franchise, multi-location)","Digital marketing content (creator, agency, media)"],other:true,step:0},
    {name:"q2_team_size",label:"How many people are on your team?",hint:"Including yourself.",type:"tag",options:["Just me","2–5","6–15","16–50","50+"],step:0},
    {name:"q3_growth_blocker",label:"What’s your biggest growth blocker right now?",hint:"Pick up to two.",type:"tag",multi:true,max:2,options:["Not enough customers","Team capacity","Operational chaos","Cost / margin","Tech debt"],other:true,step:1},
    {name:"q4_work_pileup",label:"Where does work pile up the most?",hint:"Select all that apply.",type:"tag",multi:true,options:["Customer comms","Quoting / proposals","Scheduling & dispatch","Invoicing / collections","Reporting & tracking","Onboarding new hires"],other:true,step:1},
    {name:"q7_workflow_fix",label:"What’s the one workflow you’d most want to fix in the next 90 days?",hint:"One sentence is plenty — it’s the heart of the read.",type:"text",placeholder:"e.g. Our quoting process takes 3 days and we’re losing jobs to faster competitors…",step:2},
    {name:"_contact",label:"Where should we send your read?",hint:"Human-reviewed within 24–48 hours. No automated pitch.",type:"contact",step:2}
  ];
  /* field names the pipeline knows but v3 doesn’t ask — sent empty so the payload shape is unchanged */
  var SILENT=["q5_broken_ops","q6_ai_experience","q8_priorities","q9_success"];
  var STEP_NAMES=["Your business","Where it bleeds","The one workflow"];
  var DONE_LINKS={
    "Service business (trades, field ops)":{href:"/results/",label:"While you wait: the Voice-to-Quote case study →"},
    "Digital marketing content (creator, agency, media)":{href:"/ryan-prime/",label:"While you wait: see Ryan Prime in action →"}
  };
  var state={},cur=0;
  var stepsEl=document.getElementById("bu-steps"),
      nextBtn=document.getElementById("bu-next"),
      backBtn=document.getElementById("bu-back"),
      errEl=document.getElementById("bu-err"),
      barEl=document.getElementById("bu-bar"),
      labEl=document.getElementById("bu-step-label"),
      formEl=document.getElementById("bu-form"),
      doneEl=document.getElementById("bu-done"),
      doneP=document.getElementById("bu-done-p"),
      doneLink=document.getElementById("bu-done-link");

  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}

  function render(){
    var html="";
    QS.forEach(function(q,qi){
      html+='<div class="qq" data-q="'+qi+'">';
      if(q.type==="tag"){
        html+='<span class="qlabel" id="lq'+qi+'">'+esc(q.label)+'</span>';
        if(q.hint)html+='<p class="hint">'+esc(q.hint)+'</p>';
        html+='<div class="chips" role="group" aria-labelledby="lq'+qi+'">';
        q.options.forEach(function(o){
          html+='<button type="button" class="chip" data-q="'+qi+'" data-v="'+esc(o)+'" aria-pressed="false">'+esc(o)+'</button>';
        });
        if(q.other)html+='<button type="button" class="chip" data-q="'+qi+'" data-v="__other__" aria-pressed="false">Something else</button>';
        html+='</div>';
        if(q.other)html+='<input class="otherbox" type="text" id="ob'+qi+'" placeholder="Tell us…" aria-label="Something else — tell us">';
      }else if(q.type==="text"){
        html+='<label for="tx'+qi+'">'+esc(q.label)+'</label>';
        if(q.hint)html+='<p class="hint">'+esc(q.hint)+'</p>';
        html+='<textarea id="tx'+qi+'" data-q="'+qi+'" placeholder="'+esc(q.placeholder||"")+'"></textarea>';
      }else{
        html+='<span class="qlabel">'+esc(q.label)+'</span>';
        if(q.hint)html+='<p class="hint">'+esc(q.hint)+'</p>';
        html+='<input type="text" id="bu-name" placeholder="Your name" autocomplete="name" aria-label="Your name">';
        html+='<input type="email" id="bu-email" placeholder="you@yourbusiness.com" autocomplete="email" required aria-label="Email">';
      }
      html+='</div>';
    });
    stepsEl.innerHTML=html;
  }

  function showStep(){
    Array.prototype.forEach.call(stepsEl.children,function(d){
      d.hidden=QS[+d.getAttribute("data-q")].step!==cur;
    });
    labEl.innerHTML="Step "+(cur+1)+" of 3 &mdash; "+STEP_NAMES[cur];
    barEl.style.width=(33*(cur+1))+"%";
    backBtn.hidden=cur===0;
    nextBtn.innerHTML=cur===2?"Send it &rarr;":"Continue &rarr;";
    errEl.classList.remove("show");
  }

  stepsEl.addEventListener("click",function(e){
    var b=e.target.closest(".chip");if(!b)return;
    var qi=+b.getAttribute("data-q"),q=QS[qi],v=b.getAttribute("data-v");
    var sel=state[q.name]||[];
    var idx=sel.indexOf(v);
    if(q.multi){
      if(idx>-1)sel.splice(idx,1);
      else{if(q.max&&sel.length>=q.max)return;sel.push(v)}
    }else{sel=idx>-1?[]:[v]}
    state[q.name]=sel;
    var chips=stepsEl.querySelectorAll('.chip[data-q="'+qi+'"]');
    Array.prototype.forEach.call(chips,function(c){
      c.setAttribute("aria-pressed",sel.indexOf(c.getAttribute("data-v"))>-1?"true":"false");
    });
    var ob=document.getElementById("ob"+qi);
    if(ob){var show=sel.indexOf("__other__")>-1;ob.classList.toggle("show",show);if(show)ob.focus()}
  });

  function err(m){errEl.textContent=m;errEl.classList.add("show")}

  function valOf(q,qi){
    var sel=(state[q.name]||[]).slice();
    var ob=document.getElementById("ob"+qi);
    var s=sel.join(", ");
    if(ob){
      var t=ob.value.trim();
      s=t?s.replace("__other__","Other: "+t):s.replace(", __other__","").replace("__other__, ","").replace("__other__","");
    }
    return s;
  }

  nextBtn.addEventListener("click",function(){
    errEl.classList.remove("show");
    if(cur===0&&!(state.q1_vertical||[]).length)return err("Pick the kind of business you run — it routes your read.");
    if(cur<2){cur++;showStep();return}
    var email=(document.getElementById("bu-email").value||"").trim();
    var txEl=stepsEl.querySelector("textarea");
    var q7=txEl?txEl.value.trim():"";
    if(!q7)return err("Tell us the one workflow — it’s the heart of the read.");
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return err("We need a working email to send the diagnostic.");
    if(formEl.querySelector("input[name=_gotcha]").value)return;
    nextBtn.disabled=true;nextBtn.innerHTML="Sending…";
    var fd=new FormData();
    fd.append("_subject","Bottleneck Unlock — Full Diagnostic");
    QS.forEach(function(q,qi){
      if(q.type==="contact")return;
      if(q.type==="text"){fd.append(q.name,q7);return}
      fd.append(q.name,valOf(q,qi));
    });
    SILENT.forEach(function(n){fd.append(n,"")});
    fd.append("tier","full");
    fd.append("name",(document.getElementById("bu-name").value||"").trim());
    fd.append("email",email);
    fetch("https://formspree.io/f/"+FORM_ID,{method:"POST",body:fd,headers:{Accept:"application/json"}})
      .then(function(r){
        if(r.ok){
          var vert=(state.q1_vertical||[])[0]||"";
          var link=DONE_LINKS[vert];
          if(link){doneLink.href=link.href;doneLink.textContent=link.label}
          formEl.hidden=true;doneEl.hidden=false;doneEl.scrollIntoView({block:"center"});
        }
        else throw 0;
      })
      .catch(function(){
        nextBtn.disabled=false;nextBtn.innerHTML="Send it →";
        err("That didn’t go through. Email us directly — vision@visiongenesisai.com — and we’ll run it by hand.");
      });
  });

  backBtn.addEventListener("click",function(){if(cur>0){cur--;showStep()}});

  render();showStep();
})();

/* ---------- Intelligence Brief waitlist — same Formspree inbox ---------- */
(function(){
  var f=document.getElementById("brief-form"),
      em=document.getElementById("brief-email"),
      ok=document.getElementById("brief-ok");
  if(!f)return;
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var v=(em.value||"").trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){em.focus();return}
    var fd=new FormData();
    fd.append("_subject","Intelligence Brief — waitlist signup");
    fd.append("email",v);
    fd.append("tier","brief-waitlist");
    var btn=f.querySelector("button");btn.disabled=true;
    fetch("https://formspree.io/f/xykvzzvn",{method:"POST",body:fd,headers:{Accept:"application/json"}})
      .then(function(r){if(r.ok){f.hidden=true;ok.classList.add("show")}else throw 0})
      .catch(function(){btn.disabled=false});
  });
})();

/* ---------- motion ---------- */
(function(){
  requestAnimationFrame(function(){requestAnimationFrame(function(){document.body.classList.add("go")})});
  if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("on");io.unobserve(en.target)}});
    },{rootMargin:"-60px"});
    document.querySelectorAll(".fx").forEach(function(el){io.observe(el)});
  }else{
    document.querySelectorAll(".fx").forEach(function(el){el.classList.add("on")});
  }
})();
