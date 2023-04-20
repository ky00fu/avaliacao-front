class Produtos {

    constructor(i) {
        this.id = i.id
        this.nome = i.nome
        this.valor = i.valor
    }

    create() {
        return `INSERT INTO produtos VALUES (NULL, '${this.nome}', ${this.valor})`
    }

    
    read() {
        return `SELECT * FROM produtos`
    }

    readView() {
        return `SELECT * FROM vendas_por_produto`
    }

    
    update() {
        return `UPDATE produtos SET nome = '${this.nome}', valor = ${this.valor} WHERE id = ${this.id}`
    }

    
    delete() {
        return `DELETE from produtos WHERE id = ${this.id}` 
    }
}

module.exports = Produtos