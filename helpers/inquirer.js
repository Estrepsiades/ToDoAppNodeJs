const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir `
            },

        ]
    }
];
const eleccion = [
    {
        type: 'input',
        name: 'ele',
        message: `PRESIONA ENTER PARA CONTINUAR`
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('====================='.green);
    console.log('Seleccionna una opcion'.white);
    console.log('=====================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const inquirerPause = async() => {

    const opt = await inquirer.prompt(eleccion);
    return opt;
};

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ){
                    throw `Ingrese el ${ message }`;
                }
                return true;
            }
        }
    ];

    const read = await inquirer.prompt(question);
    return read;
};

const inquirerListBorrar = async( tareas ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;

};

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok
    
};

const inquirerListCompletar = async( tareas ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

};

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    inquirerListBorrar,
    confirmar,
    inquirerListCompletar

}