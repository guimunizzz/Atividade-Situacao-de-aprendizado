CREATE DATABASE StockPlus_db;

USE StockPlus_db;

CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    dc_categoria TEXT
);

CREATE TABLE IF NOT EXISTS Fornecedores (
    id_fornecedor INT PRIMARY KEY AUTO_INCREMENT,
    dc_fornecedor TEXT
);

CREATE TABLE IF NOT EXISTS Produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    dc_produto TEXT,
    vinculo_imagem VARCHAR(100),
    preco DECIMAL(10, 2) NOT NULL,
    estoque_minimo INT NOT NULL,
    id_categoria INT NOT NULL,
    id_fornecedor INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedores (id_fornecedor)
);

CREATE TABLE IF NOT EXISTS Estoque (
    id_estoque INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT NOT NULL,
    quantidade_atual INT NOT NULL,
    dt_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produtos (id_produto) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lote_Estoque (
    id_lote INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT NOT NULL,
    dt_vencimento DATE,
    quantidade_lote INT,
    dt_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);

CREATE TABLE IF NOT EXISTS Movimentacao (
    id_movimentacao INT PRIMARY KEY AUTO_INCREMENT,
    tipo_movimento ENUM('ENTRADA', 'SAIDA') NOT NULL,
    quantidade INT NOT NULL,
    dt_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_lote INT,
    id_produto INT,
    FOREIGN KEY (id_lote) REFERENCES Lote_Estoque (id_lote),
    FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);

INSERT INTO
    Categorias (dc_categoria)
VALUES ('Bebidas'),
    ('Alimentos'),
    ('Limpeza'),
    ('Higiene Pessoal');

INSERT INTO
    Fornecedores (dc_fornecedor)
VALUES ('Fornecedor A'),
    ('Fornecedor B'),
    ('Fornecedor C'),
    ('Fornecedor D');

INSERT INTO
    Produtos (
        dc_produto,
        vinculo_imagem,
        preco,
        estoque_minimo,
        id_categoria,
        id_fornecedor
    )
VALUES (
        'Coca-Cola',
        'coca-cola.jpg',
        5.99,
        10,
        1,
        1
    ),
    (
        'Arroz',
        'arroz.jpg',
        20.00,
        50,
        2,
        2
    ),
    (
        'Detergente',
        'detergente.jpg',
        3.50,
        15,
        3,
        3
    ),
    (
        'Shampoo',
        'shampoo.jpg',
        12.00,
        20,
        4,
        4
    );

INSERT INTO
    Estoque (id_produto, quantidade_atual)
VALUES (1, 100),
    (2, 200),
    (3, 150),
    (4, 80);

Insert into
    Lote_Estoque (
        id_produto,
        dt_vencimento,
        quantidade_lote
    )
values (1, '2026-12-31', 50),
    (1, '2025-01-31', 50),
    (2, '2026-06-30', 100),
    (2, '2025-07-31', 100),
    (3, '2026-11-30', 75),
    (3, '2026-12-31', 75),
    (4, '2026-03-31', 40),
    (4, '2026-04-30', 40);

INSERT INTO
    Movimentacao (
        tipo_movimento,
        quantidade,
        id_lote,
        id_produto
    )
VALUES ('ENTRADA', 50, 1, 1),
    ('ENTRADA', 50, 2, 1),
    ('ENTRADA', 100, 3, 2),
    ('ENTRADA', 100, 4, 2),
    ('ENTRADA', 75, 5, 3),
    ('ENTRADA', 75, 6, 3),
    ('ENTRADA', 40, 7, 4),
    ('ENTRADA', 40, 8, 4);