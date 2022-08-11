const { request, response } = require("express");
const Books = require("./Books");
const express = require("express");

const app = express();
const book = new Books();

app.get("/productoRandom", (request, response) => {
  response.send(book.getRandomBook());
});

app.get("/productos", (request, response) => {
  response.send(book.listarAll());
});

app.get("*", (request, response) => {
  response.send("404 - Page not found");
});

const server = app.listen(8080, () => {
  console.log(`Servidor http escuchando en http://localhost:8080/`);
});
