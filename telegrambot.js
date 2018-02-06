/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const request = require('request');
const botSchema = require('./bot');
const hub_key = "38c61cba-4a3e-4f3d-8aae-6d647378336a";
module.exports = class TelegramBot {

    get apiaiService() {
        return this._apiaiService;
    }

    set apiaiService(value) {
        this._apiaiService = value;
    }

    get botConfig() {
        return this._botConfig;
    }

    set botConfig(value) {
        this._botConfig = value;
    }

    get sessionIds() {
        return this._sessionIds;
    }

    set sessionIds(value) {
        this._sessionIds = value;
    }

    constructor(botConfig, baseUrl) {
        this._botConfig = botConfig;
        var apiaiOptions = {
            language: botConfig.apiaiLang,
            requestSource: "telegram"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();

        this._webhookUrl = baseUrl + '/webhook';
        console.log('Starting bot on ' + this._webhookUrl);

        this._telegramApiUrl = 'https://api.telegram.org/bot' + botConfig.telegramToken;
    }

    start(responseCallback, errCallback) {
        // https://core.telegram.org/bots/api#setwebhook
        request.post(this._telegramApiUrl + '/setWebhook', {
            json: {
                url: this._webhookUrl
            }
        }, function (error, response, body) {

            if (error) {
                console.error('Error while /setWebhook', error);
                if (errCallback) {
                    errCallback(error);
                }
                return;
            }

            if (response.statusCode != 200) {
                console.error('Error status code while /setWebhook', body);
                if (errCallback) {
                    errCallback('Error status code while setWebhook ' + body);
                }
                return;
            }

            console.log('Method /setWebhook completed', body);
            if (responseCallback) {
                responseCallback('Method /setWebhook completed ' + body)
            }
        });
    }

    processMessage(req, res) {
        if (this._botConfig.devConfig) {
            //console.log("body", req.body);
        }
        let updateObject = req.body;

        if (updateObject && updateObject.message) {
            let msg = updateObject.message;

            var chatId;

            if (msg.chat) {
                chatId = msg.chat.id;
            }

            let messageText = msg.text;

            if (chatId && messageText) {
                if (!this._sessionIds.has(chatId)) {
                    this._sessionIds.set(chatId, uuid.v1());
                }

                let apiaiRequest = this._apiaiService.textRequest(messageText,
                    {
                        sessionId: this._sessionIds.get(chatId)
                    });

                apiaiRequest.on('response', (response) => {
                    var sessId = this._sessionIds.get(chatId);
                    var resultData = response.result;
                    botSchema.find({ "_id": sessId }, function (err, result) {
                        if (!result.length) {
                            var data = new botSchema({
                                "_id": sessId
                            })
                            data.save();
                        } else {
                            //console.log(msg.text.substring(0, 2));
                            if (resultData.metadata.intentName == "UserProvidesName") {
                                botSchema.update({ "_id": result[0]._id }, { "name": resultData.parameters['given-name'] + " " + resultData.parameters['last-name'] }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "UserProvidesEmail") {
                                botSchema.update({ "_id": result[0]._id }, { "email": resultData.parameters.email }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "investorType-1") {
                                botSchema.update({ "_id": result[0]._id }, { "investor_type": "1" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "investorType-2") {
                                botSchema.update({ "_id": result[0]._id }, { "investor_type": "2" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "investorType-3") {
                                botSchema.update({ "_id": result[0]._id }, { "investor_type": "3" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "investorType-4") {
                                botSchema.update({ "_id": result[0]._id }, { "investor_type": "4" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "investorType-5") {
                                botSchema.update({ "_id": result[0]._id }, { "investor_type": "5" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "UserProvidesSeed") {
                                botSchema.update({ "_id": result[0]._id }, { "seed": resultData.parameters['number-sequence'] }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "UserProvidesReferral") {
                                botSchema.update({ "_id": result[0]._id }, { "ref_code": resultData.parameters['any'] }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "UserProvidesSeed - no") {
                                botSchema.update({ "_id": result[0]._id }, { "ref_code": "No Referral Code" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "citizen-1") {
                                botSchema.update({ "_id": result[0]._id }, { "isUSCitizen": "1" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "citizen-2") {
                                botSchema.update({ "_id": result[0]._id }, { "isUSCitizen": "2" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "citizen-3") {
                                botSchema.update({ "_id": result[0]._id }, { "isUSCitizen": "3" }, function (err, result) {
                                    
                                })
                            }
                            if (resultData.metadata.intentName == "citizen-1" || resultData.metadata.intentName == "citizen-2" || resultData.metadata.intentName == "citizen-3") {
                                botSchema.find({ "_id": result[0]._id }, function (err, result) {
                                    console.log('Time to push');
                                    var userData=result[0];
                                    var userName=userData.name.split(" ");
                                    var headersOpt = {
                                        "content-type": "application/json",
                                    };
                                    var formData = {
                                        "properties": [
                                            {
                                                "property": "email",
                                                "value": userData.email
                                            },
                                            {
                                                "property": "firstname",
                                                "value": userName[0]
                                            },
                                            {
                                                "property": "lastname",
                                                "value": userName[1]
                                            },
                                            {
                                                "property": "eth_seed",
                                                "value": userData.seed
                                            },
                                            {
                                                "property": "investor_type",
                                                "value": userData.investor_type
                                            },
                                            {
                                                "property": "ref_code",
                                                "value": userData.ref_code
                                            },
                                            {
                                                "property": "add_info",
                                                "value": "Not, Not Much \n But Okay Good Boy"
                                            },
                                            {
                                                "property": "is_usa",
                                                "value": userData.isUSCitizen
                                            }
                                        ]
                                    }
                                    console.log(formData)
                                    request.post({ url: 'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + hub_key, form: JSON.stringify(formData), headers: headersOpt, json: true }, function (err, httpResponse, body) {
                                        if (err) {
                                            return console.error('upload failed:', err);
                                        }
                                    });
                                })
                            }
                        }
                    })
                    if (TelegramBot.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;
                        let responseData = response.result.fulfillment.data;

                        if (TelegramBot.isDefined(responseData) && TelegramBot.isDefined(responseData.telegram)) {

                            console.log('Response as formatted message');

                            let telegramMessage = responseData.telegram;
                            telegramMessage.chat_id = chatId;

                            this.reply(telegramMessage);
                            TelegramBot.createResponse(res, 200, 'Message processed');

                        } else if (TelegramBot.isDefined(responseText)) {
                            console.log('Response as text message');
                            this.reply({
                                chat_id: chatId,
                                text: responseText
                            });
                            TelegramBot.createResponse(res, 200, 'Message processed');

                        } else {
                            if (resultData.metadata.intentName == 'UserProvidesEmail') {
                                console.log('user ne email diya');
                                this.reply({
                                    chat_id: chatId,
                                    text: 'Investor Type',
                                    reply_markup: {
                                        keyboard: [
                                            [
                                                "Syndicate Leader"
                                            ],
                                            [
                                                "Intelligent ICO Investor"
                                            ],
                                            [
                                                "Institutional Investor"
                                            ],
                                            [
                                                "Token Sale Advisor"
                                            ],
                                            [
                                                "ICO Founder"
                                            ]
                                        ],
                                        one_time_keyboard: true,
                                        resize_keyboard: true
                                    }
                                })
                            }
                            if (resultData.metadata.intentName == 'UserProvidesReferral' || resultData.metadata.intentName == 'UserProvidesSeed - no') {
                                this.reply({
                                    chat_id: chatId,
                                    text: "Are you US citizen?",
                                    reply_markup: {
                                        keyboard: [
                                            [
                                                "Yes"
                                            ],
                                            [
                                                "I am a US Citizen (Accredited Investor)"
                                            ],
                                            [
                                                "No"
                                            ]
                                        ],
                                        one_time_keyboard: true,
                                        resize_keyboard: true
                                    }
                                })
                            }

                            console.log('Received empty speech');
                            TelegramBot.createResponse(res, 200, 'Received empty speech');
                        }
                    } else {
                        console.log('Received empty result');
                        TelegramBot.createResponse(res, 200, 'Received empty result');
                    }
                });

                apiaiRequest.on('error', (error) => {
                    console.error('Error while call to api.ai', error);
                    TelegramBot.createResponse(res, 200, 'Error while call to api.ai');
                });
                apiaiRequest.end();
            }
            else {
                console.log('Empty message');
                return TelegramBot.createResponse(res, 200, 'Empty message');
            }
        } else {
            console.log('Empty message');
            return TelegramBot.createResponse(res, 200, 'Empty message');
        }
    }

    reply(msg) {

        // https://core.telegram.org/bots/api#sendmessage
        request.post(this._telegramApiUrl + '/sendMessage', {
            json: msg
        }, function (error, response, body) {
            if (error) {
                console.error('Error while /sendMessage', error);
                return;
            }

            if (response.statusCode != 200) {
                console.error('Error status code while /sendMessage', body);
                return;
            }
            //  console.log(body);
            console.log('Method /sendMessage succeeded');
        });
    }

    static createResponse(resp, code, message) {
        return resp.status(code).json({
            status: {
                code: code,
                message: message
            }
        });
    }

    static isDefined(obj) {
        if (typeof obj == 'undefined') {
            return false;
        }

        if (!obj) {
            return false;
        }

        return obj != null;
    }
}