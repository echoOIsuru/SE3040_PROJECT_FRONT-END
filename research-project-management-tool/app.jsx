import React from "react";
import { createRoot } from "react-dom/client";
import App from './Main'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(
    document.getElementById('app')
).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);