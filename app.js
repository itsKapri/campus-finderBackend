const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const authMiddleware = require('./middleware/auth');
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Colleges routes 
const colleges = require('./routes/collegesRoutes');
app.use("/api/", colleges);

// School routes
const schools = require('./routes/schoolRoutes');
app.use("/api/", schools);

// Home
const allData = require('./routes/allDataRoutes');
app.use("/api/", allData);

// Auth
const users = require('./routes/userRoutes');
app.use("/api", users);

// save college
const savecollege=require('./routes/saveRoutes')
app.use("/api/collegecart/",savecollege)

//school save
const saveSchool=require('./routes/schoolSaveRoutes')
app.use("/api/schoolcart/",saveSchool)

// Auth Middleware 
app.use(authMiddleware);


// Error Middleware
app.use(errorMiddleware);

module.exports = app;