const express = require("express")

const bodyParser = require("body-parser")
const mongoose = require('mongoose');


const app = express()

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))




main().catch(err => console.log(err));

async function main() {
   
  await mongoose.connect('mongodb://127.0.0.1:27017/Test_Db');
  
  
}

const  dataSchema = mongoose.Schema({
    name: String,
    textarea:String,
    idLo:String,
    phone:String
})

const Data = new mongoose.model("Datas",dataSchema);



app.get("/",function(req,res){

    Data.find().exec(function(err,doc){
        res.render("index",{list:doc});
    })
    
})

app.post("/add",function(req,res){

    const data = new Data({
        name:req.body.name,
        textarea:req.body.textarea,
        idLo:req.body.idLo,
        phone:req.body.phone
    })
    data.save()
    res.redirect("/")

    
})

app.post("/update",function(req,res){
    const update_id = (req.body.update_id).trim();
    const data = {
        name:req.body.name,
        textarea:req.body.textarea,
        idLo:req.body.idLo,
        phone:req.body.phone
    }
    Data.findByIdAndUpdate(update_id,data,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })

})

app.get("/del/:id",function(req,res){
   Data.findByIdAndRemove(req.params.id,function(err){
    if(err){
        console.log(err)

    }else{
        console.log("Sus")
        res.redirect("/")
    }
   })
})

app.get("/up/:id",function(req,res){
    const upId = req.params.id

    Data.findOne({_id:upId},function(err,doc){
        console.log(doc)
        res.render("edit",{list:doc})
    })    

})




app.listen(3000,function(req,res){
    console.log("Sart port 3000")
})