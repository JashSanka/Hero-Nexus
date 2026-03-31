const URL = "https://akabab.github.io/superhero-api/api/all.json";

export async function getAllHeroes(){
  const res=await fetch(URL);
  const data=await res.json();
  return data;

}
