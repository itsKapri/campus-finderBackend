const app=require('./app')
require('dotenv').config()

// mongodb connection
const connectDB=require('./config/dbconnection')
connectDB();

// server start
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}/`);
})




// env
// PORT=4080
// CONNECTION_STRING=""
// JWT_SECRET=MysecretkeyNK
// JWT_EXPIRE=5d
// COOKIE_EXPIRE=5

