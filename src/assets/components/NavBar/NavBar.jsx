import React from "react";
import { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaStar, FaSearch} from "react-icons/fa";
import "./NavBar.scss"


function NavBar(){
    const navigate = useNavigate();

    // Função para rolar até a seção de receitas
    const scrollToRecipes = () => {
        const recipeSection = document.getElementById("recipe-section");
        if (recipeSection) {
            recipeSection.scrollIntoView({ behavior: "smooth" });
        }
        navigate('/');
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('idUser')
    };

    const handleStarClick = () => {
        const idUser = localStorage.getItem('idUser');
        if(idUser){
          return navigate('/favorites');
        }
        navigate('/login')
    }

    const handleAddRecipe = () => {
        const idUser = localStorage.getItem("idUser");
        if(idUser){
            navigate('/add')
        }
    };

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="container-fluid">
            <div className="row div-navbar">
                <div className="col-4 d-flex justify-content-start">
                    <h1 className="logo">Tastefolio</h1>
                </div>
                <div className="col-2">
                    <h3 onClick={scrollToRecipes}>Explorar</h3>
                </div>
                <div className="col-3">
                    <h3><a onClick={handleAddRecipe}>Adicionar receita</a></h3>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-end gap-5">
                        <li><FaSearch size={20}/></li>
                        <li><FaStar onClick={handleStarClick} size={20}/></li>

                        <div className="dropdown" ref={dropdownRef}>
                            <li><FaRegUserCircle onClick={toggleDropdown} size={20}/></li>
                            
                            {isOpen && (
                                <div className="d-flex flex-column dropdown-content p-2">
                                    <a href="/login">Login</a> 
                                    <a href="/register">Registre-se</a>
                                    <a href="#">Gerenciar conta</a>
                                    <a href="/" onClick={handleLogout}>Sair</a>
                                </div> )}
                        </div>
                        
                        
                    </div>
                </div>
            </div>  
            
        </div>
    );
};

export default NavBar;