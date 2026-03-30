
import { searchHeroName,searchHeroId } from "./services/api.js";

// async function test() {
//   const data = await searchHeroName("ironman");
//   console.log(data);
// }

// test();

// Display all character cards
let allHeroes=[]
async function loadInitialHeroes(){
  
}

const input=document.getElementById("searchInput");
const btn=document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

btn.addEventListener("click",handleSearch)
// start searching after enter key is pressed
input.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
    handleSearch()
  }
})
async function handleSearch(){
  const query=input.value.trim();
  if(!query) return;
  resultsDiv.innerHTML="<p>Loading...</p>"
  const data=await searchHeroName(query)
  console.log(data);
  displayResults(data);
}
//Function to show hero details
async function showherodetails(id){
  const app=document.querySelector("#app")
  app.innerHTML = "<p>Loading hero details...</p>";
  const hero=await searchHeroId(id);
  app.innerHTML=`<button id="backBtn">⬅ Back</button>

    <div class="hero-details">
      <img src="${hero.image.url}" alt="${hero.name}" />
      <h1>${hero.name}</h1>
      <p><strong>Full Name:</strong> ${hero.biography["full-name"]}</p>
      <p><strong>Publisher:</strong> ${hero.biography.publisher}</p>

      <h2>Power Stats</h2>
      <ul>
        <li>Intelligence: ${hero.powerstats.intelligence}</li>
        <li>Strength: ${hero.powerstats.strength}</li>
        <li>Speed: ${hero.powerstats.speed}</li>
        <li>Durability: ${hero.powerstats.durability}</li>
        <li>Power: ${hero.powerstats.power}</li>
        <li>Combat: ${hero.powerstats.combat}</li>
      </ul>
    </div>`;

}

function displayResults(data){
  resultsDiv.innerHTML="";
  if(data.response==="error"){
    resultsDiv.innerHTML=`<p>No heroes found</p>`
    return;
  }
  const marvelHeroes=data.results.filter((hero)=>{
    return hero.biography.publisher && hero.biography.publisher.toLowerCase().includes("marvel");
  })
  if(marvelHeroes.length===0){
    resultsDiv.innerHTML="<p>No such Marvel hero bub</p>"
  }
  marvelHeroes.forEach((hero)=>{
    const card=document.createElement("div");
    //handler to show hero details
    card.addEventListener("click",()=>{
      showherodetails(hero.id)
    })
    card.classList.add("hero-card");

    card.innerHTML=` <img src="${hero.image.url}" alt="${hero.name}" />
      <h3>${hero.name}</h3>
      <p>${hero.biography["full-name"]}</p>`;
    resultsDiv.appendChild(card);
  })
}
