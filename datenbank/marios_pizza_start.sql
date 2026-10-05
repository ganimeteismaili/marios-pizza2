-- Mario's Pizza · Startpunkt für Übung 02 (Datenbanken)
-- In MySQL Workbench öffnen (File > Open SQL Script) und mit dem Blitz-Symbol komplett ausführen.

DROP DATABASE IF EXISTS marios_pizza;
CREATE DATABASE marios_pizza CHARACTER SET utf8mb4;
USE marios_pizza;

CREATE TABLE kategorie (
    kategorie_id  INT PRIMARY KEY AUTO_INCREMENT,
    bezeichnung   VARCHAR(30) NOT NULL
);

CREATE TABLE artikel (
    artikel_id    INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(50) NOT NULL,
    beschreibung  VARCHAR(120),
    preis         DECIMAL(6,2) NOT NULL,
    kategorie_id  INT NOT NULL,
    FOREIGN KEY (kategorie_id) REFERENCES kategorie (kategorie_id)
);

CREATE TABLE kunde (
    kunde_id      INT PRIMARY KEY AUTO_INCREMENT,
    vorname       VARCHAR(40) NOT NULL,
    nachname      VARCHAR(40) NOT NULL,
    telefon       VARCHAR(20),
    strasse       VARCHAR(60),
    plz           VARCHAR(10),
    ort           VARCHAR(40)
);

CREATE TABLE bestellung (
    bestell_id    INT PRIMARY KEY AUTO_INCREMENT,
    kunde_id      INT NOT NULL,
    bestelldatum  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lieferart     VARCHAR(15) NOT NULL,
    FOREIGN KEY (kunde_id) REFERENCES kunde (kunde_id)
);

CREATE TABLE bestellposition (
    bestell_id    INT NOT NULL,
    artikel_id    INT NOT NULL,
    menge         INT NOT NULL DEFAULT 1,
    PRIMARY KEY (bestell_id, artikel_id),
    FOREIGN KEY (bestell_id) REFERENCES bestellung (bestell_id),
    FOREIGN KEY (artikel_id) REFERENCES artikel (artikel_id)
);

INSERT INTO kategorie (bezeichnung) VALUES ('Pizza'), ('Getränk'), ('Dessert');

INSERT INTO artikel (name, beschreibung, preis, kategorie_id) VALUES
('Margherita',       'Tomaten, Mozzarella, Basilikum',          12.50, 1),
('Pepperoni',        'Tomaten, Mozzarella, Pepperoni-Salami',   14.00, 1),
('Funghi',           'Tomaten, Mozzarella, Champignons',        14.00, 1),
('Mario''s Special', 'Tomaten, Mozzarella, Salami, Peperoni',   16.50, 1),
('Luigi''s Verde',   'Mozzarella, Spinat, Zucchini, Pesto',     15.00, 1),
('Quattro Formaggi', 'Vier Käsesorten',                         15.50, 1),
('Cola',             '0,33 l',                                   3.50, 2),
('Wasser',           '0,50 l',                                   2.50, 2),
('Tiramisu',         'Nach Rezept der Nonna',                    6.50, 3);

INSERT INTO kunde (vorname, nachname, telefon, strasse, plz, ort) VALUES
('Tony',  'Russo',     '+1 718 555 0101', 'Court Street 12',     '11201', 'Brooklyn'),
('Maria', 'Lombardi',  '+1 718 555 0102', 'Montague Street 40',  '11201', 'Brooklyn'),
('Sam',   'Kowalski',  '+1 718 555 0103', 'Atlantic Avenue 88',  '11217', 'Brooklyn'),
('Aisha', 'Johnson',   NULL,              'Smith Street 7',      '11231', 'Brooklyn');

INSERT INTO bestellung (kunde_id, bestelldatum, lieferart) VALUES
(1, '2026-09-25 18:30:00', 'Lieferung'),
(2, '2026-09-26 12:15:00', 'Abholung'),
(1, '2026-09-27 19:45:00', 'Vor Ort'),
(3, '2026-09-28 20:10:00', 'Lieferung');

INSERT INTO bestellposition (bestell_id, artikel_id, menge) VALUES
(1, 1, 2), (1, 7, 2),
(2, 4, 1), (2, 8, 1),
(3, 2, 1), (3, 3, 1), (3, 7, 2), (3, 9, 2),
(4, 6, 1), (4, 5, 1);
