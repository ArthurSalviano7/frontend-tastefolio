import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/LoginPage.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { register } from "../../service/userService";

function RegisterForm(){
    const [viewToggle, setViewToggle] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);

    const [user, setUser] = useState({
        name: '',
        nickname: '',
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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        try {
            const { data, status } = await register(user);

            if (status >= 200 && status < 300) {
                console.log(data.data)
                localStorage.setItem('idUser', data.data.id);
                navigate("/");
            } else if (status === 400) { // Código de status HTTP 400 para email já está cadastrado
                setErrorMessage("Esse email já possui cadastro");
            } else {
                console.error("Erro ao registrar usuário:", data.message);
                setErrorMessage("Erro ao registrar usuário");
            }
            
        } catch (error) {   
            console.log(error);
        }
    };

    return (
        <div className="login-form">
            <h1 className="text-center pt-2 login-title">Registre-se</h1>
            <p className="text-center">Preencha as informações abaixo para criar sua conta</p>
            {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

            <form action="" className="p-2 pt-2 pb-3">
                <label>Nome:</label> <br />
                <input type="text" name="name" onChange={handleChange} 
                className="d-grid col-12 py-1 my-2 border-1 border-light-subtle" 
                placeholder="Insira seu nome" required/>

                <label>Nome do perfil (opcional):</label> <br />
                <input type="text" name="nickname" onChange={handleChange}  
                className="d-grid col-12 py-1 my-2 border-1 border-light-subtle" 
                placeholder="Ex: Receitas do João"/>
                
                <label>Email:</label> <br />
                <input type="text" name="email" onChange={handleChange}  
                className="d-grid col-12 py-1 my-2 border-1 border-light-subtle" 
                placeholder="Insira seu email" required/>
                
                <label>Senha:</label> <br />
                <div className="input-group">
                    <input type={viewToggle ? "text" : "password"} name="password" onChange={handleChange} 
                     className="col-10 py-1 my-2 border-1 border-light-subtle" 
                     placeholder="Insira sua senha" required/>
                    <button type="button" className="col-2 input-group-text py-1 my-2" onClick={togglePasswordVisibility}>
                        {viewToggle ? <FaRegEye className="mx-auto" size={22}/> :
                        <FaRegEyeSlash className="mx-auto" size={22}/>}
                    </button>
                </div>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-dark d-grid col-8 mx-auto">Criar Conta</button>
            </form>

            <p className="text-center" style={{fontSize: '0.8rem'}}>Já possui uma conta? <a href="/login">Entrar</a></p>
        </div>
    );
};

export default RegisterForm;