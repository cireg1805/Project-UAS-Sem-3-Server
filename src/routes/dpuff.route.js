const express = require("express")
const routes = express.Router();
const dpuffControllers = require("../controllers/dpuff.controllers");
const verifyToken = require("../function/verifyToken");


routes.post("/login", dpuffControllers.login);
routes.get("/product/:id", dpuffControllers.readProduct);
routes.get("/product/",verifyToken, dpuffControllers.readProducts);
routes.post("/product/",verifyToken, dpuffControllers.createProduct);
routes.patch("/product/:id",verifyToken, dpuffControllers.updateProduct);
routes.delete("/product/:id",verifyToken, dpuffControllers.deleteProduct);

module.exports = routes;