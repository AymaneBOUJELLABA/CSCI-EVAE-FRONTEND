const API_URL =
  "http://localhost:8082/api/evaluations/ue/?codeUe=ISI&anneeUniv=2014-2015";

export const getAllEvaluation = async () => {
  const response = fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Get evaluation : ", data);
      return data;
    })
    .catch((error) => {
      console.error("Erreur get All evaluation", error);
      return error;
    });

  return response;
};


export const getAllEvaluationsPublished = async () => {
  const api = "http://localhost:8082/api/evaluations/publiees";
  
  const response = fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Get evaluation : ", data);
      return data;
    })
    .catch((error) => {
      console.error("Erreur get All evaluation", error);
      return error;
    });

  return response;
}
