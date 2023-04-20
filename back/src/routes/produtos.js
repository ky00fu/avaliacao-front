const express = require('express')
const router = express.Router()

const Produtos = require('../controllers/produtos')

router.get('/', Produtos.listar)
router.get('/view', Produtos.listarView)
router.post('/create', Produtos.add)
router.put('/update', Produtos.att)
router.delete('/del/:id', Produtos.del)

module.exports = router