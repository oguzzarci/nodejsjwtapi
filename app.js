const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();



app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
  }));

app.get('/api',(req,res) =>{
    res.json({
        message: 'Welcome '
    });
});

app.post('/api/post',verifyToken,(req,res) => {
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post Success',
                authData
            });
        }
    });
});

app.post('/api/login', (req,res) => {

    //Mock User
    const user = {
        id:1,
        username:'oguz',
        email:'oguzzarci@gmail.com'
    }

    jwt.sign({user},'secretkey',{ expiresIn: '30s' },(err,token)=> {
        res.json({
            token
        });
    });
});

// format of token
// authorization : Bearer <access_token>


// Verify Token

function verifyToken(req,res,next){
    // Get Auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is aundefined

    if(typeof bearerHeader !== 'undefined'){

        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        //Next middleware
        next();


    }else{
        //Forbidden
        res.sendStatus(403);

    }

}


app.listen(5000,() => console.log('Server started on port 5000'));