require('dotenv').config({
    path: `${__dirname}/../../.env`
})
const express = require('express')
const {join} = require('path')
const axios = require('axios')
const path = require("node:path");
const bodyParser = require('body-parser')

const app = express()

const template = {
    name: "TEST",
    version: '1.0.0'
}

const publicDir = join(__dirname, "..", '..', 'public')
app.use(express.static(publicDir))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all("/proxy", async(req, res) => {
    const uri = req.query['uri']
    try {
        const result = await axios.request({
            url: `${process.env.API_URL}/public${uri}`,
            method: req.method,
            headers: {
                'X-API-KEY': process.env.API_KEY,
                'X-APP-PLATFORM': "platform/template-self",
                'X-APP-PLATFORM-VERSION': template['version'],
                'X-APP-PLATFORM-ENGINE': template['name']
            },
            data: req.body
        })
        res.json(result.data)
    } catch (err) {
        const code = err.response ? err.response.status : 500
        console.log(err.response.data)
        const message = () => {
            switch (code) {
                case 400:
                    //"Niepoprawny zestaw nagłówków lub niepoprawny klucz licencyjny"
                    return err.response.data['message'];
                case 402:
                    return "Licencja wygasła";
                case 403:
                    return "Niepoprawny klucz licencyjny lub licencja została zablokowana";
                case 500:
                    return "Błąd krytyczny po stronie API yshop.pl. Skontaktuj się z administratorem";
                default:
                    return `${err.response.data.message}`;
            }
        };
        res.status(code).json({
            message: message(),
            code: code
        })
    }
})

app.all('/install', async(req, res) => {
    if (req.method === 'GET') {
        res.sendFile(publicDir + '/install/index.html')
        return
    }
    const data = req.body
    if (!data.apiKey || !data.apiUrl || !data.templateId) {
        res.redirect('/install')
        return
    }
    res.send(req.body)
})

app.get('/**', (req, res) => {
    res.sendFile(publicDir + '/index.html')
})

app.listen(3000, () => {
    console.log('App started at port :3000')
})