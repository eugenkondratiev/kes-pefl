
exports.handler = async function (event, context) {
    let resp = event.path;
    console.log("### event - ", event);
    event.isBase64Encoded = false;
    // console.log("### context - ", context);

    const formMongoQuery = require('../mongo/form-mongo-query')

    const getMongoData = require('../mongo/get-mongo-data');
    const getPlayersFromResponse = require('../utils/get-player-from-response');

    const DEFAULT_PLAYERS_LIMIT = 40;


    console.log("#### GET all-players allbase clear lambda!!!!");
    // let _resp = null;
    // const { name } = req.params;
    console.log(" ##### = event.queryStringParameters -", event.queryStringParameters);
    const _q = formMongoQuery(event.queryStringParameters);
    console.log(" ##### = _q -", _q);
    let answer;
    try {
        answer = await getMongoData(
            'allbase',
            _q.filter,
            _q.pagination,
            // _query,
            // { limit: 70000, start: false },
            // { limit: +_limit || false, start: _start || false },
            // { [`${_projection}`]: 1 }
        );

        const players = answer.count ? answer.data : [];
        console.log("##### players - ", players)
            ;
        return {
            statusCode: 200,
            headers: {'Content-type: text/html; charset=utf-8'},
            body: JSON.stringify({
                count: answer.count,
                data: players,
                error: players.length ? undefined : "NO_PLAYER_FOUND"
            })
        }

    } catch (error) {
        console.log("/bor/ error", error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                count: -1,
                error: error.message
            }
                , null, " ")
        }
    }



}