/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  showDetails(indent?: string): void {
    console.log(`${indent} - Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent: string = ""): void {
    console.log(`${indent} +  cxarpeta: ${this.name}`);
    this.contents.forEach((content) => content.showDetails(indent + " "));
  }

  add(component: FileSystemComponent) {
    this.contents.push(component);
  }
}

function main() {
  // archivos
  const file = new File("archivo-1.txt");
  const file2 = new File("archivo-2.txt");
  const file3 = new File("archivo-3.txt");
  const file4 = new File("archivo-4.txt");

  //   carpeta
  const folder1 = new Folder("carpeta 1");
  const folder2 = new Folder("carpeta 2");
  const folder3 = new Folder("carpeta 3");
  const folder5 = new Folder("carpeta 5");
  const rootFolder = new Folder("Carpeta ROOT");

  folder1.add(file);
  folder1.add(file2);

  folder2.add(file3);
  folder2.add(folder3);
  folder2.add(folder5);

  folder3.add(file4);

  rootFolder.add(folder1);
  rootFolder.add(folder2);

  rootFolder.showDetails();
}

main();
