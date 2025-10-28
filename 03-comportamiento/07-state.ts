/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { OutgoingMessage } from "node:http";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WatingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }
  selectProduct() {
    this.state.selectProduct();
  }
  dispenseProduct() {
    this.state.dispenseProduct();
  }
  setState(state: State) {
    this.state = state;
    console.log(`El estado ha camgiado: ${state.name}`);
  }

  getStateName() {
    return this.state.name;
  }
}

class WatingForMoney implements State {
  name: string = "Esperando dinero";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("agregando dinero");
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    throw new Error("Method not implemented.");
  }
  dispenseProduct(): void {
    throw new Error("Method not implemented.");
  }
}
class ProductSelected implements State {
  name: string = "Producto seleccionado";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Ya se inserto dinero");
    // this.vendingMachine.setState();
  }
  selectProduct(): void {
    console.log(``);
    this.vendingMachine.setState(new DispenseProduct(this.vendingMachine));
  }
  dispenseProduct(): void {
    throw new Error("Method not implemented.");
  }
}
class DispenseProduct implements State {
  name: string = "Despachar producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Ya se inserto dinero");
    // this.vendingMachine.setState();
  }
  selectProduct(): void {
    console.log(`Ya se selecciono el producto`);
  }
  dispenseProduct(): void {
    console.log(`producto entregado`);
    this.vendingMachine.setState(new WatingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(`Selecciona una opcion: ${vendingMachine.getStateName()}`);
    selectedOption = prompt(`
            1. insertar dinero
            2. seleccionar producto
            3. despachar producto
            4. salir

            opcion: 
        `);

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo del sistema");
        break;
      default:
        console.log("Algo malio sal");
    }

    await sleep(3000);
  } while (selectedOption != "4");
}

main();
