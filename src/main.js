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
  <div class="details-page">

    <button id="backBtn">⬅ Back</button>

    <div class="details-container">

      <div class="details-left">
        <img src="${hero.images.lg}" alt="${hero.name}" />
      </div>

      <div class="details-right">
        <h1>${hero.name}</h1>

        <p><strong>Full Name:</strong> ${hero.biography.fullName || "Unknown"}</p>
        <p><strong>Publisher:</strong> ${hero.biography.publisher}</p>

        <h2>Power Stats</h2>

        <div class="stat">
          <span>Intelligence</span>
          <div class="bar"><div style="width:${hero.powerstats.intelligence}%"></div></div>
        </div>

        <div class="stat">
          <span>Strength</span>
          <div class="bar"><div style="width:${hero.powerstats.strength}%"></div></div>
        </div>

        <div class="stat">
          <span>Speed</span>
          <div class="bar"><div style="width:${hero.powerstats.speed}%"></div></div>
        </div>

        <div class="stat">
          <span>Durability</span>
          <div class="bar"><div style="width:${hero.powerstats.durability}%"></div></div>
        </div>

        <div class="stat">
          <span>Power</span>
          <div class="bar"><div style="width:${hero.powerstats.power}%"></div></div>
        </div>

        <div class="stat">
          <span>Combat</span>
          <div class="bar"><div style="width:${hero.powerstats.combat}%"></div></div>
        </div>

      </div>
    </div>
  </div>
`;

  document.getElementById("backBtn").addEventListener("click", () => {
    location.reload(); // simple for now
  });
}

// filterheroes my affiliations
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    const value = btn.dataset.value;

    filterHeroes(type, value);
  });
});
function filterHeroes(type, value) {
  if (!type) {
    displayResult(allHeroes);
    return;
  }

  let filtered = [];

  if (type === "team") {

    const keyword = value === "xmen" ? "x-men" : value;

    filtered = allHeroes.filter(hero =>
      hero.connections.groupAffiliation?.toLowerCase().includes(keyword)
    );
  }

  else if (type === "alignment") {

    filtered = allHeroes.filter(hero =>
      hero.biography.alignment?.toLowerCase() === value
    );
  }

  displayResult(filtered);
}

loadHeroes();