
import { searchHeroName } from "./services/api.js";

// async function test() {
//   const data = await searchHeroName("ironman");
//   console.log(data);
// }

// test();

const input=document.getElementById("searchInput");
const btn=document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

btn.addEventListener("click",async()=>{
  const query=input.value.trim();
  if(!query) return;
  const data=await searchHeroName(query)
  console.log(data);
  displayResults(data);
})

function displayResults(data){
  resultsDiv.innerHTML="";
  if(data.response==="error"){
    resultsDiv.innerHTML=`<p>No heroes found</p>`
    return;
  }
  data.results.forEach((hero)=>{
    const card=document.createElement("div");
    card.classList.add("hero-card");

    card.innerHTML=` <img src="${hero.image.url}" alt="${hero.name}" />
      <h3>${hero.name}</h3>
      <p>${hero.biography["full-name"]}</p>`;
    resultsDiv.appendChild(card);
  })
}