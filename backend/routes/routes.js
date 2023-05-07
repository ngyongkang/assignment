
module.exports = (function() {
    'use strict';
    var app = require('express').Router();
    var fs = require('fs');
    var path = require('path');
    var csv = require('csv');

    const formData = require('express-form-data');

    app.get('/users', function(req,res){
        var fileContent = fs.readFileSync("database.json");
        var json = JSON.parse(fileContent.toString());

        res.status(200).send(json);
    });

    app.post('/users/upload', formData.parse(), function (req, res) {
        
        const file = req.files;

        var fileContent = fs.readFileSync("database.json");
        var json = JSON.parse(fileContent.toString());
        

        Object.values(file).forEach((e) => {

            fs.createReadStream(e['path'])
            .pipe(csv.parse({trim: true, fromLine: 2}))
            .on("data", (data) => {
                //Condition to check if first column contains # to determine it is a comment.
                if(!data[0].includes("#")) {
                    
                    var dataObject = {
                        id:"",
                        login:"",
                        name: "",
                        salary: 0.0,
                    }

                    dataObject.id = data[0] || null;
                    dataObject.login = data[1] || null;
                    dataObject.name = data[2] || null;
                    dataObject.salary = Number(data[3]) || null;

                    //First condition, Checks for any null values
                    if(dataObject.id != null && dataObject.login != null 
                        && dataObject.name != null && dataObject.salary != null) {
                            //Second condition checks for any data that has the 
                            //same id currently in the database.
                            if(!json.data.some(element => element.id === dataObject.id || element.login === dataObject.login ))
                                json.data.push(dataObject);
                            else {
                                //Else condition then insert data into the proper slot of the json database.
                                let index = json.data.findIndex((element) => element.id === dataObject.id);
                                console.log("Located ID:",json.data[index]);
                                json.data[index] = dataObject;
                            }
                        }
                        
                }
                    
            })
            .on("end", () => {
                console.log(json);
                fs.writeFileSync("database.json", JSON.stringify(json, null, 4));
            });
        })

        res.send(json).status(200);
    });

    return app;
})();