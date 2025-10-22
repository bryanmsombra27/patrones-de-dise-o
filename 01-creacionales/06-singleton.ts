import { COLORS } from "../helpers/colors.ts";

/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */
class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%cEsferas del dragon creadas", COLORS.green);
    }

    return DragonBalls.instance;
  }

  collectBall() {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `Esfera recolectada. Total de esferas:  ${this.ballsCollected}`
      );

      return;
    }

    console.log("Ya se recolectaron las esferas. Puedes pedir tus deseos");
  }

  summonShengLong() {
    if (this.ballsCollected == 7) {
      console.log("Shenlong ha sido invocado pide tu deseo");
      this.ballsCollected = 0;
      return;
    }

    console.log(
      `Faltan ${7 - this.ballsCollected} esferas del dragon por recolectar`
    );
  }
}

function main() {
  const gokuDrangonBalls = DragonBalls.getInstance();
  const vegetaDrangonBalls = DragonBalls.getInstance();

  gokuDrangonBalls.collectBall();
  gokuDrangonBalls.collectBall();
  gokuDrangonBalls.collectBall();

  vegetaDrangonBalls.collectBall();
  vegetaDrangonBalls.collectBall();
  vegetaDrangonBalls.collectBall();
  vegetaDrangonBalls.collectBall();

  gokuDrangonBalls.summonShengLong();
}

main();
