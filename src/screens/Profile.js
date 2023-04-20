import React, { useEffect, useState } from "react";
import axios from "axios";
import Webcam from 'react-webcam'
import uploadButton from '../images/upload.png'
import cameraButton from '../images/camera.png'
import switchButton from '../images/switch.png'

const Screen = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [picture, setPicture] = useState('')
  const [facingMode, setFacingMode] = React.useState("user");
  const [selectedLanguage, setSelectedLanguage] = useState("BG");
  const [result, setResult] = useState(null);
  const webcamRef = React.useRef(null)

  const videoConstraints = {
    facingMode: "user",
    aspectRatio: 0.6666666667,
  };

  useEffect(() => {
    console.log("running")
    handleSubmit();
  }, [picture]);

  // handling the buttons
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
  })

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleFileChange = (event) => {
    // setSelectedFile(event.target.files[0]);
    // Read the file as a base64-encoded string
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async () => {
      const base64Image = reader.result;
      setPicture(base64Image)
    };

  };

  const handleSwitch = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === "user"
          ? "environment"
          : "user"
    );
  }, []);

  const handleSubmit = async () => {
    let base64Image = picture.split(",")[1]
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
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="webcam-container">
      <div className="language-select">
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

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          ...videoConstraints,
          facingMode
        }}
        className="webcam"
      />

      <div className="buttons-container">
        <div>
          <label for="file-input">
            <img src={uploadButton} />
          </label>
          <input type="file" id="file-input" name="file" style={{ position: "absolute", top: "-9999px", left: "-9999px" }} onChange={handleFileChange} />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            capture()
          }}
          className="btn p-0"
        >
          <img src={cameraButton} />
        </button>

        <button onClick={handleSwitch} className="btn p-0">
          <img src={switchButton} className="switch-button" />
        </button>
      </div>

      {result != null ?
        <div className="no-touch" onClick={() => setResult(null)}>
          <div className="pop-up" onClick={() => setResult(null)}>
            <img src={picture} />
            <div className="word-info">
              <p>{result.translation}</p>
              <p>{result.classification}</p>
            </div>
          </div>
        </div>
        :
        <div></div>
      }

    </div>
  )
};

export default Screen;
