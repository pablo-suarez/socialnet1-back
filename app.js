const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MDBURI} = require('./keymon.js')




mongoose.connect(MDBURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Conection to MongoDB Atlas succesful")
})
mongoose.connection.on('error',(err)=>{
    console.log("Conection to MongoDB Atlas fail",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("server running in port ",PORT)
})
