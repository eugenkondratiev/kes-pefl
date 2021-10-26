export default async (_apiRef) => {
    // console.log("### _apiRef  - ", _apiRef);
    if (!_apiRef) return {
        count: 0,
        data: [],
        error: "FAULT_API_REF"
    }
    let response
    try {
       response = await fetch(_apiRef);        
    } catch (error) {
        console.log("fetch(_apiRef) error , ", error);
    }
    if (response.status !== 200) throw response.status > 500 ? Error("TIME_LIMIT_EXCEEDED") : Error(response.error);
    // console.log("#### response  - ", response.status);
    // console.log(` #### ${_apiRef} - ", ${response}`);
    const data = await response.json();
    // console.log( " #### FETCH response - " , data);


    return data.data && data.data.length
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