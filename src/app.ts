
// const name: string = 'Cristian';// Aqui, se marca el error Cannot redeclare block-scoped variable 'name'.ts(2451) porque name no se debe usar en un scope global, es decir, lo que era la propiedad name que venia en el objeto global ya no está en dicho objeto. Ya no se debe de usar name. Para quitar el error, simplemente colocar export
//export const name: string = 'Cristian';//

import { Server } from "./presentation/server";


// console.log('Hola mundo! Me llamo ' + name);


// Funcion anonima autoinvocada o autoejecutable que puede ser asincrona si deseo

(async() => {
  main();
})();

function main() {
  Server.start();

}
