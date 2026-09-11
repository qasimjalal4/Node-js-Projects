

export const errorHandler = (err,req,res,next) => {

  return res.status(err.statusCode).json({
      success: false,
      message: err.message
  })
}