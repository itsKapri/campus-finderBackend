const express = require('express')
const app = express()

const errorMiddleware=require('./middleware/error')

app.use(express.json())

// colleges routes 
const colleges=require('./routes/collegesRoutes')
app.use("/api/",colleges)


// school routes
const schools=require('./routes/schoolRoutes')
app.use("/api/",schools)


// home
const allData=require('./routes/allDataRoutes')
app.use("/api/",allData)

// error middleware
app.use(errorMiddleware)

module.exports=app;