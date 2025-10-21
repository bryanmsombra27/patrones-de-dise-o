/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburguer {
  prepare(): void;
}
class ChickenHamburguer implements Hamburguer {
  prepare(): void {
    console.log("Preparando hamburguesa de %cpollo", COLORS.brown);
  }
}
class BeefHamburguer implements Hamburguer {
  prepare(): void {
    console.log("Preparando hamburguesa de %ccarne", COLORS.orange);
  }
}
class BeanHamburguer implements Hamburguer {
  prepare(): void {
    console.log("Preparando hamburguesa de %cFrijol", COLORS.blue);
  }
}

abstract class Restaurant {
  protected abstract createHamburguer(): Hamburguer;

  orderHamburguer(): void {
    const hamburguer = this.createHamburguer();
    hamburguer.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburguer(): Hamburguer {
    return new ChickenHamburguer();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburguer(): Hamburguer {
    return new BeefHamburguer();
  }
}
class BeanRestaurant extends Restaurant {
  override createHamburguer(): Hamburguer {
    return new BeanHamburguer();
  }
}

function main() {
  let restaurant: Restaurant;

  const burguerType = prompt(
    "¿Que tipo de hamburguesa quieres? (chiken/beef/bean)"
  );

  switch (burguerType) {
    case "chicken":
      restaurant = new ChickenRestaurant();
      break;
    case "beef":
      restaurant = new BeefRestaurant();
      break;
    case "bean":
      restaurant = new BeanRestaurant();
      break;
    default:
      throw new Error("opcion invalida");
  }

  restaurant.orderHamburguer();
}

main();
