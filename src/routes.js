import React from 'react';
import {
    BrowserRouter,
    Routes as Switch,
    Route
  } from "react-router-dom";
import HomePage from './pages/HomePage';



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/chuck-norris' element={HomePage} />
            <Route path='/' element={HomePage} />
        </Switch>
    </BrowserRouter>
)

export default Routes;