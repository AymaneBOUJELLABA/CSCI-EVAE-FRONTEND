const API_URL = 'http://localhost:8082/api/rubriques';



const findAllRubriques = async () => 
{
    try
    {
        const response = await fetch(API_URL,
            {
                method : 'GET'
            }
        );
        const json = await response.json();
        return json;
    }catch(e)
    {
        throw new Error(e);
    }
}