import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHanlder?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHanlder = handler;
    return handler;
  }
  handle(request: string): void {
    if (this.nextHanlder) {
      this.nextHanlder.handle(request);
    }
  }
}

// ESLABONES DE CADENA
// soporte basico
class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basico") {
      console.log("%csoporte basico", COLORS.green);
      return;
    }
    console.log("=======");

    console.log(
      "%cNo fue posible solucionar el problema con soporte basico, moviendonos a soporte avanzado",
      COLORS.blue
    );
    console.log("=======");
    super.handle(request);
  }
}

class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "avanzado") {
      console.log("%csoporte avanzado", COLORS.yellow);
      return;
    }
    console.log("=======");

    console.log(
      "%cNo fue posible solucionar el problema con soporte avanzado, moviendonos a soporte experto",
      COLORS.blue
    );
    console.log("=======");
    super.handle(request);
  }
}
class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "experto") {
      console.log("%csoporte experto", COLORS.yellow);
      return;
    }
    console.log("=======");

    console.log(
      "%cNo fue posible solucionar el problema con soporte experto, Falio ferga la fida",
      COLORS.red
    );
    console.log("=======");
    console.log(
      "%cpidele ayuda a diosito porque este pedo ya no salio 🥲",
      COLORS.red
    );
    // super.handle(request);
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  basicSupport.handle("keo");
}

main();
