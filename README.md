# Mario's Pizza

Schulprojekt im Fach Anwendungsentwicklung (Fachinformatiker/in, Berufsschule).
Eine Website für die fiktive Familienpizzeria „Mario's Pizza“ in Brooklyn. Alle Angaben sind erfunden.

## Ordnerstruktur

```
marios-pizza/
├── index.html            Startseite (Willkommen, Speisekarte, Öffnungszeiten, Anfahrt, Kontakt)
├── impressum.html        Platzhalter-Impressum
├── datenschutz.html      Platzhalter-Datenschutz
├── css/style.css         Aussehen (Farben stehen oben als Variablen)
├── js/speisekarte.js     Speisekarte als Daten (Felder wie in der Tabelle `artikel`)
├── js/script.js          Speisekarte anzeigen, Bestellzettel, Öffnungsstatus
└── datenbank/            SQL-Skripte, Modell und Diagramme
    └── marios_pizza_start.sql
```

## Website ansehen

`index.html` doppelklicken (öffnet im Browser) oder in VS Code mit der Erweiterung *Live Server* öffnen.
Es wird nichts installiert und es gibt keine externen Dateien.

## Datenbank anlegen

`datenbank/marios_pizza_start.sql` in MySQL Workbench öffnen (File › Open SQL Script) und komplett ausführen.
Das Skript löscht eine vorhandene Datenbank `marios_pizza` und legt sie mit Startdaten neu an.

## Mit Git arbeiten

```
git status
git add .
git commit -m "Beschreibe kurz, was du geändert hast"
git push
```

Vor dem Arbeiten auf einem anderen Rechner immer zuerst `git pull`.

## Was gehört in dieses Repository?

- Ja: HTML, CSS, JavaScript, Bilder, SQL-Skripte (Struktur und Testdaten), Workbench-Modell (`.mwb`), Diagramme als PNG.
- Nein: die laufende Datenbank selbst (MySQL-Datenordner), Passwörter und Zugangsdaten, echte Kundendaten.
