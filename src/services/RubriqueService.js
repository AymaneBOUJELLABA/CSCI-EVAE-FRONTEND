const API_URL = "http://localhost:8082/api/rubriques";


export const getAllRubriques = async () =>
{
    
    const response = fetch(API_URL,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
      {
        
        console.log("Get all rubriques : ", data);
        return data;
      })
      .catch((error) =>
      {
          console.error("Erreur get All rubriques", error);
          return error;
      });

      return response;
}


export const ajoutRubrique = async (rubrique) =>
{
    const response = fetch(API_URL+'/AddOrUpdate',
    {
        method: "POST",
        body : JSON.stringify(rubrique),
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) =>
    {
    
        console.log("Ajouter rubrique : ", data);
        return data;
    })
    .catch((error) =>
    {
        console.error("Erreur ajouter rubrique", error);
        return error;
    });

    return response;
}
