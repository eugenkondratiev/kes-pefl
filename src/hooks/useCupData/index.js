import { useEffect, useState } from "react";
import fetchApiData from "../../mongo/fetch-api-data";


export default function useData(endpoint, parameters, dependencies = []) {

    const [cupData, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const answer = await fetchApiData(`${endpoint}/${parameters && parameters}`)
                if (answer.error) {
                    console.log("#### useData fetching error ", answer.error);

                    setIsError(true);
                } else {
                    setData(answer.data[0]);
                    setIsError(false);
                }
            } catch (error) {
                console.log("#### useData error ", error);
                setIsError(true);
            } finally {
                setIsLoading(false)
            }
        }
        getData().catch(err => console.log(" #### useData getData error - ", err))
    }, dependencies)

    return {
        cupData,
        isLoading,
        isError
    }

}