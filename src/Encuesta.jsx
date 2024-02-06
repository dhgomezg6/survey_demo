import React, { useState } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { mainQuestion,  createSurveyModel } from './utils/Questions';

import Composting from './components/Composting/index'
import Fertilizing from './components/Fertilizing/index'
import Harvesting from './components/Harvesting/index'
import Maintenance from './components/Maintenance/index'
import Planting from './components/Planting/index'
import Pruning from './components/Pruning/index'
import Spraying from './components/Spraying/index'
import SuppliesPurchase from './components/SuppliesPurchase/index'
import Thinning from './components/Thinning/index'

const Encuesta = () => {
  const [surveyState, setSurveyState] = useState([]);
  const [isPrincipalReady, setIsPrincipalReady] = useState(false);
  const [result, setResult] = useState({});

  let accionPendiente = surveyState.find(accion => !accion.Ready);
  accionPendiente = accionPendiente? accionPendiente['Encuesta']: null; 
  console.log(accionPendiente)
  let survey = null;

  const onCompleteSurvey = (survey) => {
    const resultado = survey.data.actividad.map(accion => {
      return { Encuesta: accion, Ready: false };
    });
    setSurveyState(resultado);
    setIsPrincipalReady(true);
  };

  const onCompleteSecondarySurvey = (survey) => {
    // Update general result
    result[accionPendiente] = survey;
    setResult(result);
    console.log("Result: ", result);
    
    // Update the intertal state of the survey
    const _surveyState = surveyState.map(encuesta => {
      if (encuesta.Encuesta === accionPendiente)
          return { ...encuesta, Ready: true };
      return encuesta;
    });
    console.log("Respuesta: ", survey);
    setSurveyState(_surveyState);
  };

  if(!isPrincipalReady) {
    survey = new Model(createSurveyModel('actividadRealizada', '¿Qué se hizo hoy?', [mainQuestion]));
    survey.onComplete.add(onCompleteSurvey)
  } 

  return (
    <div>
      {!isPrincipalReady && survey &&
        <div className='Survey-style'>
          <Survey model={survey} /> 
        </div>
      }

      {isPrincipalReady && accionPendiente && 
        <div className='Survey-style'>
          { accionPendiente === 'Preparaciones' && <Composting setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Abonar' && <Fertilizing setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Cosechar' && <Harvesting setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Mantenimiento' && <Maintenance setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Sembrar' && <Planting setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Podar' && <Pruning setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Fumigar' && <Spraying setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Compra' && <SuppliesPurchase setEncuestaJson={onCompleteSecondarySurvey} /> }
          { accionPendiente === 'Macanear' && <Thinning setEncuestaJson={onCompleteSecondarySurvey} /> }
        </div>
      }


      {surveyState && (
        <div>
          <h2>Resultado de la encuesta:</h2>
          <pre>{JSON.stringify(surveyState, null, 2)}</pre>
        </div>
      )}
    
    </div>
  );
};

export default Encuesta;
