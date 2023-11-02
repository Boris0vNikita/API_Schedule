const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
})
const express = require('express')
const cors = require('cors')

const router = require('./routes')
const errorMiddleware = require('./middlewares/error.middlware')

const PORT = process.env.PORT || 5000

const app = express()

app.set('view engine', 'hbs')

app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL],
    })
)

app.use(express.static('assets'))
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`))
