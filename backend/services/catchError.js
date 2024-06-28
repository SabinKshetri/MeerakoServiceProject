module.exports = (fn) => {
  return (req, res) => {
    fn(req, res).catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong !!",
        errorMessage: err.message,
      });
      return;
    });
  };
};
