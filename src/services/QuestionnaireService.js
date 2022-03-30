const API_URL = "http://localhost:8082/api/";
export const envoyerQuestionnaire = async (questionnaire) => {
  const response = fetch(API_URL + "/AddOrUpdate", {
    method: "POST",
    body: JSON.stringify(questionnaire),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ajouter questionnaire : ", data);
      return data;
    })
    .catch((error) => {
      console.error("Erreur ajouter questionnaire", error);
      return error;
    });

  return response;
};
