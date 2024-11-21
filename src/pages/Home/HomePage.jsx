import React, { useEffect } from "react";
import { useState } from "react"
import NavBar from "../../assets/components/NavBar/NavBar";
import RecipeBox from "../../assets/components/RecipeBox/RecipeBox";
import RecipeList from "../../assets/components/RecipeList/RecipeList";
import "./HomePage.scss";
import {getAllRecipes} from "../../service/recipeService";

function HomePage(){

    const [recipes, setRecipes] = useState([]);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getAllRecipes();
                setRecipes(response.data.data); // Atualiza o estado com as receitas
                console.log("Receitas carregadas:", response.data.data);
                console.log("Receitas Nome:", response.data.data[0].recipeName);
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
                <RecipeBox />
                <div id="recipe-section" className="py-5 recipe-section">
                    <h1> Descubra, crie e compartilhe</h1>
                    <h4 style={{color: '#d1782b'}}> Explore alguma das receitas da nossa página </h4>
                </div>
                <RecipeList recipes={recipes} />
            </div>

            <div style={{ width: '10%' }}></div>
        </div>
    );
};

export default HomePage;