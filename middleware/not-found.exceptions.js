function NotFound(app) {
  app.use((req, res, next) => {
    return res.status(404).json({
      error: {
        statusCode: 404,
        message: "Page Not Found",
      },
    });
  });
}

module.exports = NotFound;
