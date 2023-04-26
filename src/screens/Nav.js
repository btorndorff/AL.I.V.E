import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import x from "../images/Vector.png"
// import community from "../images/community.png"
// import home from "../images/home.png"
// import collection from "../images/collection.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Nav = (props) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate("/alive-frontend");
        props.logOut()
    }

    const handleLanguageChange = (event) => {
        props.setSelectedLanguage(event.target.value);
        console.log(props.id)
        axios.put(`https://alive-hci.uk.r.appspot.com/user/${props.id}`, { language: event.target.value })
            .then(response => {
                console.log(response.data.message);
                
                // handle successful response
            })
            .catch(error => {
                console.error(error);
                // handle error
            });
    };

    return (
        <div className="full">
            <div className="collection-container">
                <div className="d-flex flex-column justify-content-end h-100">
                    <div className="d-flex flex-column justify-content-center align-items-center m-2">
                        <p className="fs-2 m-0">{props.name}</p>
                        <div className="language-select">
                            <label className="text-dark m-1" htmlFor="language">Change Language: </label>
                            <select id="language" onChange={handleLanguageChange} value={props.selectedLanguage}>
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
                            {/* <p className="text-dark">{props.selectedLanguage}</p> */}
                        </div>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-danger mb-3"
                        >
                            LOGOUT
                        </button>
                        <div className="line"></div>
                        <div onClick={() => props.setNav(false)} className="text-decoration-none text-dark fs-3 d-flex justify-content-center align-items-center">
                            {/* <img className="h-55 mx-1" src={home}/> */}
                            <p className="m-0 mb-3 mt-3">Home</p>
                        </div>
                        <Link to="/collection" className="text-decoration-none text-dark fs-3 d-flex justify-content-center align-items-center">
                            {/* <img className="h-55 mx-1" src={collection}/> */}
                            <p className="m-0 mb-3">Collection</p>
                        </Link>
                        <a className="text-decoration-none text-dark fs-3 mb-3" href="https://www.figma.com/proto/ws7kCkd8p7azKV5WLZK99i/Tigers-Prototype?node-id=216-704&scaling=scale-down&page-id=0%3A1&starting-point-node-id=216%3A728&show-proto-sidebar=1">Community</a>
                    </div>

                    <div className="mt-auto align-self-center mb-5" onClick={() => props.setNav(false)}>
                        <img src="https://icons-for-free.com/iconfiles/png/512/x+icon-1320166903649367557.png" className="x" />
                    </div>
                    {/* <button className="mt-auto m-3" onClick={() => props.setNav(false)}>close</button> */}
                </div>
            </div>
        </div>

    )

};

export default Nav;