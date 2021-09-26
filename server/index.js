const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = 'jnfkdfnblnbl#(18579130314@#$@$nblsnflnslvl(@#&%Y)!#$$!fakf#(*%)!%)(!dffsdfsd'

mongoose.connect(
    `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTER}.mongodb.net/${process.env.MONGODBDBNAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
app.use(bodyParser.json());
app.use(cors());

app.post('/login',async (req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email}).lean()
    if(!user){
        return res.json({status: 'error', error:'Invalid username'})
    }
    if(await bcrypt.compare(password,user.password)) {
        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET)
        return res.json({status: 'ok', data: token})
    }

    return res.json({status: 'error', error:'Invalid Password'})
})

app.post('/register', async (req,res) =>{
    const{username,password: plainTextPassword,email,phoneNumber} = req.body
    if(!username || typeof username !== 'string'){
        return res.json({status:'error', error:'Invalid Username'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status:'error', error:'Invalid password'})
    }

    const password = await bcrypt.hash(plainTextPassword,10);
    try {
        const response = await User.create({
            username,
            password,
            email,
            phoneNumber
        })
        console.log('User Created',response)
        return res.json({status:"ok"})

    }catch (error){
        if(error.code === 11000) {
            return res.json({status: error, error: 'Duplicate Key'})
        }else{
            return  res.json({status:error})
        }
    }
})


app.listen(5000, () => {
    console.log("server is running on 5000.")
});
