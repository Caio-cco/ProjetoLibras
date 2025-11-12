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
    url_img varchar(255),
    data_criacao timestamp default current_timestamp,
    foreign key (id_dificuldade) references dificuldade(id_dificuldade)
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

create table pergunta_quiz (
    id_pergunta int auto_increment primary key,
    enunciado text not null,
    id_dificuldade int,
    foreign key (id_dificuldade) references dificuldade(id_dificuldade)
);

create table resposta_quiz (
    id_resposta int auto_increment primary key,
    id_pergunta int not null,
    texto varchar(255) null,
    correta boolean default false,
    foreign key (id_pergunta) references pergunta_quiz(id_pergunta)
);

create table frases_ativ (
	id_frases int primary key auto_increment,
    texto varchar(255) not null,
    id_dificuldade int,
    foreign key (id_dificuldade) references dificuldade(id_dificuldade)
);

create table frases_img (
	id_fraseimg int primary key auto_increment,
    id_frase int,
    texto_img varchar(255),
    url_img varchar(255),
    posicao int not null,
    foreign key (id_frase) references frases_ativ(id_frases)
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
    foreign key (id_pergunta) references pergunta_quiz(id_pergunta)
);

create table forca_img (
    id_imagem int auto_increment primary key,
    url_imagem varchar(255) not null,
    descricao varchar(255) null,
    id_dificuldade int
);

insert into forca_img(url_imagem, descricao, id_dificuldade)
    values
	("/palavrasEFrases/Chefe.png", "Chefe", 1),
    ("/palavrasEFrases/Pessoa.png", "Pessoa", 1),
    ("/palavrasEFrases/Banheiro.png", "Banheiro", 1),
    ("/palavrasEFrases/Obrigada.png", "Obrigada", 1),
    ("/palavrasEFrases/Legal.png", "Legal", 1),
    ("/palavrasEFrases/Bombeiro.png", "Bombeiro", 1),
    ("/palavrasEFrases/Policial.png", "Policial", 1),
    ("/palavrasEFrases/Cozinha.png", "Cozinha", 1),
    ("/palavrasEFrases/Riacho.png", "Riacho", 1),
    ("/palavrasEFrases/Caminhao.png", "Caminhão", 1),
    ("/palavrasEFrases/Disco_Voador.png", "Disco Voador", 2),
    ("/palavrasEFrases/Helicoptero.png", "Helicóptero", 2),
    ("/palavrasEFrases/Inteligente.png", "Inteligente", 2),
    ("/palavrasEFrases/Submarino.png", "Submarino", 2),
    ("/palavrasEFrases/Foguete.png", "Foguete", 2),
    ("/palavrasEFrases/Cidade_de_Goias.png", "Cidade de Goiás", 3),
    ("/palavrasEFrases/Pirenopolis.png", "Pirenópolis", 3),
    ("/palavrasEFrases/Prazer_em_te_conhecer.png", "Prazer em te conhecer", 3),
    ("/palavrasEFrases/Santo_Antonio.png", "Santo Antônio", 3),
    ("/palavrasEFrases/Onibus.png", "Ônibus", 3),
    ("/palavrasEFrases/Sobradinho.png", "Sobradinho", 2),
    ("/palavrasEFrases/Barco_a_Vela.png", "Barco a Vela", 2),
    ("/palavrasEFrases/Recanto_das_Emas.png", "Recanto das Emas", 3),
	("/palavrasEFrases/Valparaiso.png", "Valparaiso", 3),
	("/palavrasEFrases/Taguatinga.png", "Taguatinga", 3);
    
