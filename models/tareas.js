const Tarea = require('./tarea');
require('colors');
class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    };

    borrartarea( id ){

        if(this._listado[ id ]){
            delete this._listado[ id ]
        };
    };

    loadTareasromArray( tareas ){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        });
    };

    crearTarea( desc ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto(){
        this.listadoArr.forEach
        ( ({ desc, completadoEn }, index ) => 
            console.log
            (`${index}.`.green + ` ${desc} : :` + 
            `${ (completadoEn === null ) ?
                ' Pendiente'.red :
                ' Completado'.green }`)
        );
    };

    listarFiltros( filtro = true ){
        let contador = 1;
        this.listadoArr.forEach(({ desc, completadoEn }) => {
            if( filtro === true ){
                if( completadoEn === true){
                    console.log
                    (`${contador}. `.green + `${desc} : :` + 
                    ' Completado'.green);
                    contador++
                };
            }else{
                if( completadoEn != true){
                    console.log
                    (`${contador}. `.green + `${desc} : :` + 
                    ' Pendiente'.red);
                    contador++
                };
            }
        });
    };

    toggleCompletadas( ids ){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = true;
            };

        });
        
        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
};

module.exports = Tareas;