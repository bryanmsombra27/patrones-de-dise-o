/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.level = level;
    this.name = name;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta: ${player.name}`, COLORS.green);
    console.log("Vas a valer digiverga morro");
  }
}

// PROXY
class MagicPortal implements Room {
  private room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.room.enter(player);
    }

    console.log(
      "%c Tu nivel no es suficiente para acceder a esta zona",
      COLORS.red
    );
  }
}

function main() {
  const player = new Player("koso", 4);
  const player2 = new Player("keso", 15);

  // ROOMS
  const secretRoom = new SecretRoom();

  const magicPortalProxy = new MagicPortal(secretRoom);
  magicPortalProxy.enter(player);
  magicPortalProxy.enter(player2);
}

main();
