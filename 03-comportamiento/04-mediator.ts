/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;
    chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `%c${this.username} envia: %c${message}`,
      COLORS.green,
      COLORS.blue
    );

    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string) {
    console.log(
      `\n\n\n%c${this.username} recibe de: %c${sender.username} el mensaje: ${message}`,
      COLORS.red,
      COLORS.yellow
    );
  }
}

class ChatRoom {
  // como ya se esta inicializando el valor de users, ya no se crearia una dependencia ciclica (en caso de que no se inicializara si existiria una dependencia ciclica)
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user != sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

function main() {
  const chatRoom = new ChatRoom("Grupo de trabajo");
  const user1 = new User("koso", chatRoom);
  const user2 = new User("pedro", chatRoom);
  const user3 = new User("paco", chatRoom);

  user1.sendMessage("Hola mother fuckers!");
  user2.sendMessage("Que quieres cara de verga!");
  user3.sendMessage("beso de 3 o que!");
  console.log("\n\n");
}

main();
