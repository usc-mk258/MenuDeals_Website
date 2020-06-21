export const responseHandler = (req, res, next) => {
  if (req.body) {
    res.send({
      success: true,
      data: req.body
    });
  } else {
    next();
  }
}