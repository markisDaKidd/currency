
let SECRET = process.env.SECRET||'dfhjfhjdfd'
let PORT = process.env.PORT||3000
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
({secret: ,
resave: false,
saveUninitialized: true,
store: MongoStore.create({ mongoUrl: 'mongodb://localhost/currency' }),
cookie: { secure: false, maxAge:60*60*1000 }})


//ap uses
ap.use(express.json())
ap.use(express.urlencoded({extended:false}))
app.use(session)





//////
mongoose.connect('mongodb://localhost/currency',{useUnifiedTopology:true}).then(()=>{
    app.listen(3000,()=>{
        console.log('listening on');
    })
})
