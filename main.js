const PRODUCTS=[
 {eye:'Linha Hemodinâmica',title:'Fio Guia PTFE',img:'/assets/img/produto-fio-guia.jpg',
  desc:'Fio guia revestido em PTFE com ponta tipo J, diâmetro 0,035" e 260 cm de comprimento, indicado para facilitar a introdução e o posicionamento de cateteres em procedimentos endovasculares. O revestimento em PTFE reduz o atrito e favorece uma navegação suave.',
  tags:['PTFE','Ponta J 0,035\"','260 cm']},
 {eye:'Linha Hemodinâmica',title:'Kit Insuflador de Balão',img:'/assets/img/produto-insuflador.jpg',
  desc:'Dispositivo insuflador com manômetro integrado e capacidade de 20 mL/cc, utilizado para insuflar e controlar com precisão a pressão de balões em angioplastia e procedimentos de cardiologia intervencionista.',
  tags:['20 mL/cc','Manômetro','Uso único']},
 {eye:'Linha Hemodinâmica',title:'Manifold 3 Vias',img:'/assets/img/produto-manifold.jpg',
  desc:'Manifold de três vias na configuração à direita, estéril e de uso único, para o gerenciamento do fluxo de soluções e o controle de pressão em procedimentos hemodinâmicos. Livre de látex e esterilizado por óxido de etileno.',
  tags:['3 vias','Estéril (EO)','Livre de látex']},
 {eye:'Linha Hemodinâmica',title:'Pulseira de Compressão Radial',img:'/assets/img/produto-pulseira.jpg',
  desc:'Pulseira para hemostasia da artéria radial após procedimentos por acesso radial, com insuflação por seringa para uma compressão controlada e gradual. Estéril, de uso único e livre de látex.',
  tags:['Acesso radial','Hemostasia','Uso único']}
];
const N=PRODUCTS.length; let idx=0;
const stage=document.getElementById('stage'), dots=document.getElementById('dots');
const ARR='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';
PRODUCTS.forEach((p,i)=>{
  const c=document.createElement('div'); c.className='pcard'; c.dataset.i=i;
  c.innerHTML=`<img src="${p.img}" alt="${p.title}"><div class="povl"></div><div class="parrow">${ARR}</div><div class="plabel">${p.title}</div>`;
  c.addEventListener('click',()=>{if(+c.dataset.i!==idx){idx=+c.dataset.i;render();}});
  stage.appendChild(c);
  const d=document.createElement('button'); d.className='dot'; d.addEventListener('click',()=>{idx=i;render();}); dots.appendChild(d);
});
const cards=[...stage.children], dotEls=[...dots.children];
function render(){
  cards.forEach((c,i)=>{let r=(i-idx+N)%N;c.classList.remove('pos-center','pos-left','pos-right','pos-hide');
    c.classList.add(r===0?'pos-center':r===1?'pos-right':r===N-1?'pos-left':'pos-hide');});
  dotEls.forEach((d,i)=>d.classList.toggle('on',i===idx));
  const p=PRODUCTS[idx], s=document.getElementById('pswap'); s.classList.add('out');
  setTimeout(()=>{document.getElementById('p-eye').textContent=p.eye;
    document.getElementById('p-title').textContent=p.title;
    document.getElementById('p-desc').textContent=p.desc;
    document.getElementById('p-list').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
    s.classList.remove('out');},220);
}
function goNext(){idx=(idx+1)%N;render();}
function goPrev(){idx=(idx-1+N)%N;render();}
document.getElementById('next').addEventListener('click',goNext);
document.getElementById('prev').addEventListener('click',goPrev);
let _tx=0;
stage.addEventListener('touchstart',e=>{_tx=e.touches[0].clientX;},{passive:true});
stage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-_tx;if(Math.abs(dx)>40){dx<0?goNext():goPrev();}},{passive:true});
render();

// nav scroll state
const nav=document.getElementById('nav'), heroEl=document.getElementById('topo');
function navState(){const inHero=scrollY<heroEl.offsetHeight-90;const atTop=scrollY<10;nav.classList.toggle('over',inHero);nav.classList.toggle('at-top',atTop);nav.classList.toggle('scrolled',!inHero);}
navState(); addEventListener('scroll',navState);

// active link
const links=document.querySelectorAll('.nav-links a');
const ids=['topo','sobre','produtos','contato'];
addEventListener('scroll',()=>{let cur='topo';ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=160)cur=id;});
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));});

// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.16});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// faq accordion
document.querySelectorAll('.acc-item').forEach(it=>{
  const q=it.querySelector('.acc-q'), a=it.querySelector('.acc-a');
  q.addEventListener('click',()=>{const open=it.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(o=>{o.classList.remove('open');o.querySelector('.acc-a').style.maxHeight=null;});
    if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});
});

// mobile menu
const mm=document.getElementById('mmenu');
document.getElementById('hamb').addEventListener('click',()=>mm.classList.add('open'));
document.getElementById('mclose').addEventListener('click',()=>mm.classList.remove('open'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));

// lang toggle
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',function(){
  document.querySelectorAll('.lang button').forEach(x=>x.classList.remove('on'));this.classList.add('on');}));

// ---- text reveal on scroll (manifesto) ----
(function(){
  const sec=document.querySelector('.manifesto');
  const rt=document.getElementById('revealText');
  if(!sec||!rt) return;
  const words=rt.textContent.trim().split(/\s+/);
  rt.textContent='';
  words.forEach(w=>{const s=document.createElement('span');s.className='w';s.textContent=w;rt.appendChild(s);rt.appendChild(document.createTextNode(' '));});
  const spans=rt.querySelectorAll('.w');
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce){spans.forEach(s=>s.style.opacity=1);return;}
  function reveal(){
    const total=sec.offsetHeight-window.innerHeight;
    let prog=(-sec.getBoundingClientRect().top)/total;
    prog=Math.max(0,Math.min(1,prog));
    const rev=prog*(spans.length+3);
    spans.forEach((s,i)=>{let t=(rev-i)/2.5;t=Math.max(0,Math.min(1,t));s.style.opacity=0.14+t*0.86;});
  }
  reveal();
  addEventListener('scroll',reveal,{passive:true});
  addEventListener('resize',reveal);
})();

// ---- contact form → WhatsApp ----
(function(){
  const form=document.getElementById('ctaForm');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const nome=document.getElementById('cf-nome').value.trim();
    const email=document.getElementById('cf-email').value.trim();
    const tel=document.getElementById('cf-tel').value.trim();
    const msg=document.getElementById('cf-msg').value.trim();
    const text=encodeURIComponent(`Olá! Meu nome é ${nome} (${email}${tel?', '+tel:''}).\n\n${msg}`);
    window.open(`https://wa.me/5500000000000?text=${text}`,'_blank');
  });
})();


// ---- hero entrance trigger ----
requestAnimationFrame(()=>setTimeout(()=>document.querySelector('.hero').classList.add('played'),120));