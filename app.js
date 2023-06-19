const express=require("express");
const body=require("body-parser");
const app=express();
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"));

app.set("view engine","ejs");
let items=[]

app.get('/' ,((req,res)=>{
let today=new Date();

 
let options={
    weekday:"long",
    day:"numeric",
    month:"long"
}
day=today.toLocaleDateString("en-US",options)

 res.render("list",{day:day,items:items})

}))
app.post('/',((req,res)=>{
   let item=req.body.todoItem;
  
    items.push(item);
    res.redirect('/')
}))


app.listen("3000",(()=>{
    console.log("server is running at 3000")
}))