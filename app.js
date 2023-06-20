const express=require("express");
const body=require("body-parser");
const app=express();
const {connectDb}=require("./connection")
const objectId=require("mongodb").ObjectId


app.use(body.urlencoded({extended:true}))
app.use(express.static("public"));

app.set("view engine","ejs");



app.get('/' ,(async(req,res)=>{
let today=new Date();

const db= await connectDb();
const listTodo= await db.collection("listTodo").find({}).toArray();
let options={
    weekday:"long",
    day:"numeric",
    month:"long"
}
day=today.toLocaleDateString("en-US",options)

 res.render("list",{day:day,items:listTodo})

}))
app.post('/',(async(req,res)=>{
   
    let item=req.body.todoItem;
    const db= await connectDb();
    await db.collection("listTodo").insertOne({item})
    const listTodo= await db.collection("listTodo").find({}).toArray();
    console.log(listTodo,"listtodo")
    
    res.redirect('/')
}))
app.post("/delete",(async(req,res)=>{
    console.log( new objectId(req.body.checkbox),"checkbox")
    const db= await connectDb();
    await db.collection("listTodo").deleteOne({ _id: new objectId(req.body.checkbox) });
    res.redirect('/')
}))


app.listen("3000",(()=>{
    console.log("server is running at 3000")
}))