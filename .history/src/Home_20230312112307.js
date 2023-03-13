import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from "./App";
import Details from "./Details";

export default function Home() {
   re <BrowserRouter>
        <Routes>
            <Route path='/'><App /></Route>
            <Route path='/products/:id' ><Details /></Route>
        </Routes>
    </BrowserRouter>
}