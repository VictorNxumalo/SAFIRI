const { MongoClient } = require('mongodb');  
const uri = "mongodb+srv://Victor-Founder:0202035134081aA*@dev-cluster.gykplnc.mongodb.net/?retryWrites=true&w=majority";   // Replace PASSWORD with your actual password!  
const client = new MongoClient(uri);  

async function run() {  
  try {  
    await client.connect();  
    const db = client.db('SafiriCareDB'); // Your DB name  
    const users = db.collection('Users'); // Your collection name  
    const data = await users.find().toArray();  
    console.log("Data from Users collection:", data);  
  } finally {  
    await client.close();  
  }  
}  

run().catch(console.dir);  