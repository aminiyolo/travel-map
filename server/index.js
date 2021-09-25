const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pin = require("./routes/pins");
const user = require("./routes/users");
const app = express();

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pins", pin);
app.use("/api/users", user);

const port = 8080;
app.listen(port, () => {
  console.log(`${port} server is running`);
});
