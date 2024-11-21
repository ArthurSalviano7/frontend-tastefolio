import React from "react";
import { useState } from "react";
import "./RecipeBox.scss";
import recipeImg from "../../images/recipe-box.jpg";
import { FaArrowRight } from "react-icons/fa";

function RecipeBox(){

    return (
        <div className="container-fluid">
            <div className="row"> 
                <div className="col-12 col-md-7 px-0 mx-0">
                    <img src={recipeImg} alt="" className="image"/>
                </div>
                
                <div className="col-12 col-md-5 box-text px-5 py-5">
                    <h1>Bolo de Rolo</h1>
                    <p>Uma verdadeira delícia da culinária pernambucana!  Com sua textura leve e sabor marcante, 
                        esse doce é perfeito para acompanhar um café ou surpreender em ocasiões especiais.</p>
                    <div className="d-flex justify-content-end">
                        <FaArrowRight size={30} />
                    </div>
                </div>
                
                
            </div>
            
        </div>
    );
};

export default RecipeBox;