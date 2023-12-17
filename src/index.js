require('dotenv').config()
const express = require('express');
const rotas = require('./rotas')
const cors = require('cors')
const aws = require('aws-sdk')
const app = express();

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})


app.use(cors())
app.use(express.json())
app.use(rotas)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})