const express = require('express');
const serverless = require('serverless-http');
const { Router } = require('express');

const basesRouter = Router();

const app = express();

// const DEFAULT_PLAYERS_LIMIT = 40;

// const bodyParser = require('body-parser');
// const jsonParser = express.json()
const getMongoData = require('../mongo/get-mongo-data');

// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({ extended: false })

basesRouter.get('/clubs/', urlencodedParser, async (req, res) => {
    console.log("#### GET clubs Route");
    let _resp = null;
    // const { nation } = req.params;
    try {
        const { id, name } = req.query;
        console.log("#### GET clubs nation  Route");
        const _query = {};
        if (id ) _query._id = parseInt(id) 
        if (name ) _query.name = name 
        const answer = await getMongoData(
            'clubs',
            _query,
            { limit: 7000 }
        );
        _resp = answer;
    } catch (error) {
        _resp = error.message;
        console.log("/clubs/ error", error)
    }
    finally {
        console.log("### finally resp ", _resp)

        res.status(200).json(_resp)
    }
})

basesRouter.get('/nations/', urlencodedParser, async (req, res) => {
    console.log("#### GET nations Route");
    let _resp = null;
    // const { nation } = req.params;
    try {
        const { id, name, namePart } = req.query;
        console.log("#### GET nations nation  Route");
        const _query = {}
        if( id ) _query._id = parseInt(id) 

        if (namePart || name) _query.name = {$regex: name || namePart, $options:"i"}
        // console.log("nations query - ", _query);
        const answer = await getMongoData(
            'nations',
            _query,
            { limit: 300 }
        );
        _resp = answer;
    } catch (error) {
        _resp = error.message;
        console.log("/nations/ error", error)
    }
    finally {
        console.log("### finally resp ", _resp)
        res.status(200).json(_resp)
    }
})


basesRouter.get('/bor/:letter/', urlencodedParser, async (req, res) => {
    console.log("#### GET bor Route");
    let _resp = null;
    const { letter } = req.params;
    try {
        // const { id, name, count } = req.query;
        console.log("#### GET bor  Route");
        const _query = {};
        // id ? _query._id = parseInt(id) : undefined
        if (letter && letter !== 'all')  _query._id = letter.toLocaleLowerCase() 
        const answer = await getMongoData(
            'players-bor',
            _query,
            { limit: 300 }
        );
        _resp = answer;
    } catch (error) {
        _resp = error.message;
        console.log("/bor/ error", error)
    }
    finally {
        console.log("### finally resp ", _resp)
        res.status(200).json(_resp)
    }
})



basesRouter.get('/', urlencodedParser, async (req, res) => {
    console.log("#### GET host record");
    console.log("####### POST query  : ", req.query);
    const _host = await getMongoData('info', { host: { $exists: true } }, {});
    console.log("### host", _host)
    res.json(_host)
})

// module.exports = router
app.use('/.netlify/functions/info', basesRouter);

module.exports.handler = serverless(app)