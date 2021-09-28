const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTER}.mongodb.net/${process.env.MONGODBDBNAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
app.use(bodyParser.json());
app.use(cors());

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const updateUserRouter = require('./routes/updateUserDetails');
app.use('/update-my-profile', updateUserRouter);

app.listen(5000, () => {
    console.log("server is running on 5000.")
});
