import React from "react";
import { useState } from "react";
import  { useNavigate, Link } from "react-router-dom";
import './RecipeCard.scss';
import { addFavorite, convertToShareableLink, getAllFavorites, removeFavorite } from "../../../service/recipeService";
import { FaRegStar, FaStar, FaArrowRight } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { BsBarChart } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


function RecipeCard({ recipe }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const {id, recipeName, imageURL, prepTime, difficulty} = recipe;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFavorite = async () => {
        try {
            const idUser = localStorage.getItem('idUser');
            if (idUser) {
                const body = {
                    idUser,
                    idRecipe: id
                };
                console.log("idUser", idUser);
    
                // Verificar se já é favorito
                if (isFavorite) {
                    const response = await removeFavorite(body);
                    console.log(response.data);
                } else {
                    const response = await addFavorite(body);
                    console.log(response.data);
                }
    
                // Atualiza o estado do isFavorite
                setIsFavorite(!isFavorite);
            } else {
                navigate('/login'); // Se não estiver logado, redireciona para login
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddFavorite = async () => {
        try{
            const idUser = localStorage.getItem('idUser');
            if(idUser){
                const body = {
                    "idUser": idUser,
                    "idRecipe": id
                }
                const response = await addFavorite(body);
                console.log(response.data);
                await fetchFavorites;
                return response;
            }

            navigate('/login'); // Redirect to login page if not LoggedIn
        }catch(error){
            console.log(error)
        }
        setIsHovered(true);
    };

    const fetchFavorites = async () => {
        try {
            const idUser = localStorage.getItem('idUser');
            if(idUser){
                const response = await getAllFavorites(idUser);
                const favoritesList = response.data.data;
                console.log("LISTA:", favoritesList);
                
                // Verify if the recipe is on list
                const isRecipeFavorite = favoritesList.some(fav => fav.idRecipe === id);
                setIsFavorite(isRecipeFavorite); // Set true or false according to verification
            }
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
        }
      };

    
    fetchFavorites();
    const newimageURL = convertToShareableLink(imageURL)

    return (
        <div className="recipe-card">
            {/* Cria um Link para cada receita no formato: /recipes/id */}
            <Link to={`/recipes/${recipe.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <img src={newimageURL} alt={recipeName} />  
            </Link>
            
            <div className="d-flex flex-inline align-items-baseline py-1 px-2 justify-content-between">
                <p>{prepTime}
                    <CiStopwatch size={25} color="#F57020"/>
                </p>
                <p>{difficulty}
                    <BsBarChart size={25} color="#F57020"/>
                </p>
                <div className="star-icon" onClick={handleFavorite} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {isFavorite || isHovered ? <FaStar size={25} color="#F57020" /> : <FaRegStar color="#F57020" size={25} />}
                </div>
            </div>

            <Link to={`/recipes/${recipe.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <h3 className="px-2">{recipeName}</h3>
                <div className="d-flex justify-content-end px-3 bg">
                    <p style={{color:"#F57020"}}>Ver receita</p>
                    <IoIosArrowForward size={30} color="#F57020"/>
                </div>
            </Link>
        </div>
    );
}


export default RecipeCard;