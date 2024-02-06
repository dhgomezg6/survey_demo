import React, { useEffect } from 'react'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { workersOnTaskQuestion, 
  suppliesOnTaskQuestion, 
  createSurveyModel } from '../../utils/Questions';
import { fetchWorkers, fetchSupplies } from '../../api/api';


const Pruning = ({setEncuestaJson}) => {

  const onCompleteSurvey = (survey) => {
    setEncuestaJson(survey.data);
  };

  useEffect(() => {
      // Carga los datos cuando el componente se monta
      const fetchData = async () => {
          try {
              const workers = await fetchWorkers();
              const supplies = await fetchSupplies();

              // Actualiza las preguntas con los datos obtenidos
              workersOnTaskQuestion.choices = workers;
              suppliesOnTaskQuestion.choices = supplies;

              // Actualiza el modelo del survey
              const survey = new Model(createSurveyModel('Podar', 'Actividad Poda', [workersOnTaskQuestion, suppliesOnTaskQuestion]));
              survey.onComplete.add(onCompleteSurvey);
              setSurveyModel(survey); // Guarda el modelo del survey en el estado
          } catch (error) {
              console.error("Error al cargar los datos del survey:", error);
          }
      };

      fetchData();
  }, []);

  // Estado para guardar el modelo del survey
  const [surveyModel, setSurveyModel] = React.useState(null);

  return (
    <div className='Survey-style'>
      {surveyModel ? <Survey model={surveyModel} /> : <p>Cargando...</p>}
    </div>
  )
}

export default Pruning;
