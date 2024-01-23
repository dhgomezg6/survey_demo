export const mainQuestion = {
    type: 'checkbox',
    name: 'actividad',
    title: '¿Qué se hizo hoy?',
    isRequired: true,
    colCount: 1,

    choices: ['Sembrar', 'Macanear', 'Fumigar', 
    'Abonar', 'Podar', 'Compras', 'Cosechar',
    'Preparaciones', 'Mantenimiento'],
}

export const workersOnTaskQuestion = {
    type: 'tagbox',
    name: 'quienesHicieron',
    closeOnSelect: true,
    title: '¿Quiénes lo hicieron?',
        choices: [
        "Vicente", "Libardo"
        ]
}

export const suppliesOnTaskQuestion = {
    type: 'tagbox',
    name: 'quienesHicieron',
    closeOnSelect: true,
    title: '¿Con que lo hicieron?',
        choices: [
        "Arboles1", "Arboles2"
        ]
}

export const createSurveyModel = (name, title, questions) => {
    return {
      "pages": [{
        name: `${name}`,
        title: `${title}`,
        elements: questions
      }]
    }
}
