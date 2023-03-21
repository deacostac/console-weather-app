import inquirer from 'inquirer';
import colors from 'colors'

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
               value: '1',
               name: '1. Buscar ciudad' 
            },
            {
                value: '2',
                name: '2. Historial' 
             },
             {
                value: '0',
                name: '3. Salir' 
             }
        ],
    }
]

const inquirerMenu = async() =>{

    console.clear();
    console.log('============================='.green)
    console.log('    Seleccione una opción    '.white)
    console.log('============================='.green)

    const { option } = await inquirer.prompt(menuOpts)

    return option

}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresiona ${'ENTER'.green} para continuar...`,
        }
    ]
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length === 0){
                    return 'Ingresa un valor'
                }
                return true
            }

        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const checkTasks = async(tasks = []) =>{

    const choices = tasks.map( (task, i) =>{
        const idx =`${i+1}.`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completadoEn !== null) ? true : false
        }
    })

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions)
    return ids
}

const listPlaces = async(places = []) =>{

    const choices = places.map( (place, i) =>{
        const idx =`${i+1}.`.green

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
}

const confirmation = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question)
    return ok
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listPlaces,
    confirmation,
    checkTasks
}