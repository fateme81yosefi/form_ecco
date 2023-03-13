import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import App from "./App";
import Details from "./Details";

export default function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/products/:id' element={<Details />}></Route>

            </Routes>
        </BrowserRouter>
    )
}