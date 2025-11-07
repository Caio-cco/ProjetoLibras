drop database if exists tcc;
create database tcc;
use tcc;


create table usuario (
    id_usuario int AUTO_INCREMENT primary key,
    nome varchar(100) not null,
    foto_url varchar(255),
    telefone varchar(255),
    email varchar(100) unique not null,
    senha varchar(255) null,
    login_social tinyint(1) default 0,
    data_cadastro timestamp default current_timestamp
);


create table dificuldade (
    id_dificuldade int AUTO_INCREMENT primary key,
    nome varchar(50) not null
);

insert into dificuldade (nome) values 
('Iniciante'), 
('Intermediário'), 
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


create table usuario_curso (
    id_usuario int not null,
    id_curso int not null,
    progresso decimal(5,2) default 0.00,
    data_inicio timestamp default current_timestamp,
    data_conclusao timestamp null,
    primary key (id_usuario, id_curso),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_curso) references curso(id_curso)
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


create table atividade (
    id_atividade int auto_increment primary key,
    id_curso int not null,
    titulo varchar(200) not null,
    descricao text,
    tipo enum('associar', 'video', 'montar_frase', 'quiz', 'comparacao', 'teorica') not null,
    ordem int default 0,
    foreign key (id_curso) references curso(id_curso)
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

create table imagem_sinal (
    id_imagem int auto_increment primary key,
    url_imagem varchar(255) not null,
    descricao varchar(255) null
);


create table pergunta (
    id_pergunta int auto_increment primary key,
    id_atividade int not null,
    enunciado text not null,
    imagem_url varchar(255) null,
    video_url varchar(255) null,
    foreign key (id_atividade) references atividade(id_atividade)
);

create table resposta (
    id_resposta int auto_increment primary key,
    id_pergunta int not null,
    texto varchar(255) null,
    imagem_url varchar(255) null,
    correta boolean default false,
    foreign key (id_pergunta) references pergunta(id_pergunta)
);


create table resposta_usuario (
    id_resposta_usuario int auto_increment primary key,
    id_usuario int not null,
    id_pergunta int not null,
    resposta_texto varchar(255) null,
    resposta_imagem varchar(255) null,
    correta boolean,
    data_resposta timestamp default current_timestamp,
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_pergunta) references pergunta(id_pergunta)
);