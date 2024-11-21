import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard"; // Componente de card da receita, que você ainda vai criar
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function RecipeList({ recipes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  // Calcular o índice das receitas que serão exibidas
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Funções para mudar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="recipe-list">
      <div className="row">
        {currentRecipes.map((recipe, index) => (
          
            <div className="col-12 col-md-4 py-2" key={index}>
                <RecipeCard recipe={recipe} />
            </div>
        ))}
      </div>

      {/* Navegação de Páginas */}
      <div className="pagination d-flex align-items-center justify-content-center py-5 gap-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="btn  btn-outline-dark"> {/* desativa se estiver na primeira p´agina */}
          <IoIosArrowBack color="#F57020"/>
        </button>
        <span>{`Página ${currentPage}`}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(recipes.length / recipesPerPage)} className="btn  btn-outline-dark">
          <IoIosArrowForward color="#F57020"/>
        </button>
      </div>
    </div>
  );
}

export default RecipeList;