const API_URL = "http://localhost:8082/api/rubriques";


const getAllRubriques = async () =>
{
    let response;
    let error;
    
    fetch(API_URL,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
      {
        response = data;
        console.log("Get all rubriques : ", response);
      })
      .catch((error) =>
      {
        error = error
      });
      return {
          data : response,
          error : error
      }
}