// ─── Language ────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('vincemed-lang') || 'pt';

const T = {
  pt: {
    'nav.home':'Início','nav.about':'Sobre','nav.products':'Produtos','nav.cta':'Contato',
    'hero.w1':'Confiança','hero.w2':'em','hero.w3':'cada','hero.w4':'procedimento.',
    'hero.p':'A VinceMed fornece correlatos hospitalares e soluções médicas de alta qualidade para hospitais, clínicas e profissionais de saúde em todo o Brasil.',
    'hero.btn1':'Conheça as linhas','hero.btn2':'Falar com a equipe',
    'manifesto':'"Os melhores procedimentos dependem de inúmeros detalhes invisíveis. É por isso que selecionamos cada produto com rigor, garantindo confiabilidade, segurança e desempenho para quem está na linha da frente do cuidado."',
    'prod.eyebrow':'Linha Hemodinâmica','prod.h2':'Nossos','prod.h2.l2':'Produtos',
    'prod.sub':'Soluções para hemodinâmica e cardiologia intervencionista.','prod.btn':'Saiba mais',
    'br.eyebrow':'Cobertura nacional','br.h2':'Atendemos','br.h2.l2':'todo o Brasil',
    'br.p':'A VinceMed possui uma estrutura preparada para atender clientes em todo o território brasileiro, com agilidade, segurança e excelência no suporte.',
    'br.f1h':'Logística eficiente','br.f1p':'Distribuição ágil e rastreável para todas as regiões.',
    'br.f2h':'Qualidade garantida','br.f2p':'Produtos certificados e dentro dos padrões técnicos.',
    'br.f3h':'Suporte especializado','br.f3p':'Equipe técnica pronta para orientar e acompanhar.',
    'br.map':'Presença em todas as regiões do país',
    'faq.eyebrow':'Dúvidas frequentes','faq.h2':'Tudo o que você','faq.h2.l2':'precisa saber',
    'faq.lead':'Reunimos as perguntas mais comuns de quem busca um parceiro confiável em produtos médicos.',
    'faq.q1':'Como funciona o atendimento da VinceMed?',
    'faq.a1':'Atuamos como distribuidora de produtos médicos, atendendo instituições de saúde, clínicas e revendas. O contato inicial pode ser feito pelo formulário ou diretamente com a nossa equipe comercial.',
    'faq.q2':'Vocês atendem todo o Brasil?',
    'faq.a2':'Sim. A VinceMed atua em todo o território nacional e conta com presença operacional em cinco estados. Nossa estrutura logística foi desenvolvida para garantir agilidade, segurança e eficiência no fornecimento de produtos médicos para hospitais, clínicas, distribuidores e instituições de saúde em todas as regiões do Brasil.',
    'faq.q3':'Quais linhas de produtos vocês oferecem?',
    'faq.a3':'Oferecemos um portfólio completo de produtos médicos para atender às principais demandas do setor da saúde. Nossas soluções abrangem as linhas de hemodinâmica, cardiologia intervencionista e hospitalar, reunindo dispositivos de alta qualidade, segurança e conformidade com os padrões regulatórios para atender hospitais, clínicas, distribuidores e instituições de saúde.',
    'faq.q4':'Como solicito um orçamento?',
    'faq.a4':'Solicitar um orçamento é simples. Basta preencher o formulário disponível no site informando os produtos ou soluções de que precisa, ou falar diretamente com nossa equipe pelo WhatsApp. Se preferir, também estamos disponíveis pelo e-mail contato@vincemed.com.br ou por telefone, através do número +55 (85) 98190.7070. Nossa equipe terá o prazer em entender a sua necessidade e apresentar a solução mais adequada para a sua empresa.',
    'cta.eyebrow':'Vamos conversar','cta.h2':'Fale com a','cta.h2.l2':'nossa equipe',
    'cta.p':'Estamos prontos para entender as suas necessidades e oferecer as melhores soluções para o seu negócio.',
    'form.name':'Nome completo *','form.email':'E-mail *','form.phone':'Telefone',
    'form.company':'Empresa','form.subject':'Assunto','form.message':'Mensagem *',
    'form.submit':'Enviar mensagem','form.sending':'Enviando…',
    'form.ph.name':'Seu nome','form.ph.email':'seu@email.com','form.ph.phone':'+55 (00) 00000-0000',
    'form.ph.company':'Nome da empresa','form.ph.subject':'Como podemos ajudar?','form.ph.msg':'Descreva a sua necessidade...',
    'form.ok':'A sua mensagem foi enviada com sucesso. Entraremos em contacto em breve.',
    'form.err.name':'Por favor, informe o seu nome.','form.err.email':'Por favor, informe um e-mail válido.',
    'form.err.msg':'Por favor, escreva a sua mensagem.','form.err.send':'Não foi possível enviar a sua mensagem. Tente novamente.',
    'foot.brand':'Soluções médicas com qualidade, confiança, tecnologia e cuidado em cada detalhe.',
    'foot.nav':'Navegação','foot.products':'Produtos','foot.contact':'Contato',
    'foot.home':'Início','foot.about':'Sobre',
    'foot.legal1':'Política de Privacidade','foot.legal2':'Termos de Uso',
  },
  en: {
    'nav.home':'Home','nav.about':'About','nav.products':'Products','nav.cta':'Contact',
    'hero.w1':'Trust','hero.w2':'in','hero.w3':'every','hero.w4':'procedure.',
    'hero.p':'VinceMed provides high-quality hospital supplies and medical solutions for hospitals, clinics, and healthcare professionals across Brazil.',
    'hero.btn1':'Explore our lines','hero.btn2':'Talk to our team',
    'manifesto':'"The best procedures depend on countless invisible details. That\'s why we select every product with rigor, ensuring reliability, safety, and performance for those on the front line of care."',
    'prod.eyebrow':'Hemodynamic Line','prod.h2':'Our','prod.h2.l2':'Products',
    'prod.sub':'Solutions for hemodynamics and interventional cardiology.','prod.btn':'Learn more',
    'br.eyebrow':'National coverage','br.h2':'We serve','br.h2.l2':'all of Brazil',
    'br.p':'VinceMed has a structure prepared to serve clients across the Brazilian territory, with agility, safety, and excellence in support.',
    'br.f1h':'Efficient logistics','br.f1p':'Fast and trackable distribution to all regions.',
    'br.f2h':'Guaranteed quality','br.f2p':'Certified products meeting all technical standards.',
    'br.f3h':'Specialized support','br.f3p':'Technical team ready to guide and assist.',
    'br.map':'Presence in all regions of the country',
    'faq.eyebrow':'Frequently asked questions','faq.h2':'Everything you','faq.h2.l2':'need to know',
    'faq.lead':'We\'ve gathered the most common questions from those looking for a reliable medical products partner.',
    'faq.q1':'How does VinceMed\'s service work?',
    'faq.a1':'We operate as a medical products distributor, serving healthcare institutions, clinics, and resellers. You can reach us through the contact form or directly with our commercial team.',
    'faq.q2':'Do you serve all of Brazil?',
    'faq.a2':'Yes. VinceMed operates across the entire Brazilian territory with operational presence in five states. Our logistics structure was built to ensure agility, safety, and efficiency in supplying medical products to hospitals, clinics, distributors, and healthcare institutions in all regions of Brazil.',
    'faq.q3':'What product lines do you offer?',
    'faq.a3':'We offer a complete portfolio of medical products to meet the main demands of the healthcare sector. Our solutions cover the hemodynamics, interventional cardiology, and hospital lines, featuring high-quality devices that comply with safety and regulatory standards for hospitals, clinics, distributors, and healthcare institutions.',
    'faq.q4':'How do I request a quote?',
    'faq.a4':'Requesting a quote is simple. Just fill out the form on the website with the products or solutions you need, or speak directly with our team on WhatsApp. You can also reach us by email at contato@vincemed.com.br or by phone at +55 (85) 98190.7070. Our team will be happy to understand your needs and present the best solution for your company.',
    'cta.eyebrow':'Let\'s talk','cta.h2':'Talk to','cta.h2.l2':'our team',
    'cta.p':'We are ready to understand your needs and offer the best solutions for your business.',
    'form.name':'Full name *','form.email':'Email *','form.phone':'Phone',
    'form.company':'Company','form.subject':'Subject','form.message':'Message *',
    'form.submit':'Send message','form.sending':'Sending…',
    'form.ph.name':'Your name','form.ph.email':'you@email.com','form.ph.phone':'+55 (00) 00000-0000',
    'form.ph.company':'Company name','form.ph.subject':'How can we help?','form.ph.msg':'Describe your needs...',
    'form.ok':'Your message was sent successfully. We will get back to you shortly.',
    'form.err.name':'Please provide your name.','form.err.email':'Please provide a valid email.',
    'form.err.msg':'Please write your message.','form.err.send':'Unable to send your message. Please try again.',
    'foot.brand':'Medical solutions with quality, trust, technology, and care in every detail.',
    'foot.nav':'Navigation','foot.products':'Products','foot.contact':'Contact',
    'foot.home':'Home','foot.about':'About',
    'foot.legal1':'Privacy Policy','foot.legal2':'Terms of Use',
  }
};

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS=[
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Fio Guia PTFE',en:'PTFE Guide Wire'},
  img:'/assets/img/produto-fio-guia.png',
  desc:{
   pt:'Fio guia revestido em PTFE com ponta tipo J, diâmetro 0,035" e 260 cm de comprimento, indicado para facilitar a introdução e o posicionamento de cateteres em procedimentos endovasculares. O revestimento em PTFE reduz o atrito e favorece uma navegação suave.',
   en:'PTFE-coated guide wire with J-type tip, 0.035" diameter and 260 cm in length, designed to facilitate the introduction and positioning of catheters in endovascular procedures. The PTFE coating reduces friction for smooth navigation.'},
  tags:['PTFE','J-Tip','0.035" · 260 cm']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Insuflador de Balão',en:'Balloon Inflator'},
  img:'/assets/img/produto-insuflador.png',
  desc:{
   pt:'Insuflador de balão tipo clássico com pressão máxima de 30 ATM, utilizado para insuflar e controlar com precisão a pressão de balões em procedimentos de hemodinâmica e cardiologia intervencionista.',
   en:'Classic-type balloon inflator with a maximum pressure of 30 ATM, used to precisely inflate and control balloon pressure in hemodynamic and interventional cardiology procedures.'},
  tags:['30 ATM','Classic Type','Single Use']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Manifold Vincemed',en:'Vincemed Manifold'},
  img:'/assets/img/produto-manifold.png',
  desc:{
   pt:'Manifold de três vias na configuração RIGHT, estéril e de uso único, para o gerenciamento do fluxo de soluções e o controle de pressão em procedimentos hemodinâmicos. Livre de látex.',
   en:'Three-way manifold in RIGHT configuration, sterile and single-use, for solution flow management and pressure control in hemodynamic procedures. Latex-free.'},
  tags:['3-Way','RIGHT Config','Sterile']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Pulseira de Compressão Radial',en:'Radial Compression Band'},
  img:'/assets/img/produto-pulseira.png',
  desc:{
   pt:'Pulseira para hemostasia da artéria radial após procedimentos por acesso radial, com insuflação por seringa para compressão controlada e gradual. Estéril e de uso único.',
   en:'Wristband for radial artery hemostasis after radial access procedures, with syringe inflation for controlled and gradual compression. Sterile and single-use.'},
  tags:['Radial Access','Hemostasis','Single Use']},
 {eye:{pt:'Linha Hospitalar',en:'Hospital Line'},
  title:{pt:'Cateter IV Periférico',en:'Peripheral IV Catheter'},
  img:'/assets/img/produto-cateter.png',
  desc:{
   pt:'Cateter intravenoso periférico PRIMACAN de uso único, desenvolvido para acesso venoso periférico seguro e eficiente. Calibre 14G, com design que facilita a introdução e minimiza o trauma vascular.',
   en:'PRIMACAN single-use peripheral intravenous catheter, designed for safe and efficient peripheral venous access. 14G gauge with a design that facilitates insertion and minimizes vascular trauma.'},
  tags:['14G','PRIMACAN','IV Access']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Linha de Extensão Alta Pressão',en:'High-Pressure Extension Line'},
  img:'/assets/img/produto-linha-extensao.png',
  desc:{
   pt:'Linha de extensão de alta pressão com resistência de até 1200 PSI e conector valvulado, em 120 cm de comprimento. Indicada para conexão entre dispositivos em procedimentos hemodinâmicos e intervencionistas.',
   en:'High-pressure extension line rated up to 1,200 PSI with a valved connector, 120 cm in length. Designed for device connection in hemodynamic and interventional procedures.'},
  tags:['1200 PSI','Valved Connector','120 cm']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Torneira de 3 Vias',en:'3-Way Stopcock'},
  img:'/assets/img/produto-torneira.png',
  desc:{
   pt:'Torneira de três vias para controle e direcionamento do fluxo de soluções em procedimentos de cateterismo e hemodinâmica. Livre de látex, estéril e de uso único.',
   en:'Three-way stopcock for flow control and direction in catheterization and hemodynamic procedures. Latex-free, sterile, and single-use.'},
  tags:['3-Way','Latex-Free','Single Use']},
 {eye:{pt:'Linha Hemodinâmica',en:'Hemodynamic Line'},
  title:{pt:'Válvula Hemostática',en:'Hemostatic Valve'},
  img:'/assets/img/produto-valvula.png',
  desc:{
   pt:'Válvula hemostática com conectores Y e rosca para vedação hermética durante procedimentos endovasculares. Permite a passagem de guias e cateteres com mínimo sangramento.',
   en:'Hemostatic valve with Y and threaded connectors for hermetic sealing during endovascular procedures. Allows guide wires and catheters to pass through with minimal blood loss.'},
  tags:['Y Connector','Threaded','Single Use']}
];

