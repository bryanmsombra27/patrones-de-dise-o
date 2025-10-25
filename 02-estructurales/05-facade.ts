/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Proyector {
  turnOn() {
    console.log("proyector encendido");
  }

  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de Sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Video player encendido");
  }
  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log("pelicula detenida");
  }

  off() {
    console.log("Video player apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas 🙂");
  }

  stopPoppingPopcorn() {
    console.log("Terminando de hacer palomitas 😊");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Proyector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Proyector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcorn: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.popcorn = popcornMaker;
    this.projector = projector;
    this.videoPlayer = videoPlayer;
    this.soundSystem = soundSystem;
  }

  watchMovie(movie: string): void {
    console.log("Preparando pelicula");
    this.projector.turnOn();
    this.popcorn.poppingPopcorn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("Que disfrute la pelicula motherfucker 😎");
  }

  turnOffMovie(): void {
    console.log("Quitando la pelicula y apagando todo");
    this.soundSystem.off();
    this.projector.turnOff();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    this.popcorn.stopPoppingPopcorn();
    console.log("Puede ir a follar a gusto 😈");
  }
}

function main() {
  const proyector = new Proyector();
  const videoPlayer = new VideoPlayer();
  const soundSystem = new SoundSystem();
  const popcorn = new PopcornMaker();

  const hometheater = new HomeTheaterFacade({
    projector: proyector,
    videoPlayer: videoPlayer,
    soundSystem,
    popcornMaker: popcorn,
  });

  hometheater.watchMovie("La toalla del mojado");
  console.log("====================");
  hometheater.turnOffMovie();
}

main();
