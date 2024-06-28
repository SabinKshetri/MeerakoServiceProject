const { books } = require("../model");

exports.createBook = async (req, res) => {
  const { title, author, genre, year } = req.body;

  if (!title || !author || !genre || !year) {
    return res.status(404).json({
      message: "Please Provide Details",
    });
  }
  const response = await books.create({
    title,
    author,
    genre,
    year,
  });
  res.status(200).json({
    message: "Book Created Successfully !!",
    data: response,
  });
};

exports.getAllBooks = async (req, res) => {
  const response = await books.findAll();
  if (response.length <= 0) {
    return res.status(200).json({
      message: "No Book Found !!",
    });
  }
  res.status(200).json({
    message: "Fetched Book Successfully !!",
    data: response,
  });
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;

  const { title, author, genre, year } = req.body;

  if (!title || !author || !genre || !year) {
    return res.status(404).json({
      message: "Please Provide Details",
    });
  }
  const response = await books.update(
    {
      title,
      author,
      genre,
      year,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    message: "Book Updated Successfully !!",
    data: response,
  });
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  const response = await books.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    message: "Book Deleted Successfully !!",
    data: response,
  });
};
