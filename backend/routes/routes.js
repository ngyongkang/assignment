
module.exports = (function() {
    'use strict';
    var app = require('express').Router();
    var fs = require('fs');
    var path = require('path');
    var csv = require('csv');

    var jsonDB = [];
    var dataObject = {
        id:"",
        login:"",
        name: "",
        salary: 0.0,
    }

    const formData = require('express-form-data');

    app.post('/users/upload', formData.parse(), function (req, res) {
        
        const file = req.files;

        let result = [];

        Object.values(file).forEach((e) => {
            // console.log(e['path'])

            fs.createReadStream(e['path'])
            .pipe(csv.parse({trim: true}))
            .on("data", (data) => {
                result.push(data);
            })
            .on("end", () => {
                console.log(result);
                res.send(result);
            });
        })
    });

    return app;
})();