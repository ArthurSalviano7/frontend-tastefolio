import axios from 'axios'

const commentsUrl = "https://tastefolio.onrender.com/comments"

export async function getAllCommentsById(id){
    try {
        const response = await axios.get(`${commentsUrl}/${id}`);
        return response; 
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
      } 
}

export async function submitComment(idRecipe, idUser, text){
  try {
      const data = {
        "idRecipe": idRecipe,
        "idUser": idUser,
        "text": text
      }

      const response = await axios.post(commentsUrl, data);
      
      return response; 
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.message);
    } 
}