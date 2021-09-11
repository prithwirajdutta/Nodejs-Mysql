const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
const app = express()
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });
   
app.get('/fetchingdata',(req,res)=>{
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "select * from registertb";
        con.query(sql,function(err,result){
            res.json(result)
        })
        });
})
app.get('/displaypage',(req,res)=>{
    res.sendFile(__dirname+'/public/display.html')
})
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.get('/formpage',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})
app.post('/enter',(req,res)=>{
       var name = req.body.name;
       var email = req.body.email;
       con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "insert into registertb(name,email)values('"+name+"','"+email+"')";
        con.query(sql,function(err,result){
           res.sendFile(__dirname+"/public/success.html");
        })
        });
})
app.listen(3000,()=>{
    console.log('listening at port 3000')
})