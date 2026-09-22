# Screenshot Capture Package

## Gemeinsamer Vertrag

- Oberfläche: ChatGPT Work Desktop.
- Sprache: vollständig Deutsch.
- Plugin: sichtbarer Name `StandUp Republic Internal`, derselbe private
  versionierte Release in allen drei Captures.
- Daten: ausschließlich synthetische Testdaten oder offiziell öffentliche
  reale Informationen.
- Zustand: genau ein Nutzerprompt und eine vollständige Antwort sichtbar;
  relevante Plugin-/Tool-Zuordnung sichtbar, sofern die Oberfläche sie regulär
  zeigt.
- Darstellung: keine nachträglichen UI-Overlays, Pfeile oder Callouts.
- Redaktion: keine privaten Personen-, Account-, Bank-, Token-, Credential-,
  Task-, Workspace- oder Providerdaten.
- Capture: konsistente Desktop-Fenstergröße und Zoomstufe; finale Ablage als
  PNG unter den unten genannten Dateinamen.
- Abnahme: Niklas prüft Inhalt, Redaktionsgrenzen und sichtbare Oberfläche.

Die Briefs sind capture-fertig, die PNG-Dateien aber noch nicht erzeugt. Eine
echte Aufnahme setzt einen positiv verifizierten Zielrelease und eine separat
freigegebene Installation voraus. Mockups sind ausdrücklich kein Ersatz.

## Szenarien

| Datei nach Capture | Brief | Rolle | Datenklasse |
| --- | --- | --- | --- |
| `screenshot-event-overview.png` | [`01-event-overview.md`](01-event-overview.md) | Employee oder Admin | offiziell öffentlich |
| `screenshot-payout-diagnosis.png` | [`02-payout-diagnosis.md`](02-payout-diagnosis.md) | Admin | synthetisch |
| `screenshot-support-draft.png` | [`03-support-draft.md`](03-support-draft.md) | Employee oder Admin | synthetisch oder offiziell öffentlich |

## Capture-Reihenfolge

1. Zielrelease und Plugin-Version im Setup-Smoke bestätigen.
2. Screenshot-Szenario in einem neuen Chat öffnen.
3. Exakten Prompt aus dem Brief verwenden; keine zusätzlichen versteckten
   Anweisungen oder manuellen Ergebnisformulierungen.
4. Toollauf und Antwort vollständig abschließen lassen.
5. Gegen `Muss sichtbar sein` und `Ablehnen wenn` prüfen.
6. Auf sensible UI-Chrome, Tasknamen, Accountdaten und Benachrichtigungen
   prüfen und bei Bedarf den gesamten Capture sauber wiederholen.
7. PNG unter dem verbindlichen Dateinamen speichern.
8. Hash und Reviewdatum in den Brief ergänzen.
