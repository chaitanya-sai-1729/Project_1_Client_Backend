const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const {MongoClient,ServerApiVersion} = require("mongodb");
const uri = "mongodb+srv://chaitanyasaim5:chaitanyasai@tracking.5sl6mtx.mongodb.net/Tracking";
const client = new MongoClient(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    serverApi:ServerApiVersion.v1,
});
client.connect;

app.get("/home",(req,res)=>{
    var lat = req.body.latitude;
    var lon = req.body.longitude;
    

    
})
app.post("/home",async(req,res)=>{
    var lat = req.body.latitude;
    var lon = req.body.longitude;
    var _id = req.body._id;

    const collection = client.db().collection("location");

    

    try{
        const allUsers = await collection.find().toArray();
        var len = allUsers.length;
        for(var i=0;i<len;i++){
            if(allUsers[i]._id === _id && lat !="" && lon!=""){
                await collection.updateOne({_id:_id},{latitude:lat,longitude:lon});
            }
        }
        if(lat!="" && lon !=""){

            await collection.insertOne({_id:_id,latitude:lat,longitude:lon});
        }
        res.send("Succesfully Posted");
    }catch(e){
        console.log(e);
    }
})

app.post("/signup",async(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    const collection = client.db().collection("users");

    try{
        await collection.insertOne({_id:username,password:password});
        res.send("Succesfully Posted");

    }catch(e){
        console.log(e);
    }
})

app.get("/users",async(req,res)=>{
    const collection = client.db().collection("users");
    
    try{
        const allUsers =await collection.find().toArray();
        console.log(allUsers);
        res.send(allUsers);
    }catch(e){
        console.log(e);
    }
    
})



app.listen("4000",()=>{
    console.log("Connected to the Server 4000");
})