insert into imagem_sinal(url_imagem, descricao)
    values
    ("/alfabetoLibras/LibrasA.png", "Letra A"),
    ("/alfabetoLibras/LibrasB.png", "Letra B"),
    ("/alfabetoLibras/LibrasC.png", "Letra C"),
    ("/alfabetoLibras/LibrasCCedilha.png", "Letra C Cedilha"),
    ("/alfabetoLibras/LibrasD.png", "Letra D"),
    ("/alfabetoLibras/LibrasE.png", "Letra E"),
    ("/alfabetoLibras/LibrasF.png", "Letra F"),
    ("/alfabetoLibras/LibrasG.png", "Letra G"),
    ("/alfabetoLibras/LibrasH.png", "Letra H"),
    ("/alfabetoLibras/LibrasI.png", "Letra I"),
    ("/alfabetoLibras/LibrasJ.png", "Letra J"),
    ("/alfabetoLibras/LibrasK.png", "Letra K"),
    ("/alfabetoLibras/LibrasL.png", "Letra L"),
    ("/alfabetoLibras/LibrasM.png", "Letra M"),
    ("/alfabetoLibras/LibrasN.png", "Letra N"),
    ("/alfabetoLibras/LibrasO.png", "Letra O"),
    ("/alfabetoLibras/LibrasP.png", "Letra P"),
    ("/alfabetoLibras/LibrasQ.png", "Letra Q"),
    ("/alfabetoLibras/LibrasR.png", "Letra R"),
    ("/alfabetoLibras/LibrasS.png", "Letra S"),
    ("/alfabetoLibras/LibrasT.png", "Letra T"),
    ("/alfabetoLibras/LibrasU.png", "Letra U"),
    ("/alfabetoLibras/LibrasV.png", "Letra V"),
    ("/alfabetoLibras/LibrasW.png", "Letra W"),
    ("/alfabetoLibras/LibrasX.png", "Letra X"),
    ("/alfabetoLibras/LibrasY.png", "Letra Y"),
    ("/alfabetoLibras/LibrasZ.png", "Letra Z"),
    ("/palavrasEFrases/Oi.png", "Oi"),
    ("/palavrasEFrases/Bem.png", "Bem"),
    ("/palavrasEFrases/Bom.png", "Bom"),
    ("/palavrasEFrases/Falar.png", "Falar"),
    ("/palavrasEFrases/Sinalizar.png", "Sinalizar"),
    ("/palavrasEFrases/Repetir.png", "Repetir"),
    ("/palavrasEFrases/Rapido.png",	"Rápido"),
    ("/palavrasEFrases/Devagar.png", "Devagar"),
    ("/palavrasEFrases/Conhecer.png", "Conhecer"),
    ("/palavrasEFrases/Desculpa.png", "Desculpa"),
    ("/palavrasEFrases/Tudo_bem.png", "Tudo Bem?"),
    ("/palavrasEFrases/Bom_dia.png", "Bom dia"),
    ("/palavrasEFrases/Me_ajuda.png", "Me Ajuda"),	
    ("/palavrasEFrases/Nao_conhecer.png", "Não conhecer"),
    ("/palavrasEFrases/Ano_passado.png", "Ano passado"),
    ("/palavrasEFrases/Qual_seu_nome.png", "Qual seu nome?"),
    ("/palavrasEFrases/Meu_nome.png", "Meu nome"),
    ("/palavrasEFrases/Prazer_em_te_conhecer.png", "Prazer em te conhecer"),
    ("/palavrasEFrases/Boa_Tarde.png", "Boa Tarde"),
    ("/palavrasEFrases/Boa_Noite.png", "Boa Noite");
    
insert into curso(titulo, descricao, id_dificuldade, url_img)
    values
    ("Associação", "Associe a letra ao sinal", 1, "associacao-img"),
    ("Associação", "Associe a palavra ao sinal", 2, "associacao-img"),
    ("Associação", "Associe a frase ao sinal", 3, "associacao-img"),
    ("Quiz", "Teste de sinais básicos", 1, "quiz-img"),
    ("Quiz", "Teste de frases e vocabulário", 2, "quiz-img"),
    ("Quiz", "Teste de gramática e contexto", 3, "quiz-img"),
    ("Jogo das Frases", "Construa frases simples", 1, "frases-img"),
    ("Jogo das Frases", "Use classificadores e verbos", 2, "frases-img"),
    ("Jogo das Frases", "Crie textos completos", 3, "frases-img"),
    ("Teoria", "Alfabeto, números e cumprimentos", 1, "teorico-img"),
    ("Teoria", "Gramática e estrutura da Libras", 2, "teorico-img"),
    ("Teoria", "História, cultura e regionalismos", 3, "teorico-img"),
    ("Forca", "Jogo da Forca nível Iniciante", 1, "forca-img"),
    ("Forca", "Jogo da Forca nível Intermediário", 2, "forca-img"),
    ("Forca", "Jogo da Forca nível Avançado", 3, "forca-img");
    
