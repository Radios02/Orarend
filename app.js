import express from 'express'
import orarout from './rout/orarout.js'
import {initializeDb} from './util/database.js'
import __dirname from './util/rootpath.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile("./view/index.html", { root: __dirname });
});
app.use('/orak', orarout)

async function startServer() {
    await initializeDb()

app.listen(3000, () => {
  console.log('Server runs')
})
}
startServer()