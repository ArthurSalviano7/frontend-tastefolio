import React, { useEffect } from "react";
import { useState } from "react"
import NavBar from "../../assets/components/NavBar/NavBar";
import RecipeList from "../../assets/components/RecipeList/RecipeList";
import {getAllFavorites, getAllRecipes, getRecipe} from "../../service/recipeService";

function Favorites(){
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const idUser = localStorage.getItem('idUser');

                if(idUser){
                    const response = await getAllFavorites(idUser);
                    const favoriteRecipes = response.data.data

                    /* get the recipes informations*/
                    const recipesDetails = await Promise.all(
                        favoriteRecipes.map(async (favorite) => {
                          const response = await getRecipe(favorite.idRecipe); // Calling getRecipe using id of recipe
                          return response.data.data[0]; 
                        })
                      );
              
                      setRecipes(recipesDetails); 
                }
            } catch (error) {
                console.error("Erro ao carregar receitas:", error.message);
            }
        }
        fetchRecipes();
    }, []);

    
    return (
        <div className="d-flex">
            <div style={{ width: '10%' }}></div>

            {/* Central area of the page */}
            
            <div style={{ width: '80%' }} className="d-flex flex-column">
                <NavBar />
                {recipes ? (
                    <>
                        <h2 className="mx-2">Favoritos</h2>
                        <RecipeList recipes={recipes} />
                    </>
                ) : (
                <div>Sem receitas favoritadas</div>
            )}
                
            </div>

            <div style={{ width: '10%' }}></div>
        </div>
    );
};

export default Favorites;