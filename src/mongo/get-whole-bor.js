export default async () => {
    const response = await fetch('/.netlify/functions/api/bor');
    if (response.status !== 200) throw response.status > 500 ? Error("TIME_LIMIT_EXCEEDED") : Error(response.error);
    console.log(" #### host-test - ", response);
    const data = await response.json();
    // console.log( " #### response - " , data);


    return data.data.length
        ? {
            count: data.data.length,
            data: data.data,
            error: undefined
        }
        : {
            count: 0,
            data: [],
            error: data.message
        }
} 