import React, { useState } from "react";
import axios from "axios";
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("JA");
    const [result, setResult] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [uploadMode, setUploadMode] = useState(false);

    const [picture, setPicture] = useState('')
    const webcamRef = React.useRef(null)

    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
        // console.log(pictureSrc)
    })

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // Read the file as a base64-encoded string
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = async () => {
            const base64Image = reader.result;
            setPicture(base64Image)
        };
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    // function translate(base64Image)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let base64Image = picture.split(",")[1]

        // if (picture != '') {
        //     base64Image = picture.split(",")[1];
        // } else {
        //     // Read the file as a base64-encoded string
        //     const reader = new FileReader();
        //     reader.readAsDataURL(selectedFile);
        //     reader.onload = async () => {
        //         base64Image = reader.result.split(",")[1];
        //     };
        // }

        // console.log(base64Image)

        try {
            // Send a POST request to the backend API to process the image
            // during testing change this to a localhost if modifying the backend
            const response = await axios.post(
                "https://alive-hci.uk.r.appspot.com/translate",
                {
                    image: base64Image,
                    language: selectedLanguage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update the state with the result
            setResult(response.data);

            // Display the submitted image
            const imagePreviewUrl = URL.createObjectURL(selectedFile);
            setImagePreviewUrl(imagePreviewUrl);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="Home">
            <form onSubmit={handleSubmit}>
                {!uploadMode ?
                    <div className="d-flex flex-column">
                        <button className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                setUploadMode(true)
                                setPicture('')
                                setImagePreviewUrl(null)
                                setResult(null)
                            }}>
                                Upload Instead
                        </button>

                        <div>
                            {picture == '' ? (
                                <Webcam
                                    audio={false}
                                    height={400}
                                    ref={webcamRef}
                                    width={400}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            ) : (
                                <img src={picture} />
                            )}
                        </div>

                        <div>
                            {picture != '' ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPicture('')
                                    }}
                                    className="btn btn-primary my-2"
                                >
                                    Retake
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        capture()
                                    }}
                                    className="btn btn-danger my-2"
                                >
                                    Capture
                                </button>
                            )}
                        </div>
                    </div>
                    :
                    <div className="d-flex flex-column">
                        <button className="btn btn-primary "
                            onClick={(e) => {
                                e.preventDefault()
                                setUploadMode(false)
                                setPicture('')
                                setImagePreviewUrl(null)
                                setResult(null)
                            }}>
                                Capture Instead
                        </button>

                        {imagePreviewUrl && (
                            <img src={imagePreviewUrl} alt="Selected File" style={{ width: "100%", maxWidth: "500px" }} />
                        )}
                        <div className="file-upload ">
                            <label htmlFor="image">Select an image: </label>
                            <input className="mx-2" type="file" id="image" onChange={handleFileChange} />
                        </div>
                        
                    </div>
                }

                <div>
                    <label htmlFor="language">Select a language: </label>
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

                <button className="button" type="submit">Submit</button>
            </form>

            {result && (
                <div>
                    <h2>Result:</h2>
                    <p>Classification: {result.classification}</p>
                    <p>Translation: {result.translation}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
