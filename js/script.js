// Mario's Pizza · Startpunkt
// Diese Datei macht drei Dinge: Speisekarte anzeigen, Bestellzettel führen, Öffnungsstatus zeigen.

/* ---------- Hilfsfunktion: Preis als „12,50 $“ ---------- */
function alsPreis(zahl) {
    return zahl.toLocaleString("de-DE", { style: "currency", currency: "USD" });
}

/* ---------- 1. Speisekarte anzeigen (nur auf der Startseite) ---------- */
const listeElement = document.getElementById("speisekarte-liste");
const filterElement = document.getElementById("filter");
let aktiverFilter = "Alle";

function zeigeSpeisekarte() {
    listeElement.innerHTML = "";
    const kategorien = [...new Set(SPEISEKARTE.map(a => a.kategorie))];

    for (const kategorie of kategorien) {
        if (aktiverFilter !== "Alle" && aktiverFilter !== kategorie) continue;

        const ueberschrift = document.createElement("h3");
        ueberschrift.textContent = kategorie === "Pizza" ? "Pizzen" : kategorie === "Getränk" ? "Getränke" : "Desserts";
        listeElement.appendChild(ueberschrift);

        const ul = document.createElement("ul");
        for (const artikel of SPEISEKARTE.filter(a => a.kategorie === kategorie)) {
            const li = document.createElement("li");
            li.className = "artikel";
            li.innerHTML = `
                <span>
                    <span class="artikel-name">${artikel.name}</span>
                    <span class="artikel-text">${artikel.beschreibung}</span>
                </span>
                <span class="artikel-preis">${alsPreis(artikel.preis)}</span>
                <button type="button" class="plus" aria-label="${artikel.name} zum Bestellzettel hinzufügen">+</button>`;
            li.querySelector("button").addEventListener("click", () => hinzufuegen(artikel.id));
            ul.appendChild(li);
        }
        listeElement.appendChild(ul);
    }
}

function baueFilter() {
    for (const name of ["Alle", "Pizza", "Getränk", "Dessert"]) {
        const knopf = document.createElement("button");
        knopf.type = "button";
        knopf.textContent = name === "Alle" ? "Alles" : name === "Pizza" ? "Pizzen" : name === "Getränk" ? "Getränke" : "Desserts";
        knopf.setAttribute("aria-pressed", String(name === aktiverFilter));
        knopf.addEventListener("click", () => {
            aktiverFilter = name;
            for (const k of filterElement.children) k.setAttribute("aria-pressed", String(k === knopf));
            zeigeSpeisekarte();
        });
        filterElement.appendChild(knopf);
    }
}

/* ---------- 2. Bestellzettel ----------
   bestellung = Map mit artikel_id → Menge.
   Genau das speichert später die Tabelle `bestellposition` (bestell_id, artikel_id, menge). */
const bestellung = new Map();
const zettelListe = document.getElementById("zettel-liste");
const zettelLeer = document.getElementById("zettel-leer");
const zettelSumme = document.getElementById("zettel-summe");
const zettelSenden = document.getElementById("zettel-senden");
const zettelMeldung = document.getElementById("zettel-meldung");

function hinzufuegen(id) {
    bestellung.set(id, (bestellung.get(id) || 0) + 1);
    zettelMeldung.textContent = "";
    zeigeZettel();
}

function aendereMenge(id, schritt) {
    const neu = (bestellung.get(id) || 0) + schritt;
    if (neu <= 0) bestellung.delete(id); else bestellung.set(id, neu);
    zeigeZettel();
}

function zeigeZettel() {
    zettelListe.innerHTML = "";
    let summe = 0;
    for (const [id, menge] of bestellung) {
        const artikel = SPEISEKARTE.find(a => a.id === id);
        summe += artikel.preis * menge;
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${menge} × ${artikel.name}</span>
            <span>${alsPreis(artikel.preis * menge)}</span>
            <span class="zeile-steuerung">
                <button type="button" aria-label="Eins weniger ${artikel.name}">−</button>
                <button type="button" aria-label="Eins mehr ${artikel.name}">+</button>
            </span>`;
        const [weniger, mehr] = li.querySelectorAll("button");
        weniger.addEventListener("click", () => aendereMenge(id, -1));
        mehr.addEventListener("click", () => aendereMenge(id, +1));
        zettelListe.appendChild(li);
    }
    zettelLeer.hidden = bestellung.size > 0;
    zettelSumme.textContent = alsPreis(summe);
    zettelSenden.disabled = bestellung.size === 0;
}

function schickeAb() {
    // Hier fehlt noch das Backend. Später würde an dieser Stelle ein INSERT in
    // `bestellung` und je ein INSERT in `bestellposition` stehen.
    const anzahl = [...bestellung.values()].reduce((a, b) => a + b, 0);
    bestellung.clear();
    zeigeZettel();
    zettelMeldung.textContent = `Danke! ${anzahl} Artikel sind notiert. (Demo: Es wurde nichts gesendet.)`;
}

/* ---------- 3. Öffnungsstatus (Zeit in New York) ---------- */
// Öffnungszeiten je Wochentag: 0 = Sonntag … 6 = Samstag. Zeiten als [von, bis] in Minuten ab Mitternacht.
const ZEITEN = {
    0: [[12 * 60, 21 * 60]],
    1: [],
    2: [[11.5 * 60, 14 * 60], [17 * 60, 22 * 60]],
    3: [[11.5 * 60, 14 * 60], [17 * 60, 22 * 60]],
    4: [[11.5 * 60, 14 * 60], [17 * 60, 22 * 60]],
    5: [[11.5 * 60, 14 * 60], [17 * 60, 22 * 60]],
    6: [[12 * 60, 23 * 60]]
};

function jetztInNewYork() {
    // Die aktuelle New Yorker Uhrzeit als Datumsobjekt
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
}

function zeigeStatus() {
    const statusElement = document.getElementById("status");
    const jetzt = jetztInNewYork();
    const tag = jetzt.getDay();
    const minuten = jetzt.getHours() * 60 + jetzt.getMinutes();
    const offen = ZEITEN[tag].some(([von, bis]) => minuten >= von && minuten < bis);

    statusElement.textContent = offen ? "Gerade geöffnet (Ortszeit Brooklyn)" : "Gerade geschlossen (Ortszeit Brooklyn)";
    statusElement.className = "status " + (offen ? "offen" : "zu");

    // Heutige Zeile in der Öffnungszeiten-Liste hervorheben
    for (const zeile of document.querySelectorAll("#zeiten div")) {
        if (zeile.dataset.tage.split(",").includes(String(tag))) zeile.classList.add("heute");
    }
}

/* ---------- Start ---------- */
if (listeElement) {
    baueFilter();
    zeigeSpeisekarte();
    zeigeZettel();
    zettelSenden.addEventListener("click", schickeAb);
}
if (document.getElementById("status")) zeigeStatus();
