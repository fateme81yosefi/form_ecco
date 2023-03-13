import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function Home() {
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<EmpListing />}></Route>
            <Route path='/products/detail/:empid' element={<EmpDetail />}></Route>
        </Routes>
    </BrowserRouter>
}