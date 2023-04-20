const con = require('../dao/connect')
const Vendedores = require('../models/vendedores')

const add = (req, res) => {
    con.query(new Vendedores(req.body).create(), (err, result) => {
        if (err == null)
            res.status(201).json(req.body).end()
        else
            res.status(500).json(err).end()
    })
}

const listar = (req, res) => {
    con.query(new Vendedores(req.body).read(), (err, result) => {
        if (err == null)
            res.status(200).json(result).end()
        else
            res.status(500).json(err).end()
    })
}

const listarView = (req, res) => {
    con.query(new Vendedores(req.body).readView(), (err, result) => {
        if (err == null)
            res.status(200).json(result).end()
        else
            res.status(500).json(err).end()
    })
}

const att = (req, res) => {
    con.query(new Vendedores(req.params).update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).json(req.body).end()
        else
            res.status(404).json(err).end()
    })
}

const del = (req, res) => {
    con.query(new Vendedores(req.params).delete(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(204).json(result).end()
        else
            res.status(500).json(err).end()
    })
}

module.exports = { add, listar, att, del, listarView }