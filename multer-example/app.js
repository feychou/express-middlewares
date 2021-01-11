const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const upload = require('./file-upload-config.js');

const app = express();
const publicFolder = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
  res.send('hello world')
});

app.get('/upload-profile-picture', (req, res) => {
  res.sendFile('upload_profile_picture.html', { root: publicFolder })
});

app.post('/upload-profile-picture', upload.single('profile_pic'), (req, res) => {
  const { file, fileValidationError } = req
  if (!file) {
    return res.status(400).send('Please upload a file');
  }
  res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3000/uploads/${req.file.filename}" width="500" /></div>`);
})

app.listen(3000,() => console.log('Server running on port 3000'));