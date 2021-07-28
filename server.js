
let SECRET = process.env.SECRET||'dfhjfhjdfd'
let PORT = process.env.PORT||4000
let COOKIE_SECRET = process.env.COOKIE_SECRET||'secretduh'
let {body}=require('express-validator')
/////;/
let cookie = require('cookie-parser')
let User = require('./schema.js')
let path = require('path');
let mongoose = require('mongoose')
let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
let bcrypt = require('bcrypt')
let MongoStore = require('connect-mongo')
let session = require('express-session')
({secret: SECRET,
resave: false,
saveUninitialized: true,
store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/currency' }),
cookie: { secure: false, maxAge:60*60*1000 }})


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./src','views'))
app.use(cookie(COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('src'))
app.use(session)



app.get('/',(req,res)=>{
    console.log(req.cookies.user)
    if(req.signedCookies.user){
        return res.render('login',{username:req.signedCookies.user.username,alerts:[0,1,2]})
    }
    
    res.sendFile(path.join(__dirname,'./src','/home.html'))
    
    
})


app.post('/register',body('user').trim().escape(),(req,res)=>{
    User.findOne({username:req.body.user},(err,result)=>{
        if(!result){
            bcrypt.hash(req.body.pass, 10, function(err, hash) {
                if (err)
                    throw err
                else{
                    let account = new User
                    account.username = req.body.user;
                    account.password = hash
                    account.save((err)=>{
                        if(err) throw err
                        else{
                            res.redirect('/')
                        }
                    })

                }
                
            })

        }
        else{
            return
        }
    })
})
app.post('/login',body('user').trim().escape(),(req,res)=>{
    User.findOne({username:req.body.user},(err,result)=>{
        if(err)throw err
        else if(!result)res.redirect('/')
        else{
            bcrypt.compare(req.body.pass,result.password,(err,result)=>{
                if(err) throw err
                else return res.cookie('user',{username:req.body.user,alerts:[]},{maxAge:60*60*500,signed:true,httpOnly:true}).render('login',{username:req.body.user,alerts:[0,1,2]})
            })
        }
    })
})
app.post('/logout',(req,res)=>{
    res.clearCookie('user', { expires: new Date(), path: '/' }).redirect('/');
})


mongoose.connect('mongodb://localhost:27017/currency',{useUnifiedTopology:true})
http.listen(PORT,()=>{
    console.log(`listening on ${PORT}\n `);
})
