import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import "./Login.css"

export default function Login() {
    const [urlUser, setUrlUser] = useState("http://localhost:8000/api/token/");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentScreen, setCurrentScreen] = useState("Login");
    const [postOk, setPostOk] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate();


    function SignUP() {
        if (!postOk) {
          return <p>Você ainda não está cadastrado!</p>;
        }
      }

    const login = (event) => {
        event.preventDefault();
        console.log('currentScreen');
        console.log(currentScreen);

        if(currentScreen==='Login'){
            setUrlUser("http://localhost:8000/api/token/");
            setHasToken(true);
        } else {
            setUrlUser("http://localhost:8000/api/users/");
        }

        const userInfo = {
            "username": username,
            "email": email,
            "password": password
          };
        
        console.log('Url user')
        console.log(urlUser);

        axios
            .post(urlUser, userInfo)
            .then((response) => {
                setPostOk(true); 
                if(currentScreen==="Login"){
                    const token = response.data.token;
                    localStorage.setItem('token', true);
                    console.log(token);
                    navigate('/chat');
                }
                }
                )
            .catch((error) => setPostOk(false));
        };

    return (
        <div className="content">
            {currentScreen==="Login" ? (
                <><h4>Login</h4>
                <form onSubmit={login}>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>User</label>
                        </div>
                        <div className="col-md-9">
                            <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>Password</label>
                        </div>
                        <div className="col-md-9">
                            <input type="password" value={password} className="form-control" onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <input type="submit" value="Login" />
            </form><button onClick={() => setCurrentScreen("Cadastro")  }>Ainda não é cadastrado? clique aqui!</button>
            <SignUP/>
            </>
                
                ) : (
                    <><h4>Cadastro</h4>
                    <form>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>User</label>
                        </div>
                        <div className="col-md-9">
                            <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>Email</label>
                        </div>
                        <div className="col-md-9">
                            <input type="password" value={email} className="form-control" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>Password</label>
                        </div>
                        <div className="col-md-9">
                            <input type="password" value={password} className="form-control" onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <button onClick={login}>Cadastrar</button>
                </form><button onClick={() => {setCurrentScreen("Login")}}>Fazer login</button></>  
                )}
        </div>
    )
}