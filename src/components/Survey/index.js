import React from 'react'

const CustomSurvey = (name, title, questions, onCompleteSurvey) => {

    const createSurveyModel = (_name, _title, _questions) => {
        return {
            "pages": [{
                name: `${_name}`,
                title: `${_title}`,
                elements: _questions
            }]
        }
    }

    const surveyJson = createSurveyModel(name, title, questions)
    const survey = new Model(surveyJson);
    survey.onComplete.add(onCompleteSurvey);

    return (
        <div className='Survey-style'>
            <Survey model={survey} /> 
        </div>
    )
}

export default CustomSurvey