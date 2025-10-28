import mysql from "mysql2/promise";

const conection = await mysql.createConnection({
  host: "falar-e-magico.cry2muqqwntr.sa-east-1.rds.amazonaws.com",
  user: "Caio",
  password: "06171825csm",
  multipleStatements: true 
});

await conection.query(`
  CREATE DATABASE IF NOT EXISTS tcc;
  USE tcc;

  CREATE TABLE IF NOT EXISTS usuario (
      id_usuario INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      foto_url VARCHAR(255),
      telefone VARCHAR(255),
      email VARCHAR(100) UNIQUE NOT NULL,
      senha VARCHAR(255),
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      login_social TINYINT(1) DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS dificuldade (
      id_dificuldade INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(50) NOT NULL
  );

  INSERT INTO dificuldade (nome) VALUES 
  ('Iniciante'), 
  ('Intermediário'), 
  ('Avançado');

  CREATE TABLE IF NOT EXISTS curso (
      id_curso INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(200) NOT NULL,
      descricao TEXT,
      id_dificuldade INT NOT NULL,
      id_instrutor INT NOT NULL,
      data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_dificuldade) REFERENCES dificuldade(id_dificuldade),
      FOREIGN KEY (id_instrutor) REFERENCES usuario(id_usuario)
  );

  CREATE TABLE IF NOT EXISTS aula (
      id_aula INT AUTO_INCREMENT PRIMARY KEY,
      id_curso INT NOT NULL,
      titulo VARCHAR(200) NOT NULL,
      descricao TEXT,
      url_video VARCHAR(255),
      ordem INT NOT NULL,
      FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
  );

  CREATE TABLE IF NOT EXISTS tipo_atividade (
      id_tipo_atividade INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL
  );

  INSERT INTO tipo_atividade (nome) VALUES
  ('Jogo de Comparação'),
  ('Quiz'),
  ('Imite o Sinal'),
  ('Organização de Frases'),
  ('Exercício Teórico');

  CREATE TABLE IF NOT EXISTS atividade (
      id_atividade INT AUTO_INCREMENT PRIMARY KEY,
      id_curso INT NOT NULL,
      titulo VARCHAR(200) NOT NULL,
      descricao TEXT,
      id_tipo_atividade INT NOT NULL,
      ordem INT NOT NULL,
      FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
      FOREIGN KEY (id_tipo_atividade) REFERENCES tipo_atividade(id_tipo_atividade)
  );

  CREATE TABLE IF NOT EXISTS progresso (
      id_progresso INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT NOT NULL,
      tipo ENUM('aula','atividade') NOT NULL,
      id_referencia INT NOT NULL,
      concluido BOOLEAN DEFAULT FALSE,
      data_conclusao TIMESTAMP NULL,
      UNIQUE (id_usuario, tipo, id_referencia),
      FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
  );

  CREATE TABLE IF NOT EXISTS categoria (
      id_categoria INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS curso_categoria (
      id_curso INT NOT NULL,
      id_categoria INT NOT NULL,
      PRIMARY KEY (id_curso, id_categoria),
      FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
      FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
  );

  CREATE TABLE IF NOT EXISTS cargo (
      id_adm INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT,
      cargo_adm BOOLEAN,
      FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
  );
`);

export { conection };