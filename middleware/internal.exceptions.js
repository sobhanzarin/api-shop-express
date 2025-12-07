function InternalException(app) {
  app.use((err, req, res, next) => {
    const status = err?.status ?? 500;
    const message = err?.message ?? "internal serve error";
    return res.json({
      error: {
        statusCode: status,
        message: message,
      },
    });
  });
}

module.exports = InternalException;
