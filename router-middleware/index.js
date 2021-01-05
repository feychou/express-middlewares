const express = require('express');
const port = 3000;
const app = express();

// TO TEST
// open http://localhost:3000/ -> will display a public page
// open http://localhost:3000/protected-area -> will fail with anauthorised
// open http://localhost:3000/protected-area/?token=blargh -> will execute the next middleware and greet the user
const secure = (req, res, next) => {
  const { token } = req.query;

  if (token) {
    next()
  } else {
    res.status(403).send('unauthorized >:(')
  }
}

app.get('/', (req, res) => res.send('public page ^___^'))
app.get('/protected-area/', secure, (req, res) => res.send('you have accessed a protected area :D'))

app.listen(port, () => console.log(`Server started on port ${port} :D`));