import axios from 'axios'

const userUrl = "https://tastefolio.onrender.com/users"

export async function getAllUsers(){
    try {
        const response = await axios.get(userUrl);
        console.log(response);
        
        return response;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
      }
    
}

export async function register(user){
    try {
        const response = await axios.post(userUrl, user, {
            validateStatus: (status) => {
            // Permite que o Axios não lance erros para status entre 400 e 500
            return status >= 200 && status < 500;
        }
        });
        console.log(response);
        
        
        return response;
      } catch (error) {
        console.error("Erro ao registrar usuário:", error.message);
      }
    
}

export async function getUser(id){
    try {
        const response = await axios.get(`${userUrl}/${id}`);
        console.log(response);
        
        return response;
      } catch (error) {
        console.error("Usuário não encontrado:", error.message);
      }
    
}