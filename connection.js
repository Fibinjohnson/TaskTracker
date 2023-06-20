const { MongoClient } = require("mongodb");


const url="mongodb://127.0.0.1:27017";


module.exports.connectDb=async function() {
  try{
    const client=new MongoClient(url);
    await client.connect();
    console.log("connection success");
    db=client.db("TodoDb");
    return db;
  } catch(error){console.log("something error occures:"+error)}
    
   

}