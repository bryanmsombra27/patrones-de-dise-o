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

import { configManager } from "./singleton/config-manager.ts";

configManager.setConfig("apiurl", "http://localhost:3000");
configManager.setConfig("timeout", "3000");
configManager.setConfig("apikey", "1234563");
console.log(configManager.getAllConfig());
console.log(configManager.getConfig("timeout"));
console.log(configManager.getConfig("apikey"));
