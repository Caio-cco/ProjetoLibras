drop database if exists tcc;

create database tcc;

use tcc;

create table usuario (
    id_usuario int AUTO_INCREMENT primary key,
    nome varchar(100) not null,
    foto_url varchar(255),
    telefone varchar(255),
    email varchar(100) unique not null,
    senha varchar(255) not null, 
    data_cadastro timestamp default current_timestamp
);

create table dificuldade (
    id_dificuldade int AUTO_INCREMENT primary key,
    nome varchar(50) not null
);

insert into dificuldade (nome) values 
('Iniciante'), 
('intermediário'), 
('Avançado');

create table curso (
    id_curso int AUTO_INCREMENT primary key,
    titulo varchar(200) not null,
    descricao text,
    id_dificuldade int not null,
    id_instrutor int not null,
    data_criacao timestamp default current_timestamp,
    foreign key (id_dificuldade) references dificuldade(id_dificuldade),
    foreign key (id_instrutor) references usuario(id_usuario)
);

create table aula (
    id_aula int AUTO_INCREMENT primary key,
    id_curso int not null,
    titulo varchar(200) not null,
    descricao text,
    url_video varchar(255),
    ordem int not null,
    foreign key (id_curso) references curso(id_curso)
);

create table tipo_atividade (
    id_tipo_atividade int AUTO_INCREMENT primary key,
    nome varchar(100) not null
);

insert into tipo_atividade (nome) values
('Jogo de Comparação'),
('Quiz'),
('Imite o Sinal'),
('Organização de Frases'),
('Exercício Teórico');

create table atividade (
    id_atividade int AUTO_INCREMENT primary key,
    id_curso int not null,
    titulo varchar(200) not null,
    descricao text,
    id_tipo_atividade int not null,
    ordem int not null,
    foreign key (id_curso) references curso(id_curso),
    foreign key (id_tipo_atividade) references tipo_atividade(id_tipo_atividade)
);

create table progresso (
    id_progresso int AUTO_INCREMENT primary key,
    id_usuario int not null,
    tipo ENUM('aula','atividade') not null,
    id_referencia int not null,
    concluido boolean default FALSE,
    data_conclusao timestamp null,
    unique (id_usuario, tipo, id_referencia),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table categoria (
    id_categoria int AUTO_INCREMENT primary key,
    nome varchar(100) not null
);

create table curso_categoria (
    id_curso int not null,
    id_categoria int not null,
    primary key (id_curso, id_categoria),
    foreign key (id_curso) references curso(id_curso),
    foreign key (id_categoria) references categoria(id_categoria)
);

create table cargo (
	id_adm int primary key auto_increment,
    id_usuario int,
    cargo_adm boolean,
    foreign key (id_usuario) references usuario(id_usuario)
);

ALTER TABLE usuario MODIFY COLUMN senha VARCHAR(255) NULL;

ALTER TABLE usuario ADD COLUMN login_social TINYINT(1) DEFAULT 0;