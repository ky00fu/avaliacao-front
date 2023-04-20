class Vendedor {

    constructor(i) {
        this.id = i.id
        this.nome = i.nome
        this.matricula = i.matricula
    }

    create() {
        return `INSERT INTO vendedores VALUES (NULL, '${this.nome}', ${this.matricula})`
    }

    
    read() {
        return `SELECT * FROM vendedores`
    }

    readView() {
        return `SELECT * FROM vw_vendas_vendedores`
    }

    
    update() {        
        return `UPDATE vendedores SET nome = '${this.nome}', matricula = ${this.matricula} WHERE id = ${this.id}`
    }

    
    delete() {
        return `DELETE FROM vendedores WHERE id = ${this.id}
                AND
                ALTER TABLE vendedores AUTO_INCREMENT = ${this.id}`
    }
}

module.exports = Vendedor