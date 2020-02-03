const { MongoClient, ObjectId } = require('mongodb')
const ObjectID = require('mongodb').ObjectID;

const connectionUrl = ''// REDACTED FOR SECURITY
const dbName = 'AFAM'
const uri ='' // REDACTED FOR SECURITY
   

const selCol = 'UserPoints';

let db

const init = () =>
MongoClient.connect(connectionUrl, { useNewUrlParser: true,  useUnifiedTopology: true  }).then((client) => {
  db = client.db(dbName)
  console.log("server connected");
})

const addUser = (user) => {
  const collection = db.collection(selCol)
  
  return collection.insertOne({Username : user, Account: 0}, function(err,res) {
    if (err) throw err;
    console.log("doc inserted");
    console.log(res);
});
}

const getUser = (userName) => {
  const collection = db.collection('UserPoints')
  return new Promise((resolve, reject)=> {
  collection.findOne({Username : userName}, function(err, result){
    if(err) return;
    
    //console.log(result);
    resolve(result)
  }
 )
})
}

const updateAccount = (id, quantity) => {
let id2 = '672802697467920424';
  const collection = db.collection('UserPoints')
  //return collection.updateOne({ _id: ObjectId('5e352b2a1c9d4400002bd1ef') }, { $inc: { quantity } })

  collection.updateOne({'_id':ObjectID(id)}, {$set: {Account : quantity}}, {w:1}, function(err, result){
   // console.log(result);
}
  )}




module.exports = { init, addUser, getUser, updateAccount}
