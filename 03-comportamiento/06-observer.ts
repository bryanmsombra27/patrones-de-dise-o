import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer) {
    console.log(`Nuevo suscriptor al canal: %c${this.name}`, COLORS.green);
    this.subscribers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber != observer
    );
    console.log(`Un suscriptor menos`);
  }

  uploadVideo(title: string) {
    console.log(`Canal ${this.name} ha subido un nuevo video ${title} `);

    for (const sub of this.subscribers) {
      sub.notify(title);
    }
  }
}

class Subscriber implements Observer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `${this.name}, ha sido notificado del nuevo video ${videoTitle}`
    );
  }
}

function main() {
  const channel = new YoutubeChannel("shadow");
  const subscriber = new Subscriber("Beto");
  const subscriber2 = new Subscriber("Paco");
  const subscriber3 = new Subscriber("Luis");
  const subscriber4 = new Subscriber("hugo");

  channel.subscribe(subscriber);
  channel.subscribe(subscriber2);
  channel.subscribe(subscriber3);
  channel.subscribe(subscriber4);

  channel.uploadVideo("Receta del refresco de cola que cura el cancer de ano");

  channel.unsubscribe(subscriber);
}

main();
