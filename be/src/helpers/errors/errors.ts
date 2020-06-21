export const generalError = (message = "Not Found") => {
  throw {
    statusCode: 400,
    message
  }
}

export const validityError = (error) => {
  if (error) {
    throw error
  }
}