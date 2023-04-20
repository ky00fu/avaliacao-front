class Vendas {
    constructor(i) {
        this.id = i.id
        this.quantidade = i.quantidade
        this.produtoID = i.produtoID
        this.vendedorID = i.vendedorID
    }

    create() {
        return `INSERT INTO vendas VALUES (NULL, NOW(), ${this.quantidade}, ${this.produtoID}, ${this.vendedorID})`

    }

    read() {
        return `SELECT * FROM vendas`
        
    }

    readView() {
        return `SELECT * FROM vendas_detalhadas`
    }

    update() {
        return `UPDATE vendas SET quantidade = ${this.quantidade}, produtoID = ${this.produtoID}, vendedorID = ${this.vendedorID} WHERE id = ${this.id}`
    }


    delete() {
        return `DELETE from vendas WHERE id = ${this.id}`                
    }
}

module.exports = Vendas