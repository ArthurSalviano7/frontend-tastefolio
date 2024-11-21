import axios from 'axios'

const recipesUrl = "https://tastefolio.onrender.com/recipes"
const favoriteUrl = "https://tastefolio.onrender.com/favorites"

export async function getAllRecipes(){
    try {
        const response = await axios.get(recipesUrl);
        console.log(response);
        
        return response;
      } catch (error) {
        console.error("Erro ao buscar as receitas:", error.message);
      }
}

export async function getRecipe(id){
  try {
      const response = await axios.get(`${recipesUrl}/${id}`);
      
      return response;
    } catch (error) {
      console.error("Erro ao buscar receita por id:", error.message);
    }
}

export async function addRecipe(data){
  try {
      const response = await axios.post(recipesUrl, data);
      
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita!", error.message);
    }
}

export async function addFavorite(data){ //data = {idUser, idRecipe}
  try {
      const response = await axios.post(favoriteUrl, data);
      
      return response;
    } catch (error) {
      console.error("Erro ao favoritar receita!", error.message);
    }
}


export async function removeFavorite(data){ //data = {idUser, idRecipe}
  try {
      const response = await axios.put(favoriteUrl, data);
      
      return response;
    } catch (error) {
      console.error("Erro ao deletar favorito!", error.message);
    }
}

export async function getAllFavorites(id){ 
  try {
      const response = await axios.get(`${favoriteUrl}/${id}`);
      
      return response;
    } catch (error) {
      console.error("Erro ao buscar favoritos!", error.message);
    }
}

export function convertToShareableLink(imageURL) {
    // Extrai o ID do arquivo da URL 
    // "https://drive.google.com/uc?export=view&id=1iSi_Byj"   ==>  1iSi_Byj
    const regex = /(?:id=|\/d\/)([a-zA-Z0-9_-]+)/;
    const match = imageURL.match(regex);
  
    if (match && match[1]) {
      const fileId = match[1];
      // Retorna o link compartilhável no formato desejado
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    } else {
      throw new Error("URL inválida ou ID não encontrado.");
    }
  }
