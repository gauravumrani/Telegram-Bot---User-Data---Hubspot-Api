const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');
var hub_key = "38c61cba-4a3e-4f3d-8aae-6d647378336a";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/submit-contact', (req, res) => {
    var headersOpt = {  
        "content-type": "application/json",
    };
    var formData = {
        "properties": [
            {
                "property": "email",
                "value": "rahul@intecons.com"
            },
            {
                "property": "firstname",
                "value": "Rahul"
            },
            {
                "property": "lastname",
                "value": "Goswami"
            },
            {
                "property": "eth_seed",
                "value": "200"
            },
            {
                "property": "investor_type",
                "value": "1;2;4"
            },
            {
                "property": "ref_code",
                "value": "Aev7sua"
            },
            {
                "property": "add_info",
                "value": "Not, Not Much \n But Okay Good Boy"
            },
            {
                "property": "is_usa",
                "value": "2"
            }
        ]
    }
    console.log(formData)
    request.post({ url: 'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + hub_key, form: JSON.stringify(formData),headers: headersOpt,json: true }, function(err,httpResponse,body){
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
        res.json(body);
    });
})
app.listen(3000, () => console.log('Webhook server is listening, port 3000'));