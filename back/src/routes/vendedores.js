const express = require('express')
const router = express.Router()

const Vendedores = require('../controllers/vendedores')

router.get('/', Vendedores.listar)
router.get('/view', Vendedores.listarView)
router.post('/create', Vendedores.add)
router.put('/update/:id', Vendedores.att)
router.delete('/del/:id', Vendedores.del)

module.exports = router