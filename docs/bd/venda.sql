DROP DATABASE IF EXISTS vendas;
CREATE DATABASE vendas CHARSET=UTF8 COLLATE utf8_general_ci;
USE vendas;

CREATE TABLE vendedores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    matricula INT NOT NULL
);

CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT NOT NULL,
    valor DECIMAL(6,2)
);

CREATE TABLE vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    quantidade INT NOT NULL,
    produtoID INT NOT NULL,
    vendedorID INT NOT NULL,
    FOREIGN KEY (produtoID) REFERENCES produtos(id),
    FOREIGN KEY (vendedorID) REFERENCES vendedores(id)
);

DROP VIEW IF EXISTS vw_vendas_vendedores;
CREATE VIEW vw_vendas_vendedores AS
SELECT vendedores.nome AS nome_vendedor,
       vendedores.matricula,
       SUM(vendas.quantidade * produtos.valor) AS total_vendido,
       SUM(vendas.quantidade * produtos.valor * 0.05) AS comissao
FROM vendas
JOIN produtos ON vendas.produtoID = produtos.id
JOIN vendedores ON vendas.vendedorID = vendedores.id
GROUP BY vendedores.id;

DROP VIEW IF EXISTS vw_vendas;
CREATE VIEW vw_vendas AS
SELECT v.data AS data_venda, p.nome AS nome_produto, ve.nome AS nome_vendedor
FROM vendas v
JOIN produtos p ON v.produtoID = p.id
JOIN vendedores ve ON v.vendedorID = ve.id;

DROP VIEW IF EXISTS vendas_por_produto;
CREATE VIEW vendas_por_produto AS
SELECT p.nome AS produto, SUM(v.quantidade * p.valor) AS total_vendas
FROM produtos p
JOIN vendas v ON p.id = v.produtoID
GROUP BY p.id;

DROP VIEW IF EXISTS vendas_detalhadas;
CREATE VIEW vendas_detalhadas AS
SELECT vendas.id AS id, vendas.data, vendas.quantidade, vendedores.nome AS vendedor, produtos.nome AS produto
FROM vendas
INNER JOIN vendedores ON vendas.vendedorID = vendedores.id
INNER JOIN produtos ON vendas.produtoID = produtos.id;