import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./LoginPage.scss"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getAllUsers } from "../../service/userService";

function LoginForm(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);
    const [viewToggle, setViewToggle] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const togglePasswordVisibility = () => {
        setViewToggle(prevState => !prevState); // Alterna entre true e false
    };

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log(user)
    };

    const login = (usersList) => {
        for (const data of usersList) {
            // Verifica se o nome de usuário e senha correspondem
            if (data.email === user.email && data.password === user.password) {
                localStorage.setItem('idUser', data.id);
                console.log(data.id)
                return true;
            }
        }
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        try {
            const { data } = await getAllUsers();
            const usersList = data.data;

            if( login(usersList) ){
               navigate("/"); // Leva para página principal após o Login
            }else{
                setErrorMessage('Usuário ou senha incorretos. Por favor, tente novamente.');
            }
            
        } catch (error) {
            
            console.log(error);
        }
    };

    return (
        <div className="login-form">
            <h1 className="text-center pt-5 login-title">Bem Vindo ao TasteFolio</h1>
            <p className="text-center">Insira seu email e senha para acessar a plataforma</p>
            {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

            <form action="" className="p-2 pt-5 pb-3">
                <label>Email:</label> <br />
                <input type="text" name="email" value={user.email} onChange={handleChange} className="d-grid col-12 py-1 my-2 border-1 border-light-subtle" placeholder="Insira seu email" />
                
                <label>Senha:</label> <br />
                <div className="input-group">
                    <input type={viewToggle ? "text" : "password"} 
                    className="col-10 py-1 my-2 border-1 border-light-subtle"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Insira sua senha" />

                    <button type="button" className="col-2 input-group-text py-1 my-2" onClick={togglePasswordVisibility}>
                        {viewToggle ? <FaRegEye className="mx-auto" size={22}/> :
                        <FaRegEyeSlash className="mx-auto" size={22}/>}
                    </button>
                </div>
                
                <p className="text-end" style={{fontSize: '0.7rem'}}><a href="">Esqueceu a senha?</a></p>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-dark d-grid col-8 mx-auto">Entrar</button>
            </form>

            <p className="text-center" style={{fontSize: '0.7rem'}}>Não possui uma conta?<a href=""> Registre-se</a></p>
        </div>
    );
};

export default LoginForm;