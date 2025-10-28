/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { addAbortListener } from "node:events";
import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHountedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrishWheel(rollerCoaster: FerrishWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}
class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice() {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}
class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice() {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHountedHouse(this);
  }
}
class FerrishWheel implements Attraction {
  private price: number = 30;

  getPrice() {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrishWheel(this);
  }
}

// VISITORS
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Niño en montaña rusa:  precio con descuento: ${
        rollerCoaster.getPrice() * 0.5
      }`
    );
  }
  visitHountedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Niño en casa de terror:  precio con descuento: ${
        hauntedHouse.getPrice() * 0.7
      }`
    );
  }
  visitFerrishWheel(ferrishWheel: FerrishWheel): void {
    console.log(
      `Niño en rueda de la fortuna:  precio con descuento: ${
        ferrishWheel.getPrice() * 0.3
      }`
    );
  }
}
class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto en montaña rusa:  precio con descuento: ${rollerCoaster.getPrice()}`
    );
  }
  visitHountedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto en casa de terror:  precio con descuento: ${hauntedHouse.getPrice()}`
    );
  }
  visitFerrishWheel(ferrishWheel: FerrishWheel): void {
    console.log(
      `Adulto en rueda de la fortuna:  precio con descuento: ${ferrishWheel.getPrice()}`
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto mayor en montaña rusa:  precio con descuento: ${
        rollerCoaster.getPrice() * 0.9
      }`
    );
  }
  visitHountedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto mayor en casa de terror:  precio con descuento: ${
        hauntedHouse.getPrice() * 0.9
      }`
    );
  }
  visitFerrishWheel(ferrishWheel: FerrishWheel): void {
    console.log(
      `Adulto mayor en rueda de la fortuna:  precio con descuento: ${
        ferrishWheel.getPrice() * 0.9
      }`
    );
  }
}

function main() {
  const atractions: Attraction[] = [
    new RollerCoaster(),
    new FerrishWheel(),
    new HauntedHouse(),
  ];
  console.log("\n%cVisitante niño", COLORS.gray);
  const childVisitor = new ChildVisitor();
  const adultVisitor = new AdultVisitor();
  const seniorVisitor = new SeniorVisitor();
  console.log(`precio montaña rusa: ${atractions[0].getPrice()}`);
  console.log(`precio rueda de la fortuna: ${atractions[1].getPrice()}`);
  console.log(`precio casa embrujada: ${atractions[2].getPrice()}`);

  console.log("=================");
  atractions.forEach((attraction) => attraction.accept(childVisitor));
  console.log("=================");
  atractions.forEach((attraction) => attraction.accept(adultVisitor));
  console.log("=================");
  atractions.forEach((attraction) => attraction.accept(seniorVisitor));
}

main();
