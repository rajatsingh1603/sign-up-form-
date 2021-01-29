const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is Running Successfully");
})

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){
        const firstName = req.body.fname;
        const lastName = req.body.sname;
        const email = req.body.email;
        
        const data = {
           members: [
               {
                   email_address: email,
                   status: "subscribed",
                   merge_fields: {
                       FNAME: firstName,
                       LNAME: lastName
                   }
               }
           ]
        }

        const jsonData = JSON.stringify(data);
        
        const url = "https://us7.api.mailchimp.com/3.0/lists/264c10fff1";
        const options = {
            method: "POST",
            auth: "rajat:3cc8021fb7f1f27059f63c42103afe45-us7"
        }
       const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })
    
request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/")

})


// 3cc8021fb7f1f27059f63c42103afe45-us7   api key

//  264c10fff1 listid 

