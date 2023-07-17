const app=require('./app')
require('dotenv').config()
const cors = require('cors')
app.use(cors())

// mongodb connection
const connectDB=require('./config/dbconnection')
connectDB();

// server start
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}/`);
})




// env
// PORT=4080
// CONNECTION_STRING="mongodb+srv://19301033nilesh:admin@cluster0.aswekuy.mongodb.net/"

