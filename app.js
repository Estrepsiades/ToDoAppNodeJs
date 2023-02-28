require('colors');
const { inquirerMenu, 
inquirerPause, readInput, inquirerListBorrar, confirmar, inquirerListCompletar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { saveData, readData } = require('./helpers/guardararchivo');

//Manera con Inquirer
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const leerDB = readData();

    if( leerDB ){
        tareas.loadTareasromArray( leerDB );
    };
    do{
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear Tarea
                const {desc} = await readInput('Descripcion:');
                tareas.crearTarea( desc );
                saveData( tareas.listadoArr );
                
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarFiltros();
                break;
            case '4':
                tareas.listarFiltros( false );
                break;
            case '5':
                const ids = await inquirerListCompletar( tareas.listadoArr);
                tareas.toggleCompletadas( ids );
                saveData( tareas.listadoArr );
                break;
            case '6':
                const id = await inquirerListBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const secureDelete = confirmar('Estas seguro de borrarlo?')
                    if( secureDelete ){
                        tareas.borrartarea( id );
                    };
                }
                break;
        }

        await inquirerPause();

    }while( opt !== '0');

};

/*Manera Manual de hacer nuestra lista
const main = async() => {
    console.log('Hello World');
    let opt;
    do {

        opt = await shownMenu();
        console.log( opt );
        await pause();

    }while( opt !== '0');
};
*/
main();