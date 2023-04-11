import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("JA");
  const [result, setResult] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Read the file as a base64-encoded string
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
  
      try {
        // Send a POST request to the backend API to process the image
        const response = await axios.post(
          "http://localhost:3001/translate",
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
        setSelectedFile(null); // clear the selected file after submitting
  
        // Display the submitted image
        const imagePreviewUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(imagePreviewUrl);
      } catch (error) {
        console.log(error);
      }
    };
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Select an image:</label>
          <input type="file" id="image" onChange={handleFileChange} />
        </div>

        <div>
            <label htmlFor="language">Select a language:</label>
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

        <button type="submit">Submit</button>
      </form>

      {imagePreviewUrl && (
        <img src={imagePreviewUrl} alt="Selected File" style={{ width: "100%", maxWidth: "500px" }} />
        )}


      {result && (
        <div>
            <h2>Result:</h2>
            <p>Classification: {result.classification}</p>
            <p>Translation: {result.translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
