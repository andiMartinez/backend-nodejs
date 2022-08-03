class Usuario {
  constructor(name, apellido, libros, mascotas) {
    this.name = name;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.name}` + ` ` + `${this.apellido}`;
  }

  getBookNames() {
    console.log(this.libros.map((libro) => libro.name));
  }

  addBook(name, autor) {
    return this.libros.push({ name, autor });
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    console.log(this.mascotas.length);
  }
}

const u1 = new Usuario(
  "Elon",
  "Musk",
  [
    { name: "El señor de los Anillos", autor: "William Golding" },
    { name: "Fundacion", autor: "Isaac Asimov" },
  ],
  ["perro", "gato"]
);

// Imprimo full name usando getFullName
console.log("1: FullName: " + u1.getFullName() + " \n");

// Agrego un hamster a su array de mascotas
u1.addMascota("hamster");

// Cuento nuevo total de mascotas
u1.countMascotas();

// Agrego un nuevo libro
u1.addBook("El Hobbit", "J.R.R Tolkien");

console.log(u1);

u1.countMascotas();

u1.getBookNames();
