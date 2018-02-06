const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');
var hub_key = "38c61cba-4a3e-4f3d-8aae-6d647378336a";
var mongoose=require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const TelegramBot = require('./telegrambot');
const TelegramBotConfig = require('./telegrambotconfig');

const REST_PORT = (process.env.PORT || 3000);
const DEV_CONFIG ='true';
const APIAI_ACCESS_TOKEN = "6d57aa97f2cf49459d03afdc6c09dace";
const APIAI_LANG = "en";
const TELEGRAM_TOKEN = "548428895:AAGb7UuHiuCQC2GsqMiTqgP5fb3j85KgLO0";
const APP_NAME="https://f7d883c6.ngrok.io"
var baseUrl = "";
if (APP_NAME) {
    // Heroku case
    baseUrl = APP_NAME;
} else {
    console.error('Set up the url of your service here and remove exit code!');
    process.exit(1);
}
mongoose.connect('mongodb://localhost:27017/bot');

const botConfig = new TelegramBotConfig(
    APIAI_ACCESS_TOKEN,
    APIAI_LANG,
    TELEGRAM_TOKEN);

botConfig.devConfig = DEV_CONFIG;

const bot = new TelegramBot(botConfig, baseUrl);
bot.start(() => {
    console.log("Bot started");
},
    (errStatus) => {
        console.error('It seems the TELEGRAM_TOKEN is wrong! Please fix it.')
});

app.post('/webhook', (req, res) => {
    console.log('POST webhook');

    try {
        bot.processMessage(req, res);
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }
});
/* app.post('/submit-contact', (req, res) => {
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
    request.post({ url: 'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + hub_key, form: JSON.stringify(formData), headers: headersOpt, json: true }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
        res.json(body);
    });
}) */
app.listen(REST_PORT, () => console.log(`Webhook server is listening, port ${REST_PORT}`));