
const express = require('express');
const serverless = require('serverless-http');

const app = express();

const { jsonParser } = require('express');
// const url = require('url');
// const querystring = require('querystring');
// const { Router } = require('express');
const normName = require('../utils/normalize-name');
console.log("find Players   I1m here !!!");
const findPlayerRouter = express.Router();
const formMongoQuery = require('../mongo/form-mongo-query')

const getMongoData = require('../mongo/get-mongo-data');
const getPlayersFromResponse = require('../utils/get-player-from-response');

const DEFAULT_PLAYERS_LIMIT = 40;

console.log("### OLOLOL - ",);
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

// const urlencodedParser = express.urlencoded({ extended: false })
console.log("#####   urlencodedParser done1 0");
findPlayerRouter.get('/bor/', async (req, res) => {
    console.log("#### GET find-players bor Route");
    let _resp = null;
    // const { name } = req.params;

    try {

        const { limit, start: _start = false, count, name = " " } = req.query;

        const normalizedName = normName(name);
        const firstLetter = normalizedName[0];
        const restName = normalizedName.slice(1);
        const _projection = [...restName].join('.') + '.pl';
        console.log("name", name, firstLetter, restName);
        console.log("_projection", _projection);
        console.log("####### get bor query  : ", req.query);
        const answer = await getMongoData(
            'players-bor',
            { _id: firstLetter },
            { limit: 5, start: false },
            { [`${_projection}`]: 1 }
        );

        console.log("### resp info", answer);

        // console.log("### resp info", answer && answer.data.length);
        const players = answer.count ? getPlayersFromResponse(answer.data[0], restName) : [];
        console.log("players - ", players);
        _resp = {
            count: players.length,
            data: players,
            error: players.length ? undefined : "NO_PLAYER_FOUND"
        };
        // _resp = _count ? answer.length : answer
    } catch (error) {
        _resp = error.message;
        console.log("/bor/ error", error)
    }
    finally {
        console.log("### finally resp ", _resp)

        res.json(_resp)

    }

})
console.log("WAS?????");
findPlayerRouter.get('/allbase/', async (req, res) => {
    console.log("#### GET all-players allbase !!!!");
    // let _resp = null;
    // const { name } = req.params;
    console.log(" ##### = req.query -", req.query);
    const _q = formMongoQuery(req.query);
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
        res.json({
            count: answer.count,
            data: players,
            error: players.length ? undefined : "NO_PLAYER_FOUND"
        })

    } catch (error) {
        console.log("/bor/ error", error)
        res.json(error.message)
    }

    // console.log("### resp count", answer.count);

})

console.log("WAS????? allbase");

findPlayerRouter.get('/allfirebase/', async (req, res) => {
    console.log("#### GET all-players from firebase");
    let _resp = null;
    // const { name } = req.params;
    try {
        const _db = new require('../firebase/_firebase')();
        console.log("_db imported");
        const _all = await _db.getFolder("allbase")
        console.log("_all ");
        const answer = _all.once('value');

        // const answer =  await _db.getFolder("allbase").once('value');


        console.log("### resp count", answer);

        const players = await answer.val();
        console.log("  players ###  ", players)
        // const players = answer.count ? answer.data : [];
        _resp = { _ok: true };

        // _resp = {
        //     count: players.length,
        //     data: players,
        //     error: players.length ? undefined : "NO_PLAYER_FOUND"
        // };
    } catch (error) {
        _resp = error.message;
        console.log("#### GET all-players from firebase error", error)
    }
    finally {
        // console.log("### finally resp ", _resp)
        res.json(_resp)
    }
})
console.log("WAS????? allfirebase");


findPlayerRouter.get('/:nation/', async (req, res) => {
    // findPlayerRouter.get('/:nation/', urlencodedParser, async (req, res) => {
    console.log("#### GET find-players XXX Route");
    let _resp = null;
    const { nation } = req.params;
    console.log(" ##### : nation - ", nation);

    try {
        const { limit, start: _start = false, count } = req.query;
        const _count = count || (!limit && !_start);
        const _limit = _count ? false : (limit || DEFAULT_PLAYERS_LIMIT);
        console.log("####### get nation query  : ", req.query);
        console.log("####### _limit _start _count  : ", _limit, _start, _count);

        console.log("####### get nation params : ", req.params, "  nation = ", nation, +nation, +nation ? { "nation": +nation } : {});
        console.log("#### GET find-players nation  Route");

        const answer = await getMongoData(
            'allbase',
            +nation ? { "nation": nation } : {},
            { limit: +_limit || false, start: _start || false }
        );

        console.log("### resp info", answer);

        // console.log("### resp info", answer && answer.data.length);

        _resp = _count ? answer.count : answer;
        // _resp = _count ? answer.length : answer
    } catch (error) {
        _resp = error.message;
        console.log("/:nation/ error", error)
    }
    finally {
        console.log("### finally resp ", _resp)

        res.json(_resp)

    }

})


findPlayerRouter.get('/', async (req, res) => {
    console.log("#### GET find-players Route");
    // const params = url.parse(req.url, true).query;
    // const _q = req.query;
    const { limit: _limit = 20, start: _start = false } = req.query;

    // const _name = params["name"];
    // // console.log(params);
    // console.log("#### body : ", req.body);
    // console.log("#### body json : ", JSON.parse(req.body || {}));

    console.log("####### POST query  : ", req.query);
    // console.log("####### POST _nation  : ", _nation);

    const _base = await getMongoData('allbase', {}, { limit: +_limit || 20, start: _start || false });
    console.log("### info", _base.length)
    res.json(_base)
})




// findPlayerRouter.post('/', jsonParser, async (req, res) => {
//     console.log("#### POST info Route");
//     // const params = url.parse(req.url, true).query;
//     // const _q = req.query;
//     const { nation: _nation = 170 } = req.query;

//     // const _name = params["name"];
//     // console.log(params);
//     console.log("#### body : ", req.body);
//     console.log("#### body json : ", JSON.parse(req.body || {}));

//     console.log("####### POST query  : ", req.query);
//     console.log("####### POST _nation  : ", _nation);

//     // const _base = await require('../../mongo/get-mongo-data')('allbase', { "nation": +_nation });
//     // console.log("### info", _base.length)
//     res.send(200);
// })

console.log("WAS????? post ////");


// module.exports = router
app.use('/.netlify/functions/findPlayer', findPlayerRouter);

module.exports.handler = serverless(app)