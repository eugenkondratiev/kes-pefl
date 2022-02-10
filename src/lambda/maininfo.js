


exports.handler = async function (event, context) {
    event.isBase64Encoded = false;
    console.log("### event.path - ", event.path);

    const getFunctionFromNetlifyPath = require('../utils/netlify-path-parametets-parsing')
    const WRONG_PARAMETERS_ERROR = "maininfo/ NO PARAMETRS type error"


    const getMongoData = require('../mongo/get-mongo-data');

    const FUNCTION_NAME = 'maininfo'

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

        console.log("[_type, _id] [_type, _id] - ", _type, _id);

        let _resp = null

        if (_type === 'nations' || _type === 'clubs') {
            try {
                // console.log("nations query - ", _query);
                const answer = await getMongoData(
                    _type,
                    _id ? { "_id": +_id } : {},
                    {}
                );
                _resp = answer;
                console.log("_resp   - ", _resp);
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        count: _resp.count,
                        data: _resp.data,
                        error: _resp.data.length ? undefined :
                            _type === 'nations' ? "NO_NATIONS_FOUND" : "NO_CLUB_FOUND"
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

        } else if (_type === 'pairs') {
            try {
                const _pairs = await getMongoData('info', { pairs: { $exists: true } });
                console.log("### pairs", _pairs)
                _resp = _pairs
            } catch (error) {
                console.log(_type + " error", error)
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        count: -1,
                        error: "PAIRS_GETTING_FAULT"
                    }
                        , null, " ")
                }

            }
        }
        else {
            console.log("maininfo/ NO PARAMETRS type error")
            return formErrorResponceObject(WRONG_PARAMETERS_ERROR)
        }
    } catch (error) {
        console.log("maininfo/ error", error)
        return formErrorResponceObject(error)
    }
}