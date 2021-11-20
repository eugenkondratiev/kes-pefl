import { useEffect, useState } from "react";
import fetchApiData from "../../mongo/fetch-api-data";


export default function useData(endpoint, parameters, dependencies = [], options = { notNullParameters: false }) {

    const [cupData, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                if (options.notNullParameters && !parameters) {

                } else {
                    let answer
                    try {

                        answer = await fetchApiData(`${endpoint}/${parameters && parameters}`)
                    } catch (error) {
                        console.log("#### fetchApiData error -", error.message);
                        setIsError(true);

                    }
                    if (answer.error) {
                        console.log("#### useData fetching error ", answer.error);

                        setIsError(true);
                    } else {
                        setData(answer.data[0]);
                        setIsError(false);
                    }
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