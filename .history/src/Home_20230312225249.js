import React from "react";
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import App from "./App";
import Details from "./Details";
import { EditedObjProvider } from "./shared/Shared";

export default function Home() {
    return (<EditedObjProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/products/:id' element={<Details />}></Route>
                <Route
                    path="/redirect"
                    element={ <Navigate to="/" /> }
                />
            </Routes>
        </BrowserRouter>
    </EditedObjProvider>)
}