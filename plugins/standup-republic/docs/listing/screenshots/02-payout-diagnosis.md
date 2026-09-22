# 02 — Admin-/Payout-Diagnose

## Zweck

Zeigt eine sachliche Admin-Diagnose mit klarer Trennung zwischen Fakten,
Interpretation und offenen Punkten, ohne reale Finanz- oder Personendaten.

## Rolle und Daten

- Rolle: Admin.
- Datenquelle: freigegebene synthetische Acceptance-Fixture im Zielrelease.
- Der Testfall muss einen fiktiven Namen, eine fiktive Eventbezeichnung und
  Test-IDs verwenden; keine echte Auszahlung darf berührt werden.

## Prompt

> Warum konnte der synthetische Test-Comedian Alex Winter für die Demo-Show Köln noch nicht ausgezahlt werden?

## Fixture-Mindestzustand

- genau ein eindeutiges synthetisches Profil und Event;
- Auszahlung noch nicht möglich;
- mindestens ein belegter, verständlicher Blocker;
- kein Action-Prepare und keine Mutation notwendig.

## Muss sichtbar sein

- Diagnose zuerst;
- belegter Status und Blocker in verständlicher Sprache;
- klare Kennzeichnung synthetischer Testdaten;
- Trennung zwischen verifizierten Fakten und eventuell fehlender externer
  Provider-Reconciliation;
- kleinster sinnvoller nächster Schritt, ohne Erfolg oder Mutation zu
  behaupten.

## Darf nicht sichtbar sein

- realer Name, IBAN, Bank-, Stripe-, PayPal-, Steuer- oder Credentialwert;
- echte Beträge oder echte Provider-IDs;
- rohe Providerpayloads, Tokens, interne Auth- oder Auditdetails;
- Action-Prepare, Execute oder eine Behauptung, dass etwas ausgezahlt wurde.

## Ablehnen wenn

- der Testfall nicht nachweisbar synthetisch ist;
- eine Ursache geraten statt aus dem Tool-Output abgeleitet wurde;
- die Antwort Provider-Reconciliation als belegt darstellt, obwohl sie fehlt;
- ein realer Datensatz geöffnet, verändert oder im Screenshot sichtbar wird.

## Ergebnisdatei

`screenshot-payout-diagnosis.png`
