/*
use blog
db.createUser(
   {
     user: "root",
     pwd: "toor",
     roles:
       [
         { role: "readWrite", db: "blog" }
       ]
   }
)
*/

//const port = 27017;
const password = 'satisfied1';
const user = 'riise';

module.exports = {
  //uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
  uri: `mongodb://${user}:${password}@ds141720.mlab.com:41720/satisfaction`,
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};