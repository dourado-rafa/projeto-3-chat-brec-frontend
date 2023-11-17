import axios from "axios";
import { chatSocket, BackendLink } from "../../settings";

import React, { useEffect, useState } from "react";

import "./Header.css"

export default function Header(props) {

    return (
        <header>
            <img className="logo" src="./logo.png" alt="logo" />
        </header>
    );
}