// ─── Carousel ─────────────────────────────────────────────────────────────────
const N=PRODUCTS.length; let idx=0;
const stage=document.getElementById('stage'), dots=document.getElementById('dots');

PRODUCTS.forEach((p,i)=>{
  const c=document.createElement('div'); c.className='pcard'; c.dataset.i=i;
  c.innerHTML=`<img src="${p.img}" alt="${p.title.pt}">`;
  c.addEventListener('click',()=>{if(+c.dataset.i!==idx){idx=+c.dataset.i;render();startAuto();}});
  stage.appendChild(c);
  const d=document.createElement('button'); d.className='dot';
  d.addEventListener('click',()=>{idx=i;render();startAuto();}); dots.appendChild(d);
});

const cards=[...stage.children], dotEls=[...dots.children];

function render(){
  cards.forEach((c,i)=>{let r=(i-idx+N)%N;c.classList.remove('pos-center','pos-left','pos-right','pos-hide');
    c.classList.add(r===0?'pos-center':r===1?'pos-right':r===N-1?'pos-left':'pos-hide');});
  dotEls.forEach((d,i)=>d.classList.toggle('on',i===idx));
  const p=PRODUCTS[idx], s=document.getElementById('pswap'); s.classList.add('out');
  setTimeout(()=>{
    document.getElementById('p-eye').textContent=p.eye[currentLang];
    document.getElementById('p-title').textContent=p.title[currentLang];
    document.getElementById('p-desc').textContent=p.desc[currentLang];
    document.getElementById('p-list').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
    s.classList.remove('out');},220);
}

// Auto-scroll
const progressFill=document.getElementById('progressFill');
const SLIDE_MS=4000;
let _autoTimer;
const _noMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

function resetProgress(){
  if(!progressFill||_noMotion) return;
  progressFill.style.transition='none'; progressFill.style.width='0%';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    progressFill.style.transition=`width ${SLIDE_MS}ms linear`;
    progressFill.style.width='100%';}));
}
function startAuto(){
  if(_noMotion) return;
  clearTimeout(_autoTimer); resetProgress();
  _autoTimer=setTimeout(()=>{idx=(idx+1)%N;render();startAuto();},SLIDE_MS);
}
function goNext(){idx=(idx+1)%N;render();startAuto();}
function goPrev(){idx=(idx-1+N)%N;render();startAuto();}
document.getElementById('next').addEventListener('click',goNext);
document.getElementById('prev').addEventListener('click',goPrev);
let _tx=0;
stage.addEventListener('touchstart',e=>{_tx=e.touches[0].clientX;},{passive:true});
stage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-_tx;if(Math.abs(dx)>40){dx<0?goNext():goPrev();}},{passive:true});
render(); startAuto();

// ─── Nav scroll state ─────────────────────────────────────────────────────────
const nav=document.getElementById('nav'), heroEl=document.getElementById('topo');
function navState(){const inHero=scrollY<heroEl.offsetHeight-90;const atTop=scrollY<10;nav.classList.toggle('over',inHero);nav.classList.toggle('at-top',atTop);nav.classList.toggle('scrolled',!inHero);}
navState(); addEventListener('scroll',navState);

// Active link
const links=document.querySelectorAll('.nav-links a');
const ids=['topo','sobre','produtos','contato'];
addEventListener('scroll',()=>{let cur='topo';ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=160)cur=id;});
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));});

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.16});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// FAQ accordion
document.querySelectorAll('.acc-item').forEach(it=>{
  const q=it.querySelector('.acc-q'), a=it.querySelector('.acc-a');
  q.addEventListener('click',()=>{const open=it.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(o=>{o.classList.remove('open');o.querySelector('.acc-a').style.maxHeight=null;});
    if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});
});

// Mobile menu
const mm=document.getElementById('mmenu');
document.getElementById('hamb').addEventListener('click',()=>mm.classList.add('open'));
document.getElementById('mclose').addEventListener('click',()=>mm.classList.remove('open'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));

// ─── i18n ─────────────────────────────────────────────────────────────────────
let rebuildManifesto;

function setLang(lang){
  currentLang=lang;
  document.documentElement.lang=lang==='pt'?'pt-BR':'en';

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v=T[lang][el.dataset.i18n];
    if(v!==undefined) el.textContent=v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const v=T[lang][el.dataset.i18nPh];
    if(v!==undefined) el.placeholder=v;
  });

  // Update lang button states
  document.querySelectorAll('.lang button').forEach(b=>{
    b.classList.toggle('on',b.textContent.toLowerCase()===lang);
  });

  // Update carousel with new language
  render();

  // Rebuild manifesto text
  if(typeof rebuildManifesto==='function') rebuildManifesto(lang);

  localStorage.setItem('vincemed-lang',lang);
}

document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',function(){
  setLang(this.textContent.toLowerCase());
}));

// ─── Manifesto text-reveal ────────────────────────────────────────────────────
(function(){
  const sec=document.querySelector('.manifesto');
  const rt=document.getElementById('revealText');
  if(!sec||!rt) return;
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  let spans=[];

  function build(lang){
    const words=T[lang]['manifesto'].trim().split(/\s+/);
    rt.textContent='';
    words.forEach(w=>{const s=document.createElement('span');s.className='w';s.textContent=w;rt.appendChild(s);rt.appendChild(document.createTextNode(' '));});
    spans=[...rt.querySelectorAll('.w')];
    if(reduce) spans.forEach(s=>s.style.opacity=1);
  }

  function reveal(){
    if(reduce) return;
    const total=sec.offsetHeight-window.innerHeight;
    let prog=(-sec.getBoundingClientRect().top)/total;
    prog=Math.max(0,Math.min(1,prog));
    const rev=prog*(spans.length+3);
    spans.forEach((s,i)=>{let t=(rev-i)/2.5;t=Math.max(0,Math.min(1,t));s.style.opacity=0.14+t*0.86;});
  }

  build(currentLang); reveal();
  addEventListener('scroll',reveal,{passive:true});
  addEventListener('resize',reveal);

  rebuildManifesto=function(lang){build(lang);reveal();};
})();

// ─── Contact form ─────────────────────────────────────────────────────────────
(function(){
  const form=document.getElementById('ctaForm');
  if(!form) return;
  const btn=document.getElementById('cfSubmit');
  const feedback=document.getElementById('cfFeedback');

  function setLoading(on){
    btn.disabled=on; btn.classList.toggle('loading',on);
    btn.querySelector('.btn-txt').textContent=on?T[currentLang]['form.sending']:T[currentLang]['form.submit'];
  }
  function showFeedback(type,msg){
    feedback.textContent=msg; feedback.className='cf-feedback cf-'+type; feedback.hidden=false;
  }

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const nome=document.getElementById('cf-nome').value.trim();
    const empresa=document.getElementById('cf-empresa').value.trim();
    const email=document.getElementById('cf-email').value.trim();
    const telefone=document.getElementById('cf-tel').value.trim();
    const assunto=document.getElementById('cf-assunto').value.trim();
    const mensagem=document.getElementById('cf-msg').value.trim();

    if(!nome){showFeedback('error',T[currentLang]['form.err.name']);return;}
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showFeedback('error',T[currentLang]['form.err.email']);return;}
    if(!mensagem){showFeedback('error',T[currentLang]['form.err.msg']);return;}

    setLoading(true); feedback.hidden=true;
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nome,empresa,email,telefone,assunto,mensagem})});
      const data=await res.json();
      if(res.ok){form.reset();showFeedback('success',T[currentLang]['form.ok']);}
      else{showFeedback('error',data.error||T[currentLang]['form.err.send']);}
    }catch{
      showFeedback('error',T[currentLang]['form.err.send']);
    }finally{setLoading(false);}
  });
})();

// ─── Hero entrance ────────────────────────────────────────────────────────────
requestAnimationFrame(()=>setTimeout(()=>document.querySelector('.hero').classList.add('played'),120));

// ─── Init language ────────────────────────────────────────────────────────────
if(currentLang!=='pt') setLang(currentLang);
