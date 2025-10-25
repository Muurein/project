# Universitet Hornborgarsjön - projektuppgift i kursen Programmering i TypeScript

Uppgiften gick ut på att skapa en webbplats till ett fiktivt lärosäte, som här heter Universitet Hornborgarsjön. Webbplatsen hämtar data från en lokalt sparad JSON-fil (med hjälp av HTTPClient) som innehåller kurser på Mittuniversitetet. Dessa kurser ska presenteras i en tabell som det fikitva lärosätets egna kurser. Det ska också vara möjligt att spara kurserna i ett eget ramschema.

Användare ska också kunna sortera, söka och filtrera den data som tabellerna presenterar.

Webbplatsen har skapats med ramverket *Angular v20*.


## Tabellerna
Tabellerna innehåller fem olika kolumner:
1. Kursnamn
2. Kurskod
3. Poäng
4. Ämne
5. Knapp (i kurstabellen är det en "lägg till i ramschemat"-knapp, I ramschemat är det en "ta bort från ramschemat-knapp).

En kurs kan inte läggas till mer än en gång i ramschemat. 

### Filtrering
Det finns ett sökfält där användaren kan söka på den data som finns i tabellerna. Det finns även en rullgardinsmeny där man kan filtrera efter ämnen. 

Om användaren skulle vilja soretera en kolumn kan hen klicka på önskad kolumns rubrik.


### Övrigt
Båda tabellerna visar hur många kurser som visas för tillfället. Detta uppdateras vid varje sökning.

Ramschemat visar också summan av kursernas sammanlagda poäng.



## Material
Förutom lärarlett material har även material från *Angular* använts, ex. för att skapa tabellerna. Loggan och faviconen skapades i *Canva*.



## Betygsatsning
Jag har siktat på ett godkänt betyg. Med andra ord har jag inte lagt till någon extra funktionalitet än grundkraven.