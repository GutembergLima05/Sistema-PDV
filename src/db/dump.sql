create database pdv;

create table usuarios(
  id SERIAL PRIMARY KEY,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table categorias(
  id SERIAL PRIMARY KEY,
  descricao text
);

insert into categorias (descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor NUMERIC NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id)
);


CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf TEXT NOT NULL UNIQUE,
  cep TEXT,
  rua TEXT,
  numero TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  observacao TEXT,
  valor_total NUMERIC NOT NULL,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id)
);

CREATE TABLE pedidos_produtos (
  id SERIAL PRIMARY KEY,
  quantidade_produto INTEGER NOT NULL,
  valor_produto NUMERIC NOT NULL,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id)
);

ALTER TABLE produtos ADD COLUMN produto_imagem;









