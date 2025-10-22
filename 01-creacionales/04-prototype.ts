/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */
class Document {
  title: string;
  private content: string;
  author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(`
        Title: ${this.title}
        Content: ${this.content}
        author: ${this.author} 
        `);
  }
}

function main() {
  const document1 = new Document("Cotizacion", "500 dlrs", "Bryan Ochoa");
  //   const document2 = {
  //     ...document1,
  //   };
  //   const document2 = structuredClone(document1);
  const document2 = document1.clone();

  document2.title = "kesero";
  document1.displayInfo();

  console.log(document1);
  console.log(document2);
}

main();
