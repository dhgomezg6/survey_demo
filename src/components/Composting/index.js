import React from 'react'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { workersOnTaskQuestion, 
  suppliesOnTaskQuestion, 
  createSurveyModel } from '../../utils/Questions';

const Composting = ({setEncuestaJson}) => {

    const onCompleteSurvey = (survey) => {
        setEncuestaJson(survey.data);
    };

    const survey = new Model(createSurveyModel('Preparacion Abonos', 
        'Preparacion Abonos', 
        [workersOnTaskQuestion, suppliesOnTaskQuestion]));
    survey.onComplete.add(onCompleteSurvey);


  return (
    <div className='Survey-style'>
        <Survey model={survey} /> 
    </div>
  )
}

export default Composting
