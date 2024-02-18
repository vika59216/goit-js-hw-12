import{a as g,i as d,S as f}from"./assets/vendor-b42c18af.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const y={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnElem:document.querySelector(".btn")},{form:L,gallery:u,loader:c,btnElem:i}=y;c.classList.add("hidden");const a={key:"42200022-9c7e7676f0f903944c054771a",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:1,totalResults:0,q:""};L.addEventListener("submit",async t=>{if(t.preventDefault(),a.q=t.target.elements.input.value,!a.q)return;u.innerHTML="",c.classList.remove("hidden"),a.page=1;const r=await m();a.totalResults=r.totalHits,h(r),p(),t.target.reset()});i.addEventListener("click",async()=>{a.page+=1;const t=await m();h(t),p(),window.scrollBy({top:465,behavior:"smooth"})});async function m(){const t=new URLSearchParams(a);return(await g.get(`https://pixabay.com/api/?${t}`)).data}function h(t){if(t.hits.length===0)d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),i.classList.add("hidden");else{const n=t.hits.map(o=>`<a class="gallery-link" href="${o.largeImageURL}">
        <img class="gallery-image"
        src="${o.webformatURL}"
        alt="${o.tags}"
         </a>
        <div class="img-content">
        <div>
        <h3>Likes</h3>
        <p>${o.likes}</p>
        </div>

        <div>
        <h3>Views</h3>
        <p>${o.views}</p>
        </div>

        <div>
        <h3>Comments</h3>
        <p>${o.comments}</p>
        </div>

        <div>
        <h3>Downloads</h3>
        <p>${o.downloads}</p>
        </div>
        </div>
        `).join("");u.insertAdjacentHTML("beforeend",n),i.classList.remove("hidden")}new f(".gallery-link").refresh(),c.classList.add("hidden")}function p(){Math.ceil(a.totalResults/a.per_page)===a.page&&(i.classList.add("hidden"),d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#ed6205",position:"bottomRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}))}
//# sourceMappingURL=commonHelpers.js.map
