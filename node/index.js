require('dotenv').config()
const express = require('express')
const {join} = require('path')
const axios = require('axios')
const path = require("node:path");
const bodyParser = require('body-parser')
const fs = require('node:fs')
const app = express()

const publicDir = join(__dirname, "template", "build")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

try {
    const file = fs.readFileSync(join(__dirname, 'template', 'template.json'))
    const data = JSON.parse(file.toString("utf-8"))
    app.use(express.static(publicDir))
    app.all('/proxy', async(req, res) => proxy(req,res, data))
    app.get('/**', renderTemplate)
} catch (err) {
    app.all('/**', async(req, res) => {
        if (req.method === 'GET') {
            res.sendFile(__dirname + "/install.html")
            return
        }
        const data = req.body
        if (!data.apiKey || !data.apiUrl || !data.templateId) {
            res.redirect('/install')
            return
        }
        res.send(req.body)
    })
}

async function proxy(req, res, template) {
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
        console.log(err)
        const code = err.response ? err.response.status : 500
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
}
async function renderTemplate(req, res) {
    const viteUrl = `${process.env.VITE_ORIGIN}:${process.env.VITE_PORT}`
    if (process.env.APP_ENVIRONMENT === 'development') {
        if (req.path.startsWith("/src/assets")) {
            res.redirect(`${viteUrl}${req.path}`)
            return
        }
        const r = await fs.readFileSync(join(__dirname, "template", "index.html"))
        res.send(r.toString("utf-8")
            .replace("<VITE/>", `<script src="${viteUrl}/@vite/client"></script>`)
            .replace("/src", `${viteUrl}/src`)
        )
        return
    }
    res.sendFile(join(__dirname, "template", "build", "index.html"))
}

const PORT = process.env.APP_PORT || 3000
app.listen(PORT, () => {
    console.log(`App started at port :${PORT}`)
})