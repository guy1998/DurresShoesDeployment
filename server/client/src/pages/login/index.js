import React from "react";
import "./login-styles.css";
import LoginForm from "./login";

function LoginPage(){
    return(
        <div className="login-page">
            <div className="brand-panel">
                <div className="brand-circle brand-circle-1"></div>
                <div className="brand-circle brand-circle-2"></div>
                <div className="brand-circle brand-circle-3"></div>
                <div className="brand-circle brand-circle-4"></div>
                <div className="brand-content">
                    <h1 className="brand-name">Tenerife</h1>
                    <h2 className="brand-name-sub">Shoes</h2>
                    <p className="brand-tagline">Your premium footwear destination</p>
                </div>
            </div>
            <div className="form-panel">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;