insert into pergunta_quiz (enunciado, id_dificuldade)
	values
    ("Durante muito tempo, pessoas surdas não eram reconhecidas como:", 1),
    ("Qual filósofos da antiguidade acreditavam sobre quem não falava?", 1),
    ("O que o Congresso de Milão (1880) proibiu?", 1),
    ("Quem fundou o Instituto Nacional de Surdos Mudos (atual INES) no Brasil?", 1),
    ("A partir das décadas de 1970 e 1980, o INES passou a aplicar:", 1),
    ("Quantos são os parâmetros essenciais da LIBRAS?", 2),
    ("Qual parâmetro muda nos sinais APRENDER e ESTUDAR, tornando-os diferentes?", 2),
    ("Classificadores representam:", 2),
    ("A estrutura frasal mais comum em LIBRAS é:", 2),
    ("As Expressões Não-Manuais servem para:", 2),
    ("Se um sinal muda apenas sua Orientação/Direcionalidade, o que ocorre?", 3),
    ("O uso de Classificadores é especialmente necessário em:", 3),
    ("No exemplo de ‘CARRO ANDAR’ com uso de CL, o sinalizante:", 3),
    ("Expressões Não-Manuais podem indicar:", 3),
    ("Na estrutura Tópico–Comentário, o Tópico geralmente é sinalizado com:", 3);

insert into resposta_quiz (id_pergunta, texto, correta)
	values
    (1, "Cidadãos brasileiros", false),
    (1, "Seres humanos", true),
    (1, "Professores", false),
    (1, "Crianças", false),
    (2, "Era inteligente", false),
    (2, "Era um ser pensante", false),
    (2, "Não era um ser pensante", true),
    (2, "Era nobre", false),
    (3, "Uso do português", false),
    (3, "Uso das línguas de sinais", true),
    (3, "Uso do braile", false),
    (3, "Uso da escrita", false),
    (4, "William Stokoe", false),
    (4, "Imperatrice Debret", false),
    (4, "Hernest Huet", true),
    (4, "Dom Pedro II", false),
    (5, "Apenas oralismo", false),
    (5, "Escrita simplificada", false),
    (5, "Comunicação total e bilinguismo", true),
    (5, "Braile como língua oficial", false),
    (6, "3", false),
    (6, "4", false),
    (6, "5", true),
    (6, "6", false),
    (7, "Configuração de mão", false),
    (7, "Ponto de articulação", false),
    (7, "Movimento", true),
    (7, "Expressões faciais", false),
    (8, "Cores de objetos", false),
    (8, "Forma, tamanho, movimento ou localização", true),
    (8, "Ordem das frases", false),
    (8, "Intensidade das expressões", false),
    (9, "Sujeito – Verbo – Objeto", false),
    (9, "Verbo – Sujeito – Objeto", false),
    (9, "Tópico – Comentário", true),
    (9, "Comentário – Tópico", false),
    (10, "Enfeitar o sinal", false),
    (10, "Apenas dar emoção", false),
    (10, "Indicar funções gramaticais, como negação e perguntas", true),
    (10, "Substituir a ordem Tópico–Comentário", false),
    (11, "Nada muda", false),
    (11, "Torna-se um Par Mínimo", true),
    (11, "Vira Classificador", false),
    (11, "Perde sentido", false),
    (12, "Descrições espaciais detalhadas", true),
    (12, "Sinais estáticos", false),
    (12, "Frases sem sujeito", false),
    (12, "Verbos sem movimento", false),
    (13, "Repete o sinal de CARRO", false),
    (13, "Remove o sinal de ANDAR", false),
    (13, "Representa visualmente o carro e seu movimento", true),
    (13, "Usa apenas ENM", false),
    (14, "Apenas tempo", false),
    (14, "Apenas sujeito", false),
    (14, "Nada essencial", false),
    (14, "Tempo, intensidade, negação, interrogação", true),
    (15, "Mãos fechadas", false),
    (15, "Sobrancelhas levantadas e leve inclinação de cabeça", true),
    (15, "Movimentos repetidos", false),
    (15, "Classificadores largos", false);
    
    
