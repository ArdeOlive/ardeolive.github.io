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

/* =========================================================
   AVALIAÇÕES — O ARQUITETO DO CAOS
   Inicia do zero e salva novas avaliações no navegador via localStorage.
   ========================================================= */
(function(){
  const form=document.querySelector("#reviewForm");
  const reviewsList=document.querySelector("#reviewsList");
  if(!form||!reviewsList)return;
  const storageKey="avaliacoes_o_arquiteto_do_caos_v2_zero";
  const labels={1:"Péssimo",2:"Ruim",3:"Regular",4:"Bom",5:"Excelente"};
  function load(){
    const raw=localStorage.getItem(storageKey);
    if(!raw)return [];
    try{const parsed=JSON.parse(raw);return Array.isArray(parsed)?parsed:[]}catch{return []}
  }
  function save(reviews){localStorage.setItem(storageKey,JSON.stringify(reviews))}
  function stars(n){return "★".repeat(n)+"☆".repeat(5-n)}
  function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
  function summary(reviews){
    const total=reviews.length; const counts={1:0,2:0,3:0,4:0,5:0};
    reviews.forEach(r=>{if(counts[r.rating]!==undefined)counts[r.rating]++});
    const avg=total?reviews.reduce((s,r)=>s+Number(r.rating||0),0)/total:0;
    const totalEl=document.querySelector("#totalReviews"), avgEl=document.querySelector("#averageRating"), avgStars=document.querySelector("#averageStars");
    if(totalEl)totalEl.textContent=total; if(avgEl)avgEl.textContent=avg.toFixed(1); if(avgStars)avgStars.textContent=stars(Math.round(avg||0));
    for(let i=1;i<=5;i++){const c=document.querySelector("#count"+i), b=document.querySelector("#bar"+i); if(c)c.textContent=counts[i]; if(b){b.max=total||1;b.value=counts[i]}}
  }
  function render(){
    const reviews=load(); summary(reviews);
    if(!reviews.length){reviewsList.innerHTML='<div class="no-reviews">Ainda não há avaliações. Seja o primeiro leitor a opinar.</div>';return}
    reviewsList.innerHTML=reviews.map(r=>`<article class="review-card" data-review-id="${r.id}"><div class="review-head"><div><div class="review-author-name">Avaliador: <span>${esc(r.name||"Leitor")}</span></div><div class="review-stars">${stars(Number(r.rating))}</div><span class="review-rating-label">${r.rating} — ${labels[r.rating]}</span></div></div><p class="review-text">${esc(r.text)}</p>${r.reply?`<div class="author-reply"><strong>Resposta do autor</strong><p>${esc(r.reply)}</p></div>`:""}<div class="review-actions"><button class="vote-btn like-btn" type="button">👍 <span>${r.likes||0}</span></button><button class="vote-btn dislike-btn" type="button">👎 <span>${r.dislikes||0}</span></button><button class="reply-toggle" type="button">Responder como autor</button></div><div class="reply-box"><textarea rows="4" placeholder="Escreva a réplica do autor...">${r.reply?esc(r.reply):""}</textarea><button class="reply-save" type="button">Salvar réplica</button></div></article>`).join("");
  }
  form.addEventListener("submit",e=>{
    e.preventDefault(); const data=new FormData(form); const rating=Number(data.get("rating")); const name=String(data.get("reviewerName")||"").trim(); const text=String(data.get("reviewText")||"").trim();
    if(!rating||!name||!text)return; const reviews=load(); reviews.unshift({id:"review-"+Date.now(),name,rating,text,likes:0,dislikes:0,reply:""}); save(reviews); form.reset(); render();
  });
  reviewsList.addEventListener("click",e=>{
    const card=e.target.closest(".review-card"); if(!card)return; const reviews=load(); const review=reviews.find(x=>x.id===card.dataset.reviewId); if(!review)return;
    if(e.target.closest(".like-btn")){review.likes=(review.likes||0)+1; save(reviews); render(); return}
    if(e.target.closest(".dislike-btn")){review.dislikes=(review.dislikes||0)+1; save(reviews); render(); return}
    if(e.target.closest(".reply-toggle")){const box=card.querySelector(".reply-box"); if(box)box.classList.toggle("open"); return}
    if(e.target.closest(".reply-save")){const ta=card.querySelector(".reply-box textarea"); review.reply=ta?ta.value.trim():""; save(reviews); render()}
  });
  render();
})();


/* AJUSTE FINAL — BLOQUEIO POR SELEÇÃO DA LISTA "O QUE VOCÊ JÁ LEU" */
(function () {
  const form = document.querySelector("#reviewForm");
  const readStatus = document.querySelector("#readStatus");
  const warningModal = document.querySelector("#readWarningModal");
  const warningOk = document.querySelector("#readWarningOk");

  if (!form || !readStatus) return;

  const gatedFields = Array.from(document.querySelectorAll(".gated-field"));

  function openWarning() {
    if (warningModal) {
      warningModal.classList.add("open");
      warningModal.setAttribute("aria-hidden", "false");
    } else {
      alert("Selecione uma das opções na lista O QUE VOCÊ JÁ LEU.");
      form.reset();
      window.location.href = "avaliacoes.html";
    }
  }

  function closeWarningAndReset() {
    if (warningModal) {
      warningModal.classList.remove("open");
      warningModal.setAttribute("aria-hidden", "true");
    }

    form.reset();
    setLockedState();

    window.location.href = "avaliacoes.html";
  }

  function isUnlocked() {
    return readStatus.value.trim() !== "";
  }

  function setLockedState() {
    const unlocked = isUnlocked();

    gatedFields.forEach((field) => {
      if (field === readStatus) return;
      field.disabled = !unlocked;
      field.classList.toggle("gated-disabled", !unlocked);
    });
  }

  function blockIfNeeded(event) {
    if (!isUnlocked()) {
      event.preventDefault();
      event.stopPropagation();
      openWarning();
      return false;
    }
  }

  setLockedState();

  readStatus.addEventListener("change", setLockedState);

  gatedFields.forEach((field) => {
    if (field === readStatus) return;
    field.addEventListener("pointerdown", blockIfNeeded, true);
    field.addEventListener("focus", blockIfNeeded, true);
  });

  form.addEventListener("submit", function (event) {
    if (!isUnlocked()) {
      event.preventDefault();
      event.stopPropagation();
      openWarning();
      return false;
    }
  }, true);

  if (warningOk) {
    warningOk.addEventListener("click", closeWarningAndReset);
  }
})();
