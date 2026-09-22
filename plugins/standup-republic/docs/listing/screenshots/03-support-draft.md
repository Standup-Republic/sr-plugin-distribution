# 03 — Allgemeiner Supportfall

## Zweck

Zeigt die Untersuchung eines weitergeleiteten Problems und einen klar als
Entwurf markierten Antworttext, ohne Versand oder Zustandsänderung.

## Rolle und Daten

- Rolle: Employee oder Admin.
- Datenquelle: synthetischer Acceptance-Fall; offiziell öffentliche
  Eventinformationen dürfen ergänzend verwendet werden.
- Fiktive Person, fiktive Bewerbung und keine reale Unterhaltung.

## Prompt

> Eine fiktive Comedienne meldet, ihre Bewerbung für die Demo-Show Köln sei verschwunden. Untersuche den synthetischen Fall und entwirf eine Antwort.

## Fixture-Mindestzustand

- eindeutiges synthetisches Profil, Event und Bewerbungskontext;
- ein belegter aktueller Zustand, der die Meldung erklärt oder widerlegt;
- keine Mutation notwendig.

## Muss sichtbar sein

- verifizierte interne Fakten;
- verbleibende Unsicherheit, falls die zugänglichen Daten keine vollständige
  Ursache beweisen;
- kleinster sinnvoller nächster Schritt;
- separater Abschnitt `Antwortentwurf` mit natürlicher deutscher Formulierung;
- eindeutiger Hinweis, dass nichts gesendet wurde.

## Darf nicht sichtbar sein

- reale Nachricht, Telefonnummer, E-Mail-Adresse oder privater Name;
- interne Refs, Rollen-/Authdetails oder irrelevante Finance-Daten;
- Behauptung eines Versands, einer Wiederherstellung oder anderen Mutation;
- Inline-UI.

## Ablehnen wenn

- Bericht und belegter Zustand nicht sauber getrennt sind;
- die Antwort eine Ursache oder Zustandsänderung erfindet;
- der Entwurf interne Details preisgibt, die die Empfängerin nicht benötigt;
- reale private Kommunikation im Screenshot erscheint.

## Ergebnisdatei

`screenshot-support-draft.png`
