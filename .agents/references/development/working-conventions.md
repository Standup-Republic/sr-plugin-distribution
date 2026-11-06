# Working Conventions

## Plattformen

- **Vercel:** Standard für Web-Apps, appnahe Backends und Preview-Deployments.
- **Cloudflare Workers:** Eigenständige oder projektübergreifende Dienste. Appnahe Logik bleibt bei der App, sofern eine Auslagerung keinen konkreten Vorteil bringt.
- **Cloudflare R2:** Standard für große Dateien und Medien. Supabase Storage bei engem Bezug zu Supabase-Berechtigungen.
- **Supabase:** Relationale Produktdaten und Authentifizierung. Cloudflare D1 nur für abgegrenzte, Worker-eigene Daten.
- **1Password:** Zentrale Quelle für Zugangsdaten; Laufzeit-Secrets liegen zusätzlich in den jeweiligen Deployment-Plattformen.
- **GitHub / Actions:** Repositories, PRs und CI.

Neue Repositories benötigen nicht automatisch eigene Infrastruktur. Bestehende Dienste, Identitäten und Datenquellen passend zur Produktgrenze wiederverwenden; Zuständigkeiten, Projektzuordnung und Umgebungen im jeweiligen Repository dokumentieren.

## Code-Konventionen

- Fachbegriffe konsistent verwenden: Show, Event, Venue und Promoter sind unterschiedliche Konzepte.
- Geschäftsregeln zentral implementieren und aus UI, API und Hintergrundjobs wiederverwenden.
- Externe Eingaben an Systemgrenzen validieren. Datenbank- und API-Typen aus kanonischen Quellen ableiten; generierte Dateien nicht manuell bearbeiten.
- Geldbeträge mit eindeutiger Währung und Einheit führen; Brutto, Netto und Gebühren unterscheiden. Integer-Untereinheiten oder Dezimalarithmetik für Geldberechnungen verwenden.
- Zeitpunkte eindeutig mit UTC-Offset übertragen; Veranstaltungszeitzonen für lokale Darstellung und Terminberechnungen berücksichtigen.
- Fehlende oder unbekannte Werte nicht stillschweigend durch `0`, `false` oder einen Erfolgsstatus ersetzen.
- Wiederholbare Webhooks und Jobs idempotent gestalten; Zahlungs- und Versandfehler explizit abbilden.

## PR-Titel

- Kurz, konkret und ohne Vorwissen verständlich formulieren.
- Die Änderung mit möglichst wenigen Worten benennen; entscheidende Details beibehalten.
- Keine technischen Präfixe wie `feat:` oder `fix:`, internen Abkürzungen oder Floskeln wie „Verbesserungen“.
- Beispiele: „Ticketversand erneut versuchen“, „Ausverkaufte Events kennzeichnen“, „Doppelte Erstattungen verhindern“.

## Pull Requests

- Die Beschreibung folgt diesem Schema:
  1. **Änderung:** ein bis drei kurze Sätze zum Ergebnis.
  2. **Vorschau:** bei UI/UX-Änderungen eingebettete Screenshots der tatsächlich implementierten Ansicht; bei Bedarf kurze Videos.
  3. **Prüfung:** knapp festhalten, was geprüft wurde und was offen ist.
- Visuelle Nachweise zeigen den aktuellen PR-Stand in der laufenden Anwendung. Relevante Zustände und Bildschirmgrößen abdecken; Vorher/Nachher nur, wenn es die Änderung verständlicher macht.
- Bilder direkt im PR sichtbar und für Reviewer zugänglich einbinden. Mockups gelten nicht als Implementierungsnachweis. Ist eine echte Vorschau nicht möglich, den konkreten Grund nennen.
- Beschreibung und Vorschau bei wesentlichen Änderungen aktualisieren; den endgültigen Stand beschreiben, kein Arbeitsprotokoll führen.
- Unfertige Änderungen als Draft öffnen; erst bei erfüllten Repository-Prüfungen und ohne bekannte Merge-Blocker zur Review geben.

## Koordination auf GitHub

### Issues

- Agents dürfen eigenständig Issues für entdeckte Fehler, Verbesserungen und Folgearbeiten erstellen, auch außerhalb des aktuellen PR-Umfangs.
- Vorher nach bestehenden Issues suchen; passende Issues ergänzen, statt Duplikate anzulegen.
- Issues beschreiben knapp das Problem, konkrete Belege und das gewünschte Ergebnis. Vermutungen ausdrücklich kennzeichnen.
- Folgearbeiten mit dem auslösenden PR verlinken. Ihre Erfassung erweitert nicht automatisch den Implementierungsauftrag.
- `Closes #…` nur verwenden, wenn der PR das Issue vollständig löst; andernfalls lediglich referenzieren.

### Selbstständige Pflege

- Vorhandene Labels, Projects und Milestones ohne Rückfrage zuordnen, wenn deren dokumentierte Bedeutung eindeutig passt.
- Projektstatus anhand belegter Fortschritte aktualisieren. „Erledigt“ setzt die festgelegten Abschlusskriterien voraus; ein geöffneter PR allein genügt nicht.
- Assignees und Reviewer anhand festgelegter Zuständigkeiten setzen. Keine Zuständigkeiten, Prioritäten oder Termine erfinden.
- Bereits freigegebene Strukturänderungen oder dokumentierte Automatisierungsregeln ohne erneute Rückfrage umsetzen.

### Strukturentscheidungen

- Proaktiv eine konkrete Anpassung vorschlagen, wenn Labels zur Einordnung fehlen, zusammengehörige Arbeit ein Project benötigt oder ein gemeinsames Lieferziel einen Milestone rechtfertigt.
- Der Vorschlag nennt Name, Zweck und betroffene Issues/PRs. Zusammengehörige Entscheidungen gebündelt abfragen.
- Neue Labels, Projects und Milestones sowie Änderungen an ihrer Bedeutung oder Struktur benötigen Freigabe, sofern keine dokumentierte Regel ihre Anlage oder Änderung bereits erlaubt.
- Änderungen an Prioritäten, Zielterminen oder Zuständigkeiten benötigen einen bestehenden Auftrag oder eine explizite Entscheidung.
- Löschen, Archivieren und repoübergreifende Massenänderungen benötigen eine ausdrückliche Freigabe.

## Zugangsdaten und Accounts

- Für SR-Projekte die vorgesehenen Organisationsaccounts verwenden; persönliche Accounts nicht als Infrastruktur-Eigentümer einsetzen.
- 1Password ist die kanonische Quelle für Zugangsdaten. Agents nutzen den vorgesehenen Service Account mit exakten `op://`-Referenzen über `op read` oder `op run`.
