import axios from "axios";
import { chatSocket, BackendLink } from "../../settings";

import React, { useEffect, useState } from "react";
import Icon from "../Icon"

import "./Header.css"
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem('token', false);
        navigate('/');
    }

    return (
        <header>
            <img className="logo" src="./logo.png" alt="logo" />
            <a className="exit-button" onClick={logout} ><Icon name="logout" size={2} color="white"/></a>
        </header>
    );
}