const express = require('express')
const cors = require('cors')
const PORT = 3000

const routerVendas = require('./src/routes/vendas')
const routerVendedores = require('./src/routes/vendedores')
const routerProdutos = require('./src/routes/produtos')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/vendas', routerVendas)
app.use('/vendedores', routerVendedores)
app.use('/produtos', routerProdutos)

app.listen(PORT, () => {
    console.log('Respondendo na porta ' + PORT)
})