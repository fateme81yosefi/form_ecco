import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from "./Details";

export default function Home() {
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<A />}></Route>
            <Route path='/products/:id' element={<Details />}></Route>
        </Routes>
    </BrowserRouter>
}