


exports.handler = async function (event, context) {
    event.isBase64Encoded = false;
    console.log("### event.path - ", event.path);

    const getFunctionFromNetlifyPath = require('../utils/netlify-path-parametets-parsing')
    const WRONG_PARAMETERS_ERROR = "cups/ NO PARAMETRS type error"


    const getMongoData = require('../mongo/get-mongo-data');

    const FUNCTION_NAME = 'cups'

    const formErrorResponceObject = (error) => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                count: -1,
                error: error.message
            }
                , null, " ")
        }
    }

    try {
        const [_type, _id] = getFunctionFromNetlifyPath(event.path, FUNCTION_NAME)

        console.log("[_type, _id] - ", _type, _id);

        let _resp = null

        if (_type === 'cup' || _type === 'ids' || _type === 'ecs' || _type === 'extras') {
            try {
                // console.log("nations query - ", _query);
                const answer = await getMongoData(
                    "cups",// _type,
                    _id ? { "_id": _id }
                        : _type === 'ecs'
                            ? { _id: { $regex: /^ec/ } }
                            : _type === 'extras' ? { t: { $gt: 1900 } } : {},
                    {},
                    _type === 'ids'
                        ? { _id: 1 }
                        : _type === 'ecs' || _type === 'extras' ? { _id: 1, name: 1 } : {}
                );
                _resp = answer;
                console.log("_resp   - ", _resp);
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        count: _resp.count,
                        data: _resp.data,
                        error: _resp.data.length ? undefined : "NO_CUP_DATA_FOUND"
                    }
                        , null, " ")
                }

            } catch (error) {
                _resp = error.message;
                console.log(_type + " error", error)
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        count: -1,
                        error: _resp
                    }
                        , null, " ")
                }
            }

        } else {
            console.log("cups/ NO PARAMETRS type error")
            return formErrorResponceObject(WRONG_PARAMETERS_ERROR)
        }
    } catch (error) {
        console.log("cups/ error", error)
        return formErrorResponceObject(error)
    }
}