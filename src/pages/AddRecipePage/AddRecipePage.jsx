import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../assets/components/NavBar/NavBar";
import { addRecipe, getRecipe } from "../../service/recipeService";
import "./AddRecipePage.scss";
import { getUser } from "../../service/userService";

function AddRecipePage(){

    const idUser = localStorage.getItem('idUser');
    const [recipe, setRecipe] = useState({
        idUser: idUser,
        recipeName: "",
        ingredients: "",
        prepTime: "",
        foodType: "",
        difficulty: "Fácil",
        method: "",
        image: null, // Para armazenar a imagem.
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setRecipe({ ...recipe, [event.target.name]: event.target.value });
        console.log(recipe)
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setRecipe({ ...recipe, [event.target.name]: file });
        }
        console.log(recipe)
      };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        setIsSubmitting(true); 

        /* Create FormData to send image and recipe data*/
        const formData = new FormData();
        Object.keys(recipe).forEach((key) => {
            formData.append(key, recipe[key]);
        });

        try {
            const response = await addRecipe(formData);
            console.log(response.data)

            setIsSubmitting(false); 
        } catch (error) {
            console.log(error);
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="d-flex">
            <div style={{ width: '10%' }}></div>

            {/* Central area of the page */}
            <div style={{ width: '80%' }} className="d-flex flex-column">
                <NavBar />

                <h3> Adicione sua receita preenchendo as informações abaixo </h3>
                <form className="d-flex flex-column gap-1" onSubmit={handleSubmit}>
                    <label>Nome da Receita</label>
                    <input type="text" name="recipeName" onChange={handleChange} 
                    maxLength={50} placeholder="Ex: Torta de Maçã" required/>

                    <label>Ingredientes</label>
                    <input type="text" name="ingredients" onChange={handleChange}
                     maxLength={500} placeholder="Ex: 100mL de Leite, 250g de Açucar, 2g de fermento" required/>

                    <label>Tempo de preparo</label>
                    <input type="text" name="prepTime" onChange={handleChange}
                     maxLength={20} placeholder="Ex: 1 h, 20 min" required/>

                    <label>Tipo de Comida</label>
                    <input type="text" name="foodType" onChange={handleChange}
                     maxLength={50} placeholder="Ex: Sobremesa"/>

                    <label>Dificuldade</label>
                    <span>
                        <input type="radio" name="difficulty" value="Fácil" onClick={handleChange} checked={recipe.difficulty === "Fácil"}/> Fácil
                        <input type="radio" name="difficulty" value="Médio" onClick={handleChange} checked={recipe.difficulty === "Médio"}/> Médio
                        <input type="radio" name="difficulty" value="Difícil" onClick={handleChange} checked={recipe.difficulty === "Difícil"}/> Difícil
                    </span>

                    <div className="d-flex flex-column">
                        <label>Modo de preparo</label>
                        <textarea name='method'
                        maxLength={2500} 
                        placeholder="Ex: 
                        1. Separe 1/4 de xícara de amido de milho
                        2. Misture com 100mL de leite
                        3. Leve ao forno por 30 minutos a 100ºC" 
                        onChange={handleChange} className="p-2 pb-5 mb-3" required/>
                    </div>

                    <label>Insira uma imagem para sua receita</label>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} required/>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning btn-lg my-4 py-3" disabled={isSubmitting}>
                            {isSubmitting ? "Enviando..." : "Adicionar Receita"}
                        </button>
                    </div>
                </form>                
                
                
                
                
            </div>

            <div style={{ width: '10%' }}></div>
        </div>
    );
};

export default AddRecipePage;