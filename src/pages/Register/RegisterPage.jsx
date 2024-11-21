import React from "react";
import { useState } from "react"
import loginImg from "../../assets/images/food-img2.jpg"
import "../Login/LoginPage.scss"

import RegisterForm from "./RegisterForm";

function RegisterPage(){
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4">
                    <RegisterForm />
                </div>
                <div className="col-12 col-md-8 d-none d-md-block position-relative">
                    <img src={loginImg} className="login-img" alt="" />
                    <div className="img-container" hidden></div>

                    
                    <div className="row">
                        <div className="col-6">
                        </div>
                        <div className="col-6">
                            <h1 className="img-title">Descubra Novos<br/>Sabores</h1>
                            <h3 style={{color: "#F5B120", fontFamily: 'Dancing Script'}}><br/>Explore, compartilhe e aprenda</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;