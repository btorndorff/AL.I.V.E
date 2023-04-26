import React, { useEffect, useState } from "react";


const WordCard = (props) => {
    return (
        <div className="word-card" onClick={() => props.setResult({classification: props.classification, translation: props.translation, image: props.image, date: props.date, _id: props._id,sentences: props.sentences})}>
            <img src={props.image} alt="pic"/>
            <p className="translation">{props.translation}</p>
            <p>{props.classification}</p>
        </div>
    )

};

export default WordCard;