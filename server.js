const express = require("express");
const mongoose = require("mongoose");
const authController = require("./controller/auth.controller");
const userController = require("./controller/user.controller");
const verifyToken = require("./middleware/auth");

const app = express();

app.use(express.json());

//Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/pointhubtes1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Status
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// List of routes
app.route("/v1/auth/register").post(authController.register);
app.route("/v1/auth/signin").post(authController.login);
app.route("/v1/auth/signin").patch(authController.login);
app.route("/v1/items").get(verifyToken, userController.itemsGet);
app.route("/v1/items/:_id").get(verifyToken, userController.itemsGetById);
app.route("/v1/items").post(verifyToken, userController.itemsPost);
app.route("/v1/items/:_id").patch(verifyToken, userController.itemsPatch);
app.route("/v1/items/:_id").delete(verifyToken, userController.itemsDelete);
app
  .route("/v1/items/:_id/restore")
  .patch(verifyToken, userController.itemsDelete)
  .delete(verifyToken, userController.itemsDelete);
app
  .route("/v1/items/:_id/archive")
  .patch(verifyToken, userController.itemsPatchArchive);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
