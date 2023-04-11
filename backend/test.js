const { photoTranslate } = require('./PhotoTranslate.js');

async function testPhotoTranslate() {
  const result = await photoTranslate('./backend/images/pho.jpeg', 'JA');
  console.log(result);
}

testPhotoTranslate();