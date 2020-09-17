export default async () => {
    const response = await fetch('/.netlify/functions/api/info');
    console.log( " #### host-test - " , response);
    const data = await response.json();
    console.log( " #### response - " , data);

    if (response.status != 200) throw Error(data.message);

    return data.data[0]
} 