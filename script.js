const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!link.classList.contains('dropdown-toggle') && !link.classList.contains('submenu-toggle')) {
        nav.classList.remove('open');
      }
    });
  });
}

const year = document.querySelector('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}


/* AVALIAÇÕES — O ARQUITETO DO CAOS: bloqueio, zero, ADM */
(function(){
const form=document.querySelector('#reviewForm'),list=document.querySelector('#reviewsList'); if(!form||!list)return;
const storageKey='avaliacoes_o_arquiteto_do_caos_v3_zero', admKey='autor_adm_o_arquiteto_do_caos_v1';
const read=document.querySelector('#readStatus'), gated=[...document.querySelectorAll('.gated-field')];
const warn=document.querySelector('#readWarningModal'), ok=document.querySelector('#readWarningOk');
const admLink=document.querySelector('#authorAdmLink'), admModal=document.querySelector('#authorAdmModal'), admClose=document.querySelector('#authorAdmClose'), admUser=document.querySelector('#admUser'), admPass=document.querySelector('#admPass'), admBtn=document.querySelector('#admLoginBtn'), forgot=document.querySelector('#forgotAdmPassword'), admMsg=document.querySelector('#admMessage');
const labels={1:'Péssimo',2:'Ruim',3:'Regular',4:'Bom',5:'Excelente'};
function open(m){if(m){m.classList.add('open');m.setAttribute('aria-hidden','false')}} function close(m){if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}}
function gate(){const u=!!(read&&read.value);gated.forEach(f=>{f.disabled=!u;f.classList.toggle('gated-disabled',!u)})}
function warnLocked(e){if(read&&!read.value){e.preventDefault();e.stopPropagation();open(warn);read.focus()}}
gate(); if(read)read.addEventListener('change',gate); gated.forEach(f=>{f.addEventListener('pointerdown',warnLocked);f.addEventListener('focus',warnLocked)}); if(ok)ok.onclick=()=>close(warn);
function load(){try{return JSON.parse(localStorage.getItem(storageKey)||'[]')}catch{return[]}} function save(r){localStorage.setItem(storageKey,JSON.stringify(r))}
function loadAdm(){try{return JSON.parse(localStorage.getItem(admKey)||'null')}catch{return null}} function saveAdm(u,p){localStorage.setItem(admKey,JSON.stringify({user:u,pass:p}))}
function stars(n){return'★'.repeat(n)+'☆'.repeat(5-n)} function esc(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function summary(r){let t=r.length,c={1:0,2:0,3:0,4:0,5:0};r.forEach(x=>{if(c[x.rating]!=null)c[x.rating]++});let avg=t?r.reduce((s,x)=>s+Number(x.rating||0),0)/t:0;let e=document.querySelector('#totalReviews');if(e)e.textContent=t;e=document.querySelector('#averageRating');if(e)e.textContent=avg.toFixed(1);e=document.querySelector('#averageStars');if(e)e.textContent=stars(Math.round(avg||0));for(let i=1;i<=5;i++){let ce=document.querySelector('#count'+i),be=document.querySelector('#bar'+i);if(ce)ce.textContent=c[i];if(be){be.max=t||1;be.value=c[i]}}}
function render(){const r=load();summary(r); if(!r.length){list.innerHTML='<div class="no-reviews">Ainda não há avaliações. Seja o primeiro leitor a opinar.</div>';return} list.innerHTML=r.map(x=>`<article class="review-card" data-review-id="${x.id}"><div class="review-head"><div><div class="review-author-name">Avaliador: <span>${esc(x.name||'Leitor')}</span></div><div class="review-read-status">O que leu: <span>${esc(x.read||'Não informado')}</span></div><div class="review-stars">${stars(Number(x.rating))}</div><span class="review-rating-label">${x.rating} — ${labels[x.rating]}</span></div></div><p class="review-text">${esc(x.text)}</p>${x.reply?`<div class="author-reply"><strong>Resposta do autor</strong><p>${esc(x.reply)}</p></div>`:''}<div class="review-actions"><button class="vote-btn like-btn" type="button">👍 <span>${x.likes||0}</span></button><button class="vote-btn dislike-btn" type="button">👎 <span>${x.dislikes||0}</span></button><button class="reply-toggle" type="button">Responder como autor</button><button class="delete-review-btn" type="button" title="Excluir avaliação">🗑️ Excluir</button></div><div class="reply-box"><textarea rows="4" placeholder="Escreva a réplica do autor...">${x.reply?esc(x.reply):''}</textarea><button class="reply-save" type="button">Salvar réplica</button></div></article>`).join('')}
form.addEventListener('submit',e=>{e.preventDefault();if(read&&!read.value){open(warn);read.focus();return}const d=new FormData(form),rv=String(d.get('readStatus')||'').trim(),rating=Number(d.get('rating')),name=String(d.get('reviewerName')||'').trim(),text=String(d.get('reviewText')||'').trim();if(!rv||!rating||!name||!text)return;let r=load();r.unshift({id:'review-'+Date.now(),read:rv,name,rating,text,likes:0,dislikes:0,reply:''});save(r);form.reset();gate();render()});
list.addEventListener('click',e=>{const card=e.target.closest('.review-card'); if(!card)return;let r=load(),x=r.find(i=>i.id===card.dataset.reviewId); if(!x)return;if(e.target.closest('.like-btn')){x.likes=(x.likes||0)+1;save(r);render();return}if(e.target.closest('.dislike-btn')){x.dislikes=(x.dislikes||0)+1;save(r);render();return}if(e.target.closest('.reply-toggle')){card.querySelector('.reply-box')?.classList.toggle('open');return}if(e.target.closest('.reply-save')){x.reply=(card.querySelector('.reply-box textarea')?.value||'').trim();save(r);render();return}if(e.target.closest('.delete-review-btn')){if(!document.body.classList.contains('adm-active'))return;if(confirm('Excluir esta avaliação?')){save(r.filter(i=>i.id!==card.dataset.reviewId));render()}}});
if(admLink)admLink.onclick=e=>{e.preventDefault();if(admMsg)admMsg.textContent='';open(admModal)}; if(admClose)admClose.onclick=()=>close(admModal);
if(admBtn)admBtn.onclick=()=>{const u=admUser.value.trim(),p=admPass.value.trim(),saved=loadAdm();if(!u||!p){admMsg.textContent='Preencha usuário e senha.';return}if(!saved){saveAdm(u,p);document.body.classList.add('adm-active');close(admModal);render();return}if(saved.user===u&&saved.pass===p){document.body.classList.add('adm-active');close(admModal);render()}else admMsg.textContent='Usuário ou senha inválidos.'};
if(forgot)forgot.onclick=e=>{e.preventDefault();const s=loadAdm(),sub=encodeURIComponent('Recuperação de acesso AUTOR ADM'),body=encodeURIComponent(s?`Usuário cadastrado: ${s.user}\nSenha cadastrada: ${s.pass}`:'Ainda não existe usuário e senha cadastrados para o AUTOR ADM.');location.href=`mailto:ardeolive.escritor@gmail.com?subject=${sub}&body=${body}`};
render();
})();
