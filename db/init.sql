-- layer 1

CREATE TABLE IF NOT EXISTS resources (
    id_resources INT PRIMARY KEY AUTO_INCREMENT,
    bones INT NOT NULL,
    meat INT NOT NULL,
    souls INT NOT NULL,
    blood INT NOT NULL
);

-- layer 2

CREATE TABLE IF NOT EXISTS challenger (
    id_challenger INT PRIMARY KEY AUTO_INCREMENT,
    id_resources INT NOT NULL,
    FOREIGN KEY (id_resources) REFERENCES resources(id_resources)
);

-- layer 3

CREATE TABLE IF NOT EXISTS player (
    id_player INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(45) NOT NULL UNIQUE,
    player_password CHAR(64) NOT NULL,
    player_email VARCHAR(255) NOT NULL,
    id_challenger INT NOT NULL UNIQUE,
    api_key CHAR(64),
    last_logged_in DATE,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger)
);

CREATE TABLE IF NOT EXISTS challenger_deck (
    id_challenger_deck INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    card_name VARCHAR(45) NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger)
);

CREATE TABLE IF NOT EXISTS battle_field (
    id_battle_field INT PRIMARY KEY AUTO_INCREMENT,
    rounds INT NOT NULL,
    id_challenger1 INT NOT NULL,
    id_challenger2 INT NOT NULL,
    FOREIGN KEY (id_challenger1) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_challenger2) REFERENCES challenger(id_challenger)
);

-- layer 4

CREATE TABLE IF NOT EXISTS challenger_deck_card (
    id_challenger_deck_card INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    card_name VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS trench (
    card_col TINYINT NOT NULL,
    card_row TINYINT NOT NULL,
    id_challenger INT NOT NULL,
    life INT NOT NULL,
    card_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_challenger , card_col  ,card_row  ),
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger)
);