const fs = require("fs/promises");

class Books {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listarAll() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async getRandomBook() {
    const books = await this.listarAll();
    const randomIndex = Math.floor(Math.random() * books.length);
    console.log(books[randomIndex]);
  }

  async getAllBooks() {
    const books = await this.listarAll();
    return books;
  }

  async guardar(obj) {
    try {
      const objs = await this.listarAll();

      let newId;
      if (objs.length == 0) {
        newId = 1;
      } else {
        newId = objs[objs.length - 1].id + 1;
      }

      const newObj = { id: newId, ...obj };
      objs.push(newObj);

      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newId;
    } catch (error) {
      console.log("error saving object");
    }
  }

  async actualizar(id, newObj) {
    try {
      const objs = await this.listarAll();
      const indexObj = objs.findIndex((o) => o.id == id);

      if (indexObj == -1) {
        return "Object not found";
      } else {
        objs[indexObj] = { id, ...newObj };
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      }
      return { id, ...newObj };
    } catch (error) {
      console.log("error refreshing object");
    }
  }

  async eliminar(id) {
    try {
      const objs = await this.listarAll();
      const indexObj = objs.findIndex((o) => o.id == id);

      if (indexObj == -1) {
        return "error deleting object";
      } else {
        objs.splice(indexObj, 1);
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      }
    } catch (error) {
      return "cant delete object";
    }
  }
}

async function main() {
  const books = new Books("./books-data.txt");

  console.log("Consulta inicial");
  console.log(await books.listarAll());
  console.log("Guarda obejetos");
  console.log(
    await books.guardar({ title: "Autor 1", author: "Sonidos de Marte" })
  );
  console.log(
    await books.guardar({ title: "Harry Potter", author: "J. K. Rowling" })
  );

  console.log("Actualiza objeto");
  console.log(
    await books.actualizar(2, {
      title: "Lord of the Rings",
      author: "J. R. R. Tolkien.",
    })
  );

  console.log("Consulta objetos");
  console.log(await books.listarAll());
  console.log("Elimina objeto");
  console.log(await books.eliminar(1));
  console.log("Consulta objetos");
  console.log(await books.listarAll());
  console.log("Guarda obejetos");
  console.log(
    await books.guardar({ title: "Harry Potter", author: "J. K. Rowling" })
  );
  console.log("Consulta objetos");
  console.log(await books.listarAll());
}
main();

module.exports = Books;
