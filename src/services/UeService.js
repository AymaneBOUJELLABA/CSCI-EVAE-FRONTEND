


export const getUeByCode = async (code) =>
{
    try
    {
        const response = await fetch('http://localhost:8082/api/ue/'+code,
        {
            method:'GET'
        });

        const json = await response.json();
        return json;

    }catch(e)
    {
        console.error("error get ue by code : ",e);
    }
    
}