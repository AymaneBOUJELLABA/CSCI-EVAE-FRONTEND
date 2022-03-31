const API_URL = "http://localhost:8082/api/evaluations/reponses/graphes";

export const getGraph = async () => {
  const response = fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Get graph : ", data);
      return data;
    })
    .catch((error) => {
      console.error("Erreur get graph", error);
      return error;
    });

  return response;
};
