const express = require("express");
const app = express();

const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

require("./model/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/authRoutes");
const bookRoute = require("./routes/bookRoutes");
app.use("", authRoute);
app.use("", bookRoute);

app.get("/", (req, res) => {
  res.send("Hello World !!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running in ${process.env.PORT}`);
});
