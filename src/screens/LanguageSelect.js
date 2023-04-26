import React, { useEffect, useState } from "react";
import logo from "../images/aliveicon.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LanguageSelect = (props) => {
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        console.log("here")
        const response = await axios.post(
            "https://alive-hci.uk.r.appspot.com/users",
            {
                id: props.id,
                language: props.selectedLanguage
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(response)

        props.setFirstTimeUser(false)
    };

    const handleLanguageChange = (event) => {
        props.setSelectedLanguage(event.target.value);
    };

    return (
        <div className="full">
            <div className="collection-container">
                <div className="d-flex flex-column justify-content-center align-items-center m-2">
                    <img src={logo} className="mw-100" />
                    <h2 className="text-center">What language do you want to learn?</h2>
                    <div className="language-select">
                        {/* <label htmlFor="language">Select a language: </label> */}
                        <select id="language" onChange={handleLanguageChange}>
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
                    <button onClick={handleButtonClick} className="btn btn-success">Start!</button>
                </div>
            </div>
        </div>
    )

};

export default LanguageSelect;