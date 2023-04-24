import React, { useEffect, useState } from "react";
import logo from "../images/aliveicon.png"


const LanguageSelect = (props) => {
    return (
        <div className="full">
            <div className="collection-container">
                <div className="d-flex flex-column justify-content-center align-items-center m-2">
                    <img src={logo} />
                    <h2>What language do you want to learn?</h2>
                    <div className="language-select">
                        {/* <label htmlFor="language">Select a language: </label> */}
                        <select id="language" onChange={props.handleLanguageChange}>
                            <option value="BG">Bulgarian</option>
                            <option value="CS">Czech</option>
                            <option value="DA">Danish</option>
                            <option value="DE">German</option>
                            <option value="EL">Greek</option>
                            <option value="EN">English</option>
                            <option value="ES">Spanish</option>
                            <option value="ET">Estonian</option>
                            <option value="FI">Finnish</option>
                            <option value="FR">French</option>
                            <option value="HU">Hungarian</option>
                            <option value="ID">Indonesian</option>
                            <option value="IT">Italian</option>
                            <option value="JA">Japanese</option>
                            <option value="KO">Korean</option>
                            <option value="LT">Lithuanian</option>
                            <option value="LV">Latvian</option>
                            <option value="NB">Norwegian</option>
                            <option value="NL">Dutch</option>
                            <option value="PL">Polish</option>
                            <option value="PT">Portuguese</option>
                            <option value="RO">Romanian</option>
                            <option value="RU">Russian</option>
                            <option value="SK">Slovak</option>
                            <option value="SL">Slovenian</option>
                            <option value="SV">Swedish</option>
                            <option value="TR">Turkish</option>
                            <option value="UK">Ukrainian</option>
                            <option value="ZH">Chinese</option>
                        </select>
                    </div>
                    <button onClick={() => console.log("click")}>Start!</button>
                    
                    <h2>AL.I.V.E</h2>
                    <button onClick={() => props.login()}>Sign in with Google <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" style={{ height: "10%", width: "10%" }} /></button>
                </div>
            </div>

        </div>
    )

};

export default LanguageSelect;