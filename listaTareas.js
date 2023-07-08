const readline = require('readline-sync');

const tareas = [];

function agregarTarea() {
  return new Promise((resolve) => {
    const indicador = readline.question('Indicador de la tarea: ');
    const descripcion = readline.question('Descripción de la tarea: ');
    const estado = readline.question('Estado de la tarea (completada o no): ');
    const tarea = { indicador, descripcion, estado };
    tareas.push(tarea);
    resolve();
  });
}

function eliminarTarea() {
  return new Promise((resolve, reject) => {
    const indicador = readline.question('Indicador de la tarea a eliminar: ');
    const index = tareas.findIndex((tarea) => tarea.indicador === indicador);
    if (index !== -1) {
      tareas.splice(index, 1);
      console.log('Tarea eliminada.');
      resolve();
    } else {
      reject(new Error('No se encontró una tarea con ese indicador.'));
    }
  });
}

function completarTarea() {
  return new Promise((resolve, reject) => {
    const indicador = readline.question('Indicador de la tarea a marcar como completada: ');
    const tarea = tareas.find((tarea) => tarea.indicador === indicador);
    if (tarea) {
      tarea.estado = 'completada';
      console.log('Tarea marcada como completada.');
      resolve();
    } else {
      reject(new Error('No se encontró una tarea con ese indicador.'));
    }
  });
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach((tarea) => {
    console.log(`Indicador: ${tarea.indicador}`);
    console.log(`Descripción: ${tarea.descripcion}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log('------------------------');
  });
}

async function main() {
  while (true) {
    console.log('1. Añadir tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Completar tarea');
    console.log('4. Mostrar tareas');
    console.log('5. Salir');
    const opcion = readline.question('Elige una opción: ');
    console.log('------------------------');

    switch (opcion) {
      case '1':
        await agregarTarea();
        break;
      case '2':
        await eliminarTarea()
          .catch((error) => console.log(error.message));
        break;
      case '3':
        await completarTarea()
          .catch((error) => console.log(error.message));
        break;
      case '4':
        mostrarTareas();
        break;
      case '5':
        return;
      default:
        console.log('Opción inválida. Inténtalo de nuevo.');
    }
  }
}

main();
