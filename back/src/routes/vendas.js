const express = require('express')
const router = express.Router()

const Vendas = require('../controllers/vendas')

router.get('/', Vendas.listar)
router.get('/view', Vendas.listarView)
router.post('/create', Vendas.add)
router.put('/update', Vendas.att)
router.delete('/del/:id', Vendas.del)

module.exports = router