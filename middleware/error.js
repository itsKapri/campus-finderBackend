const error=(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500;
    error.message=error.message || "internal server error";

    res.status(error.statusCode).json({
        success: false,
        error:error.stack,
        message: error.message
    })
}

module.exports=error;