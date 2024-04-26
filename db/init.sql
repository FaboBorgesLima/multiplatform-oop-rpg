CREATE TABLE IF NOT EXISTS resources (
    id_resources INT PRIMARY KEY AUTO_INCREMENT,
    bones INT NOT NULL,
    meat INT NOT NULL,
    souls INT NOT NULL
);

CREATE TABLE IF NOT EXISTS player (
    id_player INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(45) NOT NULL,
    player_password CHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_card (
    id_game_card INT PRIMARY KEY AUTO_INCREMENT,
    id_resources_price INT NOT NULL,
    id_resources_generation INT NOT NULL,
    initial_life INT NOT NULL,
    initial_damage INT NOT NULL,
    card_name VARCHAR(45) NOT NULL,
    card_description VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_resources_generation) REFERENCES resources(id_resources),
    FOREIGN KEY (id_resources_price) REFERENCES resources(id_resources)
);

CREATE TABLE IF NOT EXISTS challenger (
    id_challenger INT PRIMARY KEY AUTO_INCREMENT,
    id_resources INT NOT NULL,
    FOREIGN KEY (id_resources) REFERENCES resources(id_resources)
);

CREATE TABLE IF NOT EXISTS player_challenger (
    id_player_challenger INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    id_player INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_player) REFERENCES player(id_player)
);

CREATE TABLE IF NOT EXISTS player_deck (
    id_player_deck INT PRIMARY KEY AUTO_INCREMENT,
    id_game_card INT NOT NULL,
    id_player INT NOT NULL,
    FOREIGN KEY (id_player) REFERENCES player(id_player),
    FOREIGN KEY (id_game_card) REFERENCES game_card(id_game_card)
);

CREATE TABLE IF NOT EXISTS challenger_game_card (
    id_challenger_card INT PRIMARY KEY AUTO_INCREMENT,
    id_challenger INT NOT NULL,
    id_game_card INT NOT NULL,
    FOREIGN KEY (id_challenger) REFERENCES challenger(id_challenger),
    FOREIGN KEY (id_game_card) REFERENCES game_card(id_game_card)
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

CREATE TABLE IF NOT EXISTS game_card_trench (
    id_game_card_trench INT PRIMARY KEY AUTO_INCREMENT,
    id_game_card INT NOT NULL,
    game_card_col TINYINT NOT NULL,
    game_card_row TINYINT NOT NULL,
    life INT NOT NULL,
    FOREIGN KEY (id_game_card) REFERENCES game_card(id_game_card)
);