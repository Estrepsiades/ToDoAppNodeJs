const { resolve } = require('path');

require('colors');

const shownMenu = () => {

    return new Promise( resolve => {
        console.clear();
        console.log('====================='.green);
        console.log('Seleccionna una opcion'.green);
        console.log('=====================\n'.green);
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea`);
        console.log(`${'6.'.green} Borrar tareas`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Selecciona una opcion: ', (option) => {
            readline.close();
            resolve(option);
        });
    });

};

const pause = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresiona ${'ENTER'.green}\n`, (option) => {
            readline.close();
            resolve();
        });
    });
    
}

module.exports = {
    shownMenu,
    pause

}