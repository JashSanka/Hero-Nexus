import { getAllHeroes } from "./services/api";

const input=document.getElementById("searchInput");
const btn=document.getElementById("searchBtn");
const resultsDiv=document.getElementById("results");

let allHeroes=[];
async function loadHeroes(){
  resultsDiv.innerHTML="<p>Loading Characters</p>";
  const data=await getAllHeroes();
  allHeroes=data.filter(
    (hero)=>{
      return hero.biography.publisher && 
      hero.biography.publisher.toLowerCase().includes("marvel")
    }
  );
  displayResult(allHeroes);

}

function handleSearch(){
  const query=input.value.trim().toLowerCase();
  if(!query){
    displayResult(allHeroes);
    return;
  }
  const filtered=allHeroes.filter((hero)=>hero.name.toLowerCase().includes(query));
  displayResult(filtered);
}

btn.addEventListener("click",handleSearch);

input.addEventListener("keydown", (e)=>{
  if(e.key==="Enter") handleSearch();
})

function displayResult(heroes){
  resultsDiv.innerHTML="";
  if(heroes.length===0){
    resultsDiv.innerHTML="<p>No Such Marvel Character Bub</p>";
    return;
  }
  heroes.forEach((hero) => {
    const card=document.createElement("div");
    card.classList.add("hero-card");
    card.addEventListener("click", ()=>{
      showHeroDetails(hero);
    });
    card.innerHTML=`
    <img src="${hero.images.lg}" alt="${hero.name}">
    <h3>${hero.name}</h3>
    <p>${hero.biography.fullName || "Unknown"}</p>
    `;
    resultsDiv.appendChild(card);
  });

}

function showHeroDetails(hero){
  const app=document.querySelector("#app");
  app.innerHTML = `
    <button id="backBtn">⬅ Back</button>

    <div class="hero-details">
      <img src="${hero.images.lg}" alt="${hero.name}" />
      <h1>${hero.name}</h1>
      <p><strong>Full Name:</strong> ${hero.biography.fullName || "Unknown"}</p>
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
    </div>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    location.reload(); // simple for now
  });
}

// filterheroes my affiliations
const filterBtns=document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const team=btn.dataset.team;
    filterHeroes(team);
  })
})
function filterHeroes(team){
  let filtered=[];
  if (team === "all") {
    displayResults(allHeroes);
    return;
  }
  if (team==="avengers"){
    filtered=allHeroes.filter(hero=>hero.connections.groupAffiliation?.toLowerCase().includes("avengers"));
  }
  else if (team === "xmen") {
    filtered = allHeroes.filter(hero =>
      hero.connections.groupAffiliation?.toLowerCase().includes("x-men")
    );
  }
   else if (team === "guardians") {
    filtered = allHeroes.filter(hero =>
      hero.connections.groupAffiliation?.toLowerCase().includes("guardians")
    );
  }
  else if (team === "fantastic") {
    filtered = allHeroes.filter(hero =>
      hero.connections.groupAffiliation?.toLowerCase().includes("fantastic")
    );
  }
  else if (team === "inhumans") {
    filtered = allHeroes.filter(hero =>
      hero.connections.groupAffiliation?.toLowerCase().includes("inhumans")
    );
  }

  displayResult(filtered)
}

loadHeroes();