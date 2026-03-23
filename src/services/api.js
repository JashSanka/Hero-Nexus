const URL = "https://superheroapi.com/api.php";
const TOKEN = import.meta.env.VITE_API_token;
export async function searchHeroName(name){
    const response = await fetch(`${URL}/${TOKEN}/search/${name}`);
    const data=await response.json();
    return data
}

export async function searchHeroId(id){
    const response = await fetch(`${BASE_URL}/${TOKEN}/${id}`);
  const data = await response.json();
  return data;
}