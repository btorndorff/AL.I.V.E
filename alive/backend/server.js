const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { photoTranslate } = require('./PhotoTranslate.js');
const multer  = require('multer');
const fs = require("fs");

// Increase payload size limit to 50MB
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./backend/images",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

//initializing multer
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

app.post('/translate', upload.single('image'), async (req, res) => {
  if (req.body.image) {
    const base64Image = req.body.image.toString('base64');
    const language = req.body.language;
    const fileName = `${Date.now()}.jpg`;
    const filePath = path.join(__dirname, './images', fileName);
    const buffer = Buffer.from(base64Image, "base64");
    fs.writeFileSync(filePath, buffer);

    const [classification, translatedText] = await photoTranslate(filePath, language);

    res.json({
      classification: classification,
      translatedText: translatedText,
    });

    console.log(res)
  } else {
    res.status(400).send("Please upload a valid image");
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
