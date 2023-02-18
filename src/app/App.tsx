import React from 'react';
import './App.css';
import ButtonAppBar from "../components/Button/ButtonAppBar";
import {Container} from "@mui/material";

import TodolistsList from "../components/TodolistsList/TodolistsList";


function App() {

    return (

        <div className="App">
            <Container fixed>
                <ButtonAppBar/>
                <TodolistsList/>
            </Container>
        </div>
    );
}



export default App;


