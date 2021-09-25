const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

const username = "manish";
const password = "Hbqp7oalwABPyN5Z";
const cluster = "cluster0.zk74s";
const dbname = "Users";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
app.use(bodyParser.json());

app.post('/api/login',async (req,res)=>{

})

app.post('/api/register', async (req,res) =>{
    const{username,password: plainTextPassword,email,phoneNumber} = req.body
    if(!username || typeof username !== 'string'){
        return res.json({status:'error', error:'Invalid Username'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status:'error', error:'Invalid Username'})
    }

    const password = await bcrypt.hash(plainTextPassword,10)
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
            console.log(JSON.stringify(error))
            return res.json({status: error, error: 'Duplicate Key'})
        }else{
            return  res.json({status:error})
        }
    }
})


app.listen(5000, () => {
    console.log("server is running on 5000.")
});
