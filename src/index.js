const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3031;

const dpuffRoutes = require("./routes/dpuff.route");
const userRoutes = require("./routes/user.route")

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);  

app.use("/", dpuffRoutes, userRoutes);

app.listen(PORT, () => {
  console.log("server berjalan ....");
});