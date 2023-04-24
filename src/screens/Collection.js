import React, { useEffect, useState } from "react";
import menu from "../images/menu.png"
import WordCard from "../components/WordCard";
import { Link } from 'react-router-dom';

const Collection = () => {
    const [collectionData, setCollectionData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/collection')
            .then((response) => response.json())
            .then((data) => setCollectionData(data));
    }, [])

    const collectionElements = collectionData.map(word => <WordCard key={word._id} {...word} />)


    return (
        <div className="full">
            <div className="collection-container">
                <div className="collection">
                    <div>
                        <Link to="/alive-frontend">
                            <img className="nav-menu-black" src={menu} />
                        </Link>

                    </div>

                    <div className="collection-list">
                        {collectionElements}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Collection;