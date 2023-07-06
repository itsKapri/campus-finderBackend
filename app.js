const express = require('express')
const app = express()


app.use(express.json())

// colleges routes 
const colleges=require('./routes/collegesRoutes')
app.use("/api/",colleges)



module.exports=app;