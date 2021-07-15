let mongoose = require('mongoose')
let Schema = mongoose.Schema
let userSchema = Schema({username:String,password:Number})
let user = new mongoose.model('user', userSchema)
module.exports = user