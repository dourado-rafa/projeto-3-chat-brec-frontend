import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css"

export default function Login() {
    let urlUser = "http://localhost:8000/api/token/";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentScreen, setCurrentScreen] = useState("Login");
    const [postOk, setPostOk] = useState(true);
    const [signedUp, setSignedUp] = useState(false);
    const navigate = useNavigate();

    function SignUp() {
        if (!postOk) {
            return <p className="sign-up-text">Usuário e/ou senha não encontrados!</p>;
        }
    }

    function SignedUp() {
        if (signedUp) {
            return <p className="signed-up-text">Usuário cadastrado com sucesso!</p>
        }
    }

    const login = (event) => {
        event.preventDefault();

        if (currentScreen === "Login") {
            urlUser = "http://localhost:8000/api/token/";
        } else {
            urlUser = "http://localhost:8000/api/users/";
        }

        const userInfo = {
            "username": username,
            "email": email,
            "password": password
        };


        axios
            .post(urlUser, userInfo)
            .then((response) => {
                setPostOk(true);
                if (currentScreen === "Login") {
                    const token = response.data.token;
                    sessionStorage.setItem("token", token);
                    navigate("/chat");
                } else {
                    setSignedUp(true);
                }
            }).catch((error) => {sessionStorage.setItem("token", false); setPostOk(false)});
    };

    return (
        <div className="content">
            {currentScreen === "Login" ? (
                <div className="box-login">
                    <h3>Login</h3>
                    <form className="box-form-login" onSubmit={login}>
                        <div className="box-input">
                            <label for="user">
                                Usuário
                            </label>
                            <input
                                className="input-text"
                                type="text"
                                id="user"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="box-input">
                            <label for="password">
                                Senha
                            </label>
                            <input
                                className="input-text"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <input
                            className="login-button"
                            type="submit"
                            value="Login"
                        />
                    </form>
                    <span>
                        Ainda não é cadastrado?
                        <button className="redirect" onClick={() => setCurrentScreen("Cadastro")}>Clique aqui!</button>
                    </span>
                    <SignUp />
                </div>
            ) : (
                <div className="box-signup">
                    <h3>Cadastro</h3>
                    <form className="box-form-signup" onSubmit={login}>
                        <div className="box-input">
                            <label for="user">Usuário</label>
                            <input
                                className="input-text"
                                id="user"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="box-input">
                            <label for="email">E-mail</label>
                            <input
                                className="input-text"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="box-input">
                            <label for="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                className="input-text"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <input
                            className="signup-button"
                            type="submit"
                            onChange={(event) => setSignedUp(true)}
                            value="Cadastrar"
                        />
                    </form>
                    <span>
                        Já tem uma conta?
                        <button className="redirect" onClick={() => { setCurrentScreen("Login") }}>Faça login!</button>
                    </span>
                    <SignedUp />
                </div>
            )}
        </div>
    )
}