import React from 'react'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { workersOnTaskQuestion, 
  suppliesOnTaskQuestion, 
  createSurveyModel } from '../../utils/Questions';

const Fertilizing = ({setEncuestaJson}) => {

    const onCompleteSurvey = (survey) => {
        setEncuestaJson(survey.data);
    };

    const survey = new Model(createSurveyModel('Abonar', 
        'Actividad Abonar', 
        [workersOnTaskQuestion, suppliesOnTaskQuestion]));
    survey.onComplete.add(onCompleteSurvey);


  return (
    <div className='Survey-style'>
        <Survey model={survey} /> 
    </div>
  )
}

export default Fertilizing
