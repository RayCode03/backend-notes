module.exports = (request, response) => {
  response.status(404).json({
    error: "Not found",
  });
};
