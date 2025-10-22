import { COLORS } from "../helpers/colors.ts";

/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */
type Language = "es" | "en" | "fr";

function createGreeter(lang: Language) {
  return function (name: string) {
    const messages = {
      es: `Hoia, ${name}`,
      en: `hello, ${name}`,
      fr: `bonjour, ${name}`,
    };

    return console.log(`%c${messages[lang]}`, COLORS.red);
  };
}

function main() {
  const spanishGreeter = createGreeter("es");
  const englishGreeter = createGreeter("en");
  const frenchGreeter = createGreeter("fr");

  spanishGreeter("keso");
  englishGreeter("kaso");
  frenchGreeter("kuso");
}

main();
