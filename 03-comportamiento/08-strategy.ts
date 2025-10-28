/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
  move(): void;
}

// ESTRATEGIA 1
class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cNada rapidamente sobre el agua", COLORS.green);
  }
}
// ESTRATEGIA 2
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cVuela elegantemente sobre el agua", COLORS.blue);
  }
}
// ESTRATEGIA 3
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("%ccamina por  el agua", COLORS.pink);
  }
}

// USANDO LAS ESTRATEGIAS
class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, move: MovementStrategy) {
    this.name = name;
    this.movementStrategy = move;
    console.log(`${this.name} listo para competir`);
  }

  performMovement() {
    console.log(`${this.name} preparando para moverse...`);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy) {
    this.movementStrategy = strategy;
    console.log(`${this.name} ha cambiado de estrategia`);
    this.movementStrategy.move();
  }
}

function main() {
  const duck = new Duck("fastfy", new SwimFast());
  const duck2 = new Duck("pedrito", new FlyOverWater());
  const duck3 = new Duck("hugo", new WalkClumsily());

  duck.performMovement();

  duck.setMovementStrategy(new FlyOverWater());

  duck2.performMovement();
  duck2.setMovementStrategy(new WalkClumsily());

  duck3.performMovement();
  duck3.setMovementStrategy(new SwimFast());
}

main();
