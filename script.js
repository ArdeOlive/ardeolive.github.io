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

(function(){const f=document.querySelector("#reviewForm"),list=document.querySelector("#reviewsList");if(!f||!list)return;const key="avaliacoes_o_arquiteto_do_caos_v1",labels={1:"Péssimo",2:"Ruim",3:"Regular",4:"Bom",5:"Excelente"},seed=[{id:"seed-1",rating:5,text:"Narrativa intensa, sombria e muito visual. A proposta prende pela atmosfera investigativa e pela sensação de que cada detalhe foi colocado no lugar certo.",likes:0,dislikes:0,reply:""},{id:"seed-2",rating:4,text:"A premissa é forte e desperta curiosidade. O clima de São Paulo como tabuleiro de investigação combina muito bem com a ideia do livro.",likes:0,dislikes:0,reply:""},{id:"seed-3",rating:5,text:"A protagonista transmite inteligência e frieza. Dá vontade de acompanhar até onde esse jogo vai chegar.",likes:0,dislikes:0,reply:""}];function load(){let r=localStorage.getItem(key);if(!r){localStorage.setItem(key,JSON.stringify(seed));return [...seed]}try{return JSON.parse(r)}catch{localStorage.setItem(key,JSON.stringify(seed));return [...seed]}}function save(r){localStorage.setItem(key,JSON.stringify(r))}function stars(n){return"★".repeat(n)+"☆".repeat(5-n)}function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function summary(r){let total=r.length,c={1:0,2:0,3:0,4:0,5:0};r.forEach(x=>c[x.rating]++);let avg=total?r.reduce((s,x)=>s+x.rating,0)/total:0;document.querySelector("#totalReviews").textContent=total;document.querySelector("#averageRating").textContent=avg.toFixed(1);document.querySelector("#averageStars").textContent=stars(Math.round(avg||0));for(let i=1;i<=5;i++){document.querySelector("#count"+i).textContent=c[i];let b=document.querySelector("#bar"+i);b.max=total||1;b.value=c[i]}}function render(){let r=load();summary(r);list.innerHTML=r.length?r.map(x=>`<article class="review-card" data-review-id="${x.id}"><div class="review-head"><div><div class="review-stars">${stars(x.rating)}</div><span class="review-rating-label">${x.rating} — ${labels[x.rating]}</span></div></div><p class="review-text">${esc(x.text)}</p>${x.reply?`<div class="author-reply"><strong>Resposta do autor</strong><p>${esc(x.reply)}</p></div>`:""}<div class="review-actions"><button class="vote-btn like-btn" type="button">👍 <span>${x.likes||0}</span></button><button class="vote-btn dislike-btn" type="button">👎 <span>${x.dislikes||0}</span></button><button class="reply-toggle" type="button">Responder como autor</button></div><div class="reply-box"><textarea rows="4" placeholder="Escreva a réplica do autor...">${x.reply?esc(x.reply):""}</textarea><button class="reply-save" type="button">Salvar réplica</button></div></article>`).join(""):'<div class="no-reviews">Ainda não há avaliações. Seja o primeiro leitor a opinar.</div>'}f.addEventListener("submit",e=>{e.preventDefault();let d=new FormData(f),rating=Number(d.get("rating")),text=String(d.get("reviewText")||"").trim();if(!rating||!text)return;let r=load();r.unshift({id:"review-"+Date.now(),rating,text,likes:0,dislikes:0,reply:""});save(r);f.reset();render()});list.addEventListener("click",e=>{let card=e.target.closest(".review-card");if(!card)return;let r=load(),x=r.find(i=>i.id===card.dataset.reviewId);if(!x)return;if(e.target.closest(".like-btn")){x.likes=(x.likes||0)+1;save(r);render()}if(e.target.closest(".dislike-btn")){x.dislikes=(x.dislikes||0)+1;save(r);render()}if(e.target.closest(".reply-toggle"))card.querySelector(".reply-box").classList.toggle("open");if(e.target.closest(".reply-save")){x.reply=(card.querySelector(".reply-box textarea")?.value||"").trim();save(r);render()}});render()})();
