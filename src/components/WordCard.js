import React, { useEffect, useState } from "react";


const WordCard = (props) => {
    return (
        <div className="word-card">
            <img src={props.image} alt="pic"/>
            <p className="translation">{props.translation}</p>
            <p>{props.classification}</p>
        </div>
    )

};

export default WordCard;