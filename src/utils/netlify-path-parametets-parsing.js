const NETLIFY_FUNCTIONS  = require('./constants').NETLIFY_FUNCTIONS;

// import { NETLIFY_FUNCTIONS } from './constants';

module.exports = (_path, functionName = 'api') => {
    const pathParameters = _path.replace(`${NETLIFY_FUNCTIONS}`, "").split("?")[0].split('/')
    return pathParameters[0] === functionName
        ? pathParameters[1] ? pathParameters.slice(1) : []
        : [];
    // : Error("WRONG_FUNCTION")

}