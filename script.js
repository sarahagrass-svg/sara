document.querySelectorAll('.row').forEach((r,k)=>{let n=k?4:0;[...r.dataset.t].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.style.setProperty('--i',n+i);s.textContent=c;r.appendChild(s)})});
const g=document.getElementById('glow'),rig=document.getElementById('rig'),st=document.getElementById('stage');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!calm)addEventListener('pointermove',e=>{
  g.style.setProperty('--mx',e.clientX+'px');g.style.setProperty('--my',e.clientY+'px');
  const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  rig.style.transform='rotateY('+x*14+'deg) rotateX('+-y*10+'deg)';
});

const ro=new ResizeObserver(es=>es.forEach(e=>{const d=e.target.querySelector('.dev');if(d)d.style.setProperty('--w',Math.min(e.contentRect.width,230)+'px')}));
document.querySelectorAll('.shot').forEach(s=>ro.observe(s));
if(!calm){
  document.querySelectorAll('.shot').forEach(s=>{const d=s.querySelector('.dev');
    s.addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();d.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*34);d.style.setProperty('--py',-((e.clientY-r.top)/r.height-.5)*22)});
    s.addEventListener('pointerleave',()=>{d.style.setProperty('--px',0);d.style.setProperty('--py',0)})});
  if(matchMedia('(min-width:861px)').matches){const shots=[...document.querySelectorAll('.shots')];let t=0;
    const run=()=>{t=0;shots.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
      const p=(innerHeight/2-(r.top+r.height/2))/innerHeight;
      s.querySelectorAll('.shot').forEach(e=>{e.style.transform='translateY('+(p*e.dataset.sp)+'px)';e.querySelector('.dev').style.setProperty('--sy',p*-22)})})};
    addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(run)},{passive:true});run();}
}

const cses=[...document.querySelectorAll('.cs')];
const sync=()=>{const id=location.hash.slice(1);let any=false;cses.forEach(c=>{const o=c.id===id;c.classList.toggle('open',o);if(o){any=true;c.scrollTop=0}});document.body.style.overflow=any?'hidden':''};
addEventListener('hashchange',sync);sync();
addEventListener('keydown',e=>{if(e.key==='Escape'&&location.hash)location.hash='work'});

let lx=innerWidth*.7,ly=innerHeight*.35,gt=0;
const glow=()=>{gt=0;const el=document.elementFromPoint(lx,ly),pr=el&&el.closest('.proj');
  if(pr&&pr.classList.contains('waddi'))g.style.setProperty('--gc','rgba(240,196,60,.2)');else g.style.removeProperty('--gc')};
const ask=()=>{if(!gt)gt=requestAnimationFrame(glow)};
addEventListener('pointermove',e=>{lx=e.clientX;ly=e.clientY;ask()});addEventListener('scroll',ask,{passive:true});ask();

if(!calm){
  const spl=el=>{const t=el.textContent.trim();el.setAttribute('aria-label',t);el.innerHTML=t.split(/\s+/).map((w,i)=>'<span class="w" aria-hidden="true"><span class="wi" style="--i:'+i+'">'+w+'</span></span>').join(' ');el.dataset.io=1};
  document.querySelectorAll('.sec>h2,.work>h2,.proj h3').forEach(spl);
  [['.ab>*',4],['.pr li',6],['.ct .mail,.ct .cta',3],['.proj .tag,.proj .desc,.proj .cta',3]].forEach(([s,m])=>document.querySelectorAll(s).forEach((e,i)=>{e.dataset.r=1;e.style.setProperty('--d',(i%m)+1)}));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.18,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('[data-r],[data-io]').forEach(e=>io.observe(e));
}
const bar=document.getElementById('bar'),htx=document.querySelector('.hero>div'),stg=document.getElementById('stage');let sp=0;
const sc=()=>{sp=0;const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?Math.min(1,y/m):0)+')';
  if(!calm&&y<innerHeight*1.2){htx.style.transform='translateY('+(y*-.12)+'px)';htx.style.opacity=Math.max(0,1-y/(innerHeight*.75));stg.style.transform='translateY('+(y*.1)+'px)'}};
addEventListener('scroll',()=>{if(!sp)sp=requestAnimationFrame(sc)},{passive:true});sc();
const hb=()=>{bar.style.opacity=document.body.style.overflow==='hidden'?0:1};addEventListener('hashchange',hb);hb();

if(!calm){
  const bar=document.getElementById('bar'),hero=document.querySelector('.hero');let st=0;
  const tick=()=>{st=0;const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?y/m:0)+')';
    if(y<innerHeight*1.1){hero.style.transform='translateY('+y*.16+'px)';hero.style.opacity=Math.max(0,1-y/(innerHeight*.85))}};
  addEventListener('scroll',()=>{if(!st)st=requestAnimationFrame(tick)},{passive:true});tick();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.sec>h2,.work>h2,.ab>*,.pr li,.mail,.ct .cta,.proj .txt>*,.shots').forEach(el=>{
    const sib=[...el.parentElement.children].indexOf(el);el.style.setProperty('--d',sib);
    if(!el.classList.contains('shots'))el.classList.add('rv');io.observe(el)});
}

/* Loader */
(()=>{const L=document.getElementById('loader'),R=document.documentElement,t0=performance.now();let done=0;
const go=()=>{if(done)return;done=1;L.classList.add('out');R.classList.remove('loading');setTimeout(()=>L.remove(),1100)};
if(matchMedia('(prefers-reduced-motion:reduce)').matches){L.remove();R.classList.remove('loading');return}
const ready=Promise.all([document.fonts?document.fonts.ready:0,new Promise(r=>document.readyState==='complete'?r():addEventListener('load',r))]);
ready.then(()=>setTimeout(go,Math.max(0,2500-(performance.now()-t0))));setTimeout(go,6000)})();
