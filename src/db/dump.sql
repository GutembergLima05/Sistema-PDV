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









