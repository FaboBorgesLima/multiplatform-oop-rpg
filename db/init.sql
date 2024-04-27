-- layer 1

CREATE TABLE IF NOT EXISTS resources (
    id_resources INT PRIMARY KEY AUTO_INCREMENT,
    bones INT NOT NULL,
    meat INT NOT NULL,
    souls INT NOT NULL
);

CREATE TABLE IF NOT EXISTS player (
    id_player INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(45) NOT NULL UNIQUE,
    player_password CHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS buyable_card (
    id_buyable_card INT PRIMARY KEY AUTO_INCREMENT,
    card_name VARCHAR(45) NOT NULL UNIQUE
);

-- layer 2

CREATE TABLE IF NOT EXISTS challenger (
    id_challenger INT PRIMARY KEY AUTO_INCREMENT,
    id_resources INT NOT NULL,
    FOREIGN KEY (id_resources) REFERENCES resources(id_resources)
);

-- layer 3

CREATE TABLE IF NOT EXISTS challenger_deck (
    id_challenger_deck INT PRIMARY KEY AUTO_INCREMENT,
    id_buyable_card INT NOT NULL,
    id_challenger INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_buyable_card) REFERENCES buyable_card(id_buyable_card)
);

CREATE TABLE IF NOT EXISTS battle_field (
    id_battle_field INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger1 INT NOT NULL,
    id_challenger2 INT NOT NULL,
    FOREIGN KEY (id_challenger1) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_challenger2) REFERENCES challenger(id_challenger)
);

CREATE TABLE IF NOT EXISTS trench (
    id_trench INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger)
);

CREATE TABLE IF NOT EXISTS player_challenger (
    id_player_challenger INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    id_player INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_player) REFERENCES player(id_player)
);

-- layer 4

CREATE TABLE IF NOT EXISTS challenger_deck_card (
    id_challenger_deck_card INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    id_challenger_deck INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_challenger_deck) REFERENCES challenger_deck(id_challenger_deck)
);


CREATE TABLE IF NOT EXISTS trench_card (
    id_trench_card INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger_deck INT NOT NULL,
    game_card_col TINYINT NOT NULL,
    game_card_row TINYINT NOT NULL,
    life INT NOT NULL,
    FOREIGN KEY (id_challenger_deck) REFERENCES challenger_deck(id_challenger_deck)
);