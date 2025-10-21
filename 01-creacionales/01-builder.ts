import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */
class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Configuración de la computadora:

        CPU: ${this.cpu}
        RAM: ${this.ram}
        Almacenamiento: ${
          this.storage ?? "no tiene almacenamiento integrado pobre"
        }
        GPU: ${this.gpu ?? "notiene gpu integrado"}
        
        
        `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }
  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }
  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }
  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCPU("KESERO")
    .setRAM("64 GB")
    .build();

  //   console.log("%c computadora basica: ", COLORS.blue);
  //   basicComputer.displayConfiguration();

  const gamingComputer = new ComputerBuilder()
    .setCPU("INTEL CORE I7 10 GENERATION")
    .setGPU("INTEL INSIDE CORE E3")
    .setRAM("128 GB")
    .setStorage("450 HDD")
    .build();

  console.log("%c computadora GAMER: ", COLORS.green);
  gamingComputer.displayConfiguration();
}

main();