insert into frases_ativ(texto, id_dificuldade)
    values
    ('Oi, tudo bem?', 1),
	('Oi, qual seu nome?', 1),
	('Boa noite, prazer em te conhecer.', 1),
	('Pai Policial', 1),
	('Mãe Médica', 1),
	('Oi, tudo bom?', 1),
	('Riacho Fundo', 3),
	('Santa Maria', 2),
	('Auxiliar de Cozinha', 2),
	('Planaltina de Goiás', 3),
	('Núcleo Bandeirante', 3),
	('Cidade Ocidental', 3),
	('Santo Antônio do Descoberto', 3),
	('Transportes', 2),
	('Auxiliar de Limpeza', 2),
	('Vicente Pires', 3),
	('Jardins Mangueirão', 3),
	('Lago Norte', 2),
	('Lago Sul', 2),
	('Nervoso', 1),
	('Maio', 1),
	('Amar Mãe', 1),
	('Pai Adotivo Policial', 2),
	('Oi Bombeiro, tudo bem?', 3),
	('Cidade de Brasília', 3);
    
insert into frases_img (id_frase, texto_img, url_img, posicao) 
	values
	(1, 'Oi', 'Oi.png', 1),
	(1, 'Tudo bem?', 'Tudo_bem.png', 2),
	(2, 'Oi', 'Oi.png', 1),
	(2, 'qual seu nome?', 'Qual_seu_nome.png', 2),
	(3, 'Boa noite', 'Boa_noite.png', 1),
	(3, 'Prazer em te conhecer', 'Prazer_em_te_conhecer.png', 2),
	(4, 'Pai', 'Pai.png', 1),
	(4, 'Policial', 'Policial.png', 2),
	(5, 'Mãe', 'Mae.png', 1),
	(5, 'Médica', 'Medica.png', 2),
	(6, 'Oi', 'Oi.png', 1),
	(6, 'Tudo Bom?', 'Tudo_bom.png', 2),
	(7, 'Riacho', 'Riacho.png', 1),
	(7, 'Fundo', 'Fundo.png', 2),
	(8, 'Santa', 'Santa.png', 1),
	(8, 'Maria', 'Maria.png', 2),
	(9, 'Auxiliar', 'Auxiliar.png', 1),
	(9, 'de', 'De.png', 2),
	(9, 'Cozinha', 'Cozinha.png', 3),
	(10, 'Planaltina', 'Planaltina.png', 1),
	(10, 'de Goiás', 'Goias.png', 2),
	(11, 'Núcleo', 'Nucleo.png', 1),
	(11, 'Bandeirante', 'Bandeirante.png', 2),
	(12, 'Cidade', 'Cidade.png', 1),
	(12, 'Ocidental', 'Ocidental.png', 2),
	(13, 'Santo Antônio', 'Santo_Antonio.png', 1),
	(13, 'do Descoberto', 'Descoberto.png', 2),
	(14, 'Transportes', 'Transportes1.png', 1),
    (14, ' ', 'Transportes2.png', 2),
    (14, ' ', 'Transportes3.png', 3),
	(15, 'Auxiliar', 'Auxiliar.png', 1),
	(15, 'de', 'De.png', 2),
	(15, 'Limpeza', 'Limpeza.png', 3),
	(16, 'Vicente', 'Vicente.png', 1),
	(16, 'Pires', 'Pires.png', 2),
	(17, 'Jardins', 'Jardins.png', 1),
	(17, 'Mangueirão', 'Mangueirao.png', 2),
	(18, 'Lago', 'Lago.png', 1),
	(18, 'Norte', 'Norte.png', 2),
	(19, 'Lago', 'Lago.png', 1),
	(19, 'Sul', 'Sul1.png', 2),
    (19, ' ', 'Sul2.png', 3),
	(20, 'Nervosa', 'Nervosa.png', 1),
	(21, 'M', 'M.png', 1),
    (21, 'a', 'A.png', 2),
    (21, 'i', 'I.png', 3),
    (21, 'o', 'O.png', 4),
	(22, 'Amar', 'Amar1.png', 1),
    (22, ' ', 'Amar2.png', 2),
	(22, 'Mãe', 'Mae.png', 3),
	(23, 'Pai', 'Pai.png', 1),
	(23, 'Adotivo', 'Adotivo.png', 2),
	(23, 'Policial', 'Policial.png', 3),
	(24, 'Oi', 'Oi.png', 1),
	(24, 'Bombeiro', 'Bombeiro.png', 2),
	(24, 'Tudo', 'Tudo.png', 3),
	(24, 'Bem', 'Bem.png', 4),
	(25, 'Cidade', 'Cidade1.png', 1),
	(25, 'Brasília', 'Brasilia1.png', 2),
	(25, ' ', 'Brasilia2.png', 3);