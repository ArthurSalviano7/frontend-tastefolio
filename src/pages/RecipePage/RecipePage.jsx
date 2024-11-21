import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../assets/components/NavBar/NavBar";
import { convertToShareableLink, getRecipe } from "../../service/recipeService";
import "./RecipePage.scss";
import { getAllCommentsById, submitComment } from "../../service/commentsService.";
import { getUser } from "../../service/userService";
import CommentsSection from "./CommentSection";

function RecipePage(){
    const { id } = useParams(); // ID of recipe on URL
    const [recipe, setRecipe] = useState('');
    const [comments, setComments] = useState(null);
    const [users, setUsers] = useState(null);
    const [inputComment, setInputComment] = useState(''); // The user input on comment section

    const navigate = useNavigate();

    const handleChange = (event) => {
        setInputComment(event.target.value);
    };

    const handleSubmitComment = async (event) => {
        try {
            const idUser = localStorage.getItem('idUser');
            console.log("VALOR:", idUser)
            /* Submit if user is logged in */
            if (idUser) {
                const response = await submitComment(id, idUser, inputComment); // Submit the comment on recipe by idRecipe and idUser 
                await fetchComments();
                return response
            }
            navigate('/login'); //Redirect to login page if not authenticated
          } catch (error) {
            console.error("Erro ao enviar comentário:", error);
          }
    };

    const handleComment = async () => {
            try {
                const response = await getAllCommentsById(id); // Return all recipes by idRecipe
                console.log(response.data.data);
                setComments(response.data.data);
                await fetchComments(); // Update comments on page
              } catch (error) {
                console.error("Erro ao buscar comentários:", error);
              }
        };
        
    const fetchComments = async () => {
        try {
            const response = await getAllCommentsById(id); // Return all recipes by idRecipe
            console.log(response.data.data);
            setComments(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const response = await getRecipe(id); // URL do backend que retorna a receita por ID
            console.log(response.data.data[0]);
            setRecipe(response.data.data[0]);
          } catch (error) {
            console.error("Erro ao buscar receita:", error);
          }
        };
        
        fetchComments();
        fetchRecipe();
      }, [id]); // Sempre que comments mudar, refaz a requisição
    
    // Verifique se a receita foi carregada antes de tentar acessar a URL da imagem e outros dados
    if (!recipe) {
        return <div>Carregando receita...</div>; 
    }

    const newimageURL = convertToShareableLink(recipe.imageURL);

    return (
        <div className="d-flex">
            <div style={{ width: '10%' }}></div>

            {/* Central area of the page */}
            <div style={{ width: '80%' }} className="d-flex flex-column">
                <NavBar />

                <img src={newimageURL} alt={recipe.recipeName} className="image-container"/> 
                
                
                <h1 className="d-flex justify-content-center py-2">{recipe.recipeName}</h1>
                
                <h3>INGREDIENTES</h3>
                
                <div className="row py-3" >
                    {recipe.ingredients.split(',').map((ingredient) => (
                        <div className="col-12 col-md-6 col-lg-4 p-2"> {/* 3 columns desktop, 2-md 1-sm*/}
                            <ul className="list-group">
                            <li className="list-group-item custom-border">{ingredient.trim()}</li>
                            </ul>
                        </div>
                    ))}   
                </div>

                <h3 className="py-3">MODO DE PREPARO</h3>
                
                <div className="div-method p-3 m-0">
                    <pre>{recipe.method}</pre> {/* <pre> tag to mantain line break*/}
                </div>
                
                <h3 className="py-3">COMENTÁRIOS</h3>
                
                <div className="d-flex flex-column div-input-comment ">
                    <textarea name='comment' placeholder="Insira um comentário!" onChange={handleChange} className="p-2" />
                    <button className="btn btn-secondary btn-md vh-10" onClick={handleSubmitComment}> Comentar </button>
                </div>
                
                <CommentsSection comments={comments} />

                
            </div>

            <div style={{ width: '10%' }}></div>
        </div>
    );
};

export default RecipePage;