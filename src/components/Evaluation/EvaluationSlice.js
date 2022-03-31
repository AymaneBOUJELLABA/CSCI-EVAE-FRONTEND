import { getGraph } from "../../services/StatistiqueGraph";

const url = "http://localhost:8082/api/"; 


export const getUeDetails = async (codeUe) =>
{
    try
    {
        const response = await fetch('http://localhost:8082/api/ue/'+codeUe,
        {
            method:'GET'
        });

        const json = response.json();

        return json;

    }catch(e)
    {
        console.error(e);
    }
}


export const getEvaluationOfUe = async(codeUe) => {
    try
    {
      const response = await fetch('http://localhost:8082/api/evaluations/ue?codeUe='+codeUe+'&anneeUniv=2014-2015',
      {
        method:'GET'
      });
      const json = response.json();
      return json;
    }catch(e)
    {
      console.error(e)
    }
}
  
export const getEvalParId = async (id) => {
    try
    {
        const res = await fetch(url + "evaluations/"+id,
        {
            method:'GET'
        });
    
        const json = await res.json();
        
        return json;
    }catch(e)
    {
        console.error(e);
    }
    
  }

  export const getrubriques = async (id) =>
  {
      try
      {
        const url = process.env.REACT_APP_SERVER_URL;
        const res = await fetch(url + "evaluations/rubriques/",
        {
            method:'GET'
        });
    
        const json = await res.json();
        
        return json;
      }catch(e)
      {
          console.error(e)
      }
    
  }

  export const ajoutEvaluation = async (evaluation) =>
  {
    evaluation.rubriques.map((el,i) => {
        el.questions = []
    })

    console.log("data to send to backend evaluation : ", evaluation);

    
      const response = fetch(url+"evaluations",
      {
          method: "POST",
          body : JSON.stringify(evaluation),
          headers: {
          "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((data) =>
      {
      
          console.log("Ajouter evaluation : ", data);
          return data;
      })
      .catch((error) =>
      {
          console.error("Erreur ajouter evaluation", error);
          return error;
      });
  
      return response;
  }

  export const getStudentsNumber = async (codeFormation, anneeUniv) =>
{
    try
    {
        const response = await fetch('http://localhost:8082/api/evaluations/students?codeFormation='+codeFormation+'&anneeUniv='+anneeUniv,
        {
            method:'GET'
        });

        const json = response.json();

        return json;

    }catch(e)
    {
        console.error(e);
    }
}

export const getStudentsUnswerNumber = async (id) =>
{
    try
    {
        const response = await fetch('http://localhost:8082/api/evaluations/'+id+'/details',
        {
            method:'GET'
        });

        const json = response.json();
        return json;

    }catch(e)
    {
        console.error(e);
    }
}
export const getAverageUnswer = async () =>
{
    //codeFormation
    //reponseEvaluation
        //rubriques
        //codeUe
    //anneuniv
    try
    {
        const response = await getGraph();

        return response;

    }catch(e)
    {
        console.error(e);
    }
}