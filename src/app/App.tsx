import React from 'react';
import './App.css';
import ButtonAppBar from "../components/Button/ButtonAppBar";
import {Container} from "@mui/material";

import TodolistsList from "../components/TodolistsList/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";


function App() {

    return (

        <div className="App">
            <Container fixed>
                <ButtonAppBar/>
                <TodolistsList/>
                <CustomizedSnackbars/>
            </Container>
        </div>
    );
}



export default App;


