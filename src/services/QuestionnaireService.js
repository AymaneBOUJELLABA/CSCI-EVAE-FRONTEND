const API_URL = "http://localhost:8082/api/evaluations/reponses";
export const envoyerQuestionnaire = async (questionnaire) => {
  questionnaire = {
    ...questionnaire,
    idEtudiant: "21406882",
  };
  console.log("questionnaire to POST : ", questionnaire);
  const response = fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(questionnaire),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json(); //we only get here if there is no error
    })
    .then((json) => {
      if (json.message && json.stackTrace) return { error: json };
      return { data: json };
    })
    .catch((err) => {
      err.json().then((errorMessage) => {
        console.log("ERROR MESSAGE  :", errorMessage);
        return { error: errorMessage };
      });
    });

  return response;
};
