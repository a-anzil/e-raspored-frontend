import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Root } from "./pages/root";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { User } from "./pages/user";

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" index element={<Root/>}/>
                    <Route path="/user" element={<User/>}/>
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("root")
);


const workerPath = `${process.env.PUBLIC_URL}/worker.js`;
if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        await navigator.serviceWorker.register(workerPath);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
