const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const port = 3000
require('dotenv/config');

mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true }, () => {

   console.log("hello world");
});

app.use(bodyParser.json());

// import routes
const postRoutes = require('./routes/posts');
app.use('/post', postRoutes);

//importing route for user

const userRoute = require('./routes/user_routes');
app.use('/api/user', userRoute);



// app.listen(3000);
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})