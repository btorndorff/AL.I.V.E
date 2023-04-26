import React, { useEffect, useState } from "react";
import menu from "../images/menu.png"
import WordCard from "../components/WordCard";
import { Link } from 'react-router-dom';
import axios from "axios"

const Collection = (props) => {
    const [collectionData, setCollectionData] = useState([])
    const [result, setResult] = useState(null)
    const [sentence, setSentence] = useState("")

    //https://alive-hci.uk.r.appspot.com/collection
    //http://alive-hci.uk.r.appspot.com/collection/${props.id}
    useEffect(() => {
        fetch(`http://alive-hci.uk.r.appspot.com/collection/${props.id}`)
            .then((response) => response.json())
            .then((data) => setCollectionData(data));
    }, [])

    useEffect(() => {
        fetch(`http://alive-hci.uk.r.appspot.com/collection/${props.id}`)
            .then((response) => response.json())
            .then((data) => setCollectionData(data));
    }, [result])

    const handleAddSentence = (e, wordId) => {
        console.log(wordId);
        e.preventDefault();
        // const sentence = e.target.sentence.value;
        axios
            .put(`http://alive-hci.uk.r.appspot.com/collection/add-sentence/${wordId}`, {
                sentence,
            })
            .then(({ data }) => {
                setResult(prevResult => {
                    const newSentences = Array.isArray(prevResult.sentences) ? [...prevResult.sentences, sentence] : [sentence];
                    return {
                        ...prevResult,
                        sentences: newSentences
                    }
                });
                // e.target.sentence.value = "";
                setSentence("")
            })
            .catch((err) => console.error(err));
    };


    const collectionElements = collectionData.map(word => <WordCard key={word._id} {...word} setResult={setResult} />)

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

                    {result ?
                        <div className="no-touch">
                            <div className="pop-up flex-column" onClick={e => e.preventDefault()}>
                                <div className="info">
                                    <img src={result.image} />
                                    <div className="word-info">
                                        <p>{result.translation}</p>
                                        <p>{result.classification}</p>
                                        <p className="mt-2 text-primary">{new Date(result.date).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                                    </div>
                                </div>

                                <form onSubmit={(e) => handleAddSentence(e, result._id)}>
                                    <label htmlFor="sentence">Add sentence:</label>
                                    <input onChange={e => setSentence(e.target.value)} value={sentence} type="text" name="sentence" id="sentence" />
                                    <button onClick={(e) => handleAddSentence(e, result._id)} type="submit">Submit</button>
                                </form>

                                <div>
                                    {result.sentences && result.sentences.length > 0 ?
                                        result.sentences.map((sentence, index) => <p key={index}>{sentence}</p>) :
                                        <p>No sentences yet.</p>
                                    }
                                </div>
                                <button className="btn btn-danger m-4 mt-0" onClick={() => setResult(null)}>Close</button>

                            </div>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )

};

export default Collection;