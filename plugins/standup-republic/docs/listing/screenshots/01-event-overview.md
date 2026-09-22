# 01 — Allgemeine Eventübersicht

## Zweck

Zeigt eine natürliche, grounded Listenabfrage für öffentlich bekannte
Comedyflash-Termine ohne private Daten.

## Rolle und Daten

- Rolle: Employee oder Admin.
- Datenquelle: aktuelle offizielle öffentliche Eventinformationen, gelesen
  über den SR-MCP-Zielrelease.
- Keine synthetische Ergänzung zu einem echten Ergebnis.

## Prompt

> Welche Comedyflash-Shows finden nächste Woche in Köln statt?

## Muss sichtbar sein

- klare direkte Antwort auf die nächste Kalenderwoche;
- Datum, Uhrzeit und Venue je gefundenem Termin, soweit im SR-Ergebnis
  vorhanden;
- nachvollziehbare Abgrenzung von Köln und dem abgefragten Zeitraum;
- kurzer Frische- oder Abdeckungs-Hinweis, wenn der Tool-Output ihn liefert;
- bei leerem Ergebnis eine ehrliche Nullantwort statt erfundener Shows.

## Darf nicht sichtbar sein

- interne Event-Refs, Trace-IDs oder Toolargumente ohne Nutzerwert;
- Teilnehmer-, Bewerbungs-, Buchungs- oder Kontaktdaten;
- nicht öffentliche interne Notizen, Kapazitäts- oder Finanzdetails;
- Inline-UI oder eine Behauptung, dass UI Teil des Plugins sei.

## Ablehnen wenn

- eine Show nicht durch den aktuellen SR-Output belegt ist;
- die Antwort das relative Datum nicht in einen eindeutigen Zeitraum
  auflöst;
- private Daten oder andere App-/Workspace-Inhalte im Screenshot erscheinen;
- der sichtbare Pluginname oder die Version nicht dem Zielrelease entspricht.

## Ergebnisdatei

`screenshot-event-overview.png`
