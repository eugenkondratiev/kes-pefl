// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//     app.use(
//         proxy('./netlify/functions',{
//             target: 'http://loaclhost:9000',
//             pathRewrite: {
//                 '^/\\.netlify/functions': '',
//             }
//         }),
//     );
// }


const proxy = require('http-proxy-middleware').createProxyMiddleware;
console.log(" =========================================== ")
console.log(" =========================================== ")
console.log("#### proxy  ", proxy);
module.exports = function(app) {
  app.use(
    proxy('/.netlify/functions/', {
      target: 'http://localhost:9000/',
      pathRewrite: {
        'http://localhost:8080/': '',
        // '^/\\.netlify/functions': '',
      },
    }),
  );
};