const photoTranslate = async (fileName, language) => {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Detect similar images on the web to a local file
  const [result] = await client.webDetection(fileName);
  const webDetection = result.webDetection;

  /* if you want to see the other classifications */

  // if (webDetection.webEntities.length) {
  //   console.log(`Web entities found: ${webDetection.webEntities.length}`);
  //   webDetection.webEntities.forEach(webEntity => {
  //     console.log(`  Description: ${webEntity.description}`);
  //     console.log(`  Score: ${webEntity.score}`);
  //   });
  // }

  // best guess classification
  const classification = webDetection.bestGuessLabels[0].label 
  // console.log(classification) 

  // translate classification to target language
  const axios = require('axios');

  const url = 'https://api-free.deepl.com/v2/translate';
  const text = classification;
  const targetLang = language;
  const authKey = '3534deeb-a97f-abbe-2869-91555979b7fb:fx';

  try {
    const response = await axios.post(url, {
      text: text.split(' '),
      target_lang: targetLang,
    }, {
      headers: {
        Authorization: `DeepL-Auth-Key ${authKey}`,
      },
    });
    // Extract translated text from response
    const translations = response.data.translations;
    let translatedText = '';
    for (let i = 0; i < translations.length; i++) {
      translatedText += translations[i].text + ' ';
    }
    return [classification, translatedText.trim()];
  } catch (error) {
    console.log(error);
  }
}

exports.photoTranslate = photoTranslate;