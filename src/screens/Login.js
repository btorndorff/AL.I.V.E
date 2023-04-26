import React, { useEffect, useState } from "react";
import logo from "../images/aliveicon.png"


const Login = (props) => {
    return (
        <div className="full">
            <div className="collection-container">
                <div className="d-flex flex-column justify-content-center align-items-center m-2">
                    <img src={logo} className="mw-100"/>
                    <h2>AL.I.V.E</h2>
                    <button onClick={() => props.login()}>Sign in with Google <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" style={{height:"10%", width:"10%"}}/></button>
                </div>
            </div>

        </div>
    )

};

export default Login;