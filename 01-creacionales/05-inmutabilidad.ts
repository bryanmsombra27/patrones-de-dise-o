import { COLORS } from "../helpers/colors.ts";

/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly onSaveChanges: boolean;

  constructor(content: string, cursorPosition: number, onSaveChanges: boolean) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.onSaveChanges = onSaveChanges;
  }

  copyWith({
    content,
    onSaveChanges,
    cursorPosition,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      onSaveChanges ?? this.onSaveChanges
    );
  }

  displayState() {
    console.log("\n%cEstado del editor: ", COLORS.green);
    console.log(`
                contenido: ${this.content}
                posicion del cursor: ${this.cursorPosition}
                cambios guardados: ${this.onSaveChanges}
            `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }
    this.history.push(state);
    this.currentIndex++;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('hola mundo')", 2, false);

  history.save(editorState);

  console.log("%cEstado inicial", COLORS.green);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('hola mundo'); \n console.log('nueva linea')",
    cursorPosition: 3,
    onSaveChanges: true,
  });

  history.save(editorState);
  console.log("primer cambio");
  editorState.displayState();

  editorState = editorState.copyWith({
    cursorPosition: 5,
  });

  history.save(editorState);
  console.log("mover la posicion deel cursor");
  editorState.displayState();

  console.log("DESHACER CAMBIOS ");
  editorState = history.undo()!;
  editorState.displayState();

  console.log("REHACER CAMBIOS ");
  editorState = history.redo()!;
  editorState.displayState();
}

main();
