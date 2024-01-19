import React, { useState } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import CarruselComponent from './CarrouselComponent';

const Encuesta = () => {
  const [encuestaJson, setEncuestaJson] = useState(null);
  const [isPrincipalReady, setIsPrincipalReady] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  const seleccion = ['Sembrar', 'Macanear', 'Fumigar']

  const onCompleteSurvey = (survey) => {
    setEncuestaJson(survey.data);
    setIsPrincipalReady(true);
    // Puedes guardar el JSON resultante en tu backend o donde lo necesites.
  };

  const onCompleteSecondarySurvey = (survey) => {
    // Aquí manejas el resultado de la encuesta secundaria
    // Por ejemplo, guardarlo en el backend o actualizar el estado
    console.log("Encuesta secundaria completada para: ", encuestaJson.actividad[currentActivityIndex]);
    console.log("Respuesta: ", survey.data);

    // Avanzar al siguiente slide o finalizar
    if (currentActivityIndex < encuestaJson.actividad.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      // Todas las encuestas secundarias están completas
      console.log("Todas las encuestas secundarias completadas");
    }
  };

  const surveyJson = {
    "pages": [
        {
            name: 'actividadRealizada',
            title: '¿Qué se hizo hoy?',
            elements: [
                {
                    type: 'checkbox',
                    name: 'actividad',
                    title: '¿Qué se hizo hoy?',
                    isRequired: true,
                    colCount: 1,

                    choices: ['Sembrar', 'Macanear', 'Fumigar', 
                    'Abonar', 'Podar', 'Compras', 'Cosechar',
                    'Preparaciones', 'Mantenimiento'],
                  },
            ]
        },
        
    ]
  }

  const workersOnTaskQuestion = {
    type: 'tagbox',
    name: 'quienesHicieron',
    closeOnSelect: true,
    title: '¿Quiénes lo hicieron?',
      choices: [
        "Vicente", "Libardo"
      ]
  }

  



  const survey = new Model(surveyJson);
  survey.onComplete.add(onCompleteSurvey)


  return (
    <div>
    {!isPrincipalReady && 
      <div className='Survey-style'>
        <Survey model={survey} /> 
      </div>
    }  
   
    {isPrincipalReady && seleccion.map(item => {
      if(item === 'Sembrar') {

        const surveyJson2 = {
          "pages": [
          {
            name: 'actividadSembrar',
            title: 'Sembrar',
            elements: [workersOnTaskQuestion,]
          }
          ]
        }
        
        const secondarySurvey = new Model(surveyJson2);
        secondarySurvey.onComplete.add(onCompleteSecondarySurvey);

        return <div className='Survey-style'>
            <Survey model={secondarySurvey} /> 
          </div>
      }

      const surveyJson3 = {
        "pages": [
        {
          name: 'actividadSembrar',
          title: `${item}`,
          elements: [workersOnTaskQuestion,]
        }
        ]
      }
      
      const thirdSurvey = new Model(surveyJson3);
      thirdSurvey.onComplete.add(onCompleteSecondarySurvey);

      return <div className='Survey-style'>
          <Survey model={thirdSurvey} /> 
        </div>
    })}

      {encuestaJson && (
        <div>
          <h2>Resultado de la encuesta:</h2>
          <pre>{JSON.stringify(encuestaJson, null, 2)}</pre>
        </div>
      )}
    
    </div>
  );
};

export default Encuesta;
