const express = require('express');
const port = 3000;
const app = express();

// TO TEST
// open http://localhost:3000/ -> will fail with unauthorized
// open http://localhost:3000/?token=thisstringiswhatever -> will execute the next middleware and greet the user
const secure = (req, res, next) => {
  const { token } = req.query;

  if (token) {
    next()
  } else {
    res.status(403).send('unauthorized >:(')
  }
}

app.use(secure);
app.get('/', (req, res) => res.send('hello user :)'))

app.listen(port, () => console.log(`Server started on port ${port} :D`));