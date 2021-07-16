
let SECRET = process.env.SECRET||'dfhjfhjdfd'
let PORT = process.env.PORT||4000
/////;/
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
store: MongoStore.create({ mongoUrl: 'mongodb://localhost/currency:27107' }),
cookie: { secure: false, maxAge:60*60*1000 }})


app.set('view engine','ejs')
ap.set('views',)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session)



app.get('/',(req,res)=>{
    req.session.p =10
    res.send('')
})


mongoose.connect('mongodb://localhost:27017/currency',{useUnifiedTopology:true})
http.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})
