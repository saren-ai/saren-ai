const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'src', 'data', 'db.sqlite3');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS concerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_year INTEGER,
    date_month TEXT,
    date_day INTEGER,
    artist TEXT,
    venue TEXT,
    location TEXT
  );
  DELETE FROM concerts;
`);

const rawText = `The Cars were my first concert.

14
2008
The Police
Shoreline Amphitheatre, Mountain View, CA, USA
Add a private note
JUL
14
2008
Elvis Costello & The Imposters
Shoreline Amphitheatre, Mountain View, CA, USA
Add a private note
SEP
16
1998
Eminem
Maritime Hall, San Francisco, CA, USA
Add a private note
SEP
13
1998
Beastie Boys
The Arena in Oakland, Oakland, CA, USA
Add a private note
SEP
13
1998
George Clinton and the P-Funk All Stars
The Fillmore, San Francisco, CA, USA
Add a private note
JUN
16
1996
Rage Against the Machine
Tibetan Freedom Concert 1996
Add a private note
JUN
16
1996
Red Hot Chili Peppers
Tibetan Freedom Concert 1996
Add a private note
JUN
16
1996
Beck
Tibetan Freedom Concert 1996
Add a private note
JUN
16
1996
Sonic Youth
Tibetan Freedom Concert 1996
Add a private note
JUN
16
1996
De La Soul
Tibetan Freedom Concert 1996
Add a private note
JUN
16
1996
Fugees
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
The Smashing Pumpkins
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
Foo Fighters
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
Beastie Boys
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
Pavement
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
Cibo Matto
Tibetan Freedom Concert 1996
Add a private note
JUN
15
1996
A Tribe Called Quest
Tibetan Freedom Concert 1996
Add a private note
AUG
18
1995
Sonic Youth
Lollapalooza 1995
Add a private note
AUG
18
1995
Hole
Lollapalooza 1995
Add a private note
AUG
18
1995
Beck
Lollapalooza 1995
Add a private note
AUG
18
1995
Pavement
Lollapalooza 1995
Add a private note
AUG
18
1995
Versus
Lollapalooza 1995
Add a private note
JUL
31
1994
Sausage
William Randolph Hearst Greek Theatre, Berkeley, CA, USA
Add a private note
JUL
31
1994
Rollins Band
William Randolph Hearst Greek Theatre, Berkeley, CA, USA
Add a private note
JUL
31
1994
Helmet
William Randolph Hearst Greek Theatre, Berkeley, CA, USA
Add a private note
MAR
31
1994
The Breeders
The Warfield, San Francisco, CA, USA
Add a private note
JUN
22
1993
Alice in Chains
Lollapalooza 1993
Add a private note
JUN
22
1993
Primus
Lollapalooza 1993
Add a private note
JUN
22
1993
Rage Against the Machine
Lollapalooza 1993
Add a private note
JUN
22
1993
Tool
Lollapalooza 1993
Add a private note
JUN
22
1993
Dinosaur Jr.
Lollapalooza 1993
Add a private note
JUN
22
1993
Babes in Toyland
Lollapalooza 1993
Add a private note
JUN
22
1993
Fishbone
Lollapalooza 1993
Add a private note
JUN
22
1993
Arrested Development
Lollapalooza 1993
Add a private note
JAN
29
1993
Overwhelming Colorfast
The Kennel Club, San Francisco, CA, USA
Add a private note
SEP
24
1992
Sonic Youth
The Warfield, San Francisco, CA, USA
Add a private note
SEP
24
1992
Pavement
The Warfield, San Francisco, CA, USA
Add a private note
DEC
16
1989
Ramones
The New Ritz, New York, NY, USA
Add a private note
OCT
21
1988
Fishbone
The Ritz, New York, NY, USA
Add a private note
JUL
29
1988
Squeeze
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
23
1988
Run‐D.M.C.
Capital Centre, Landover, MD, USA
Add a private note
JUN
24
1988
Boogie Down Productions
Baltimore Arena, Baltimore, MD, USA
Add a private note
JUN
24
1988
Ice‐T
Baltimore Arena, Baltimore, MD, USA
Add a private note
JUN
24
1988
Eric B. & Rakim
Baltimore Arena, Baltimore, MD, USA
Add a private note
OCT
24
1987
Sonic Youth
Nightshift Cafe, Naugatuck, CT, USA
Add a private note
OCT
22
1987
Schoolly D
Revival, Philadelphia, PA, USA
Add a private note
SEP
15
1987
Grateful Dead
Madison Square Garden, New York, NY, USA
Add a private note
AUG
29
1987
Verbal Abuse
The New Loft, Baltimore, MD, USA
Add a private note
AUG
29
1987
Fang
The New Loft, Baltimore, MD, USA
Add a private note
AUG
15
1987
Beastie Boys
Capital Centre, Landover, MD, USA
Add a private note
AUG
15
1987
Run‐D.M.C.
Capital Centre, Landover, MD, USA
Add a private note
NOV
07
1986
Ramones
The Ritz, New York, NY, USA
Add a private note
SEP
27
1986
Die Kreuzen
CBGB, New York, NY, USA
Add a private note
AUG
16
1986
Fine Young Cannibals
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
AUG
16
1986
UB40
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
AUG
04
1986
The Psychedelic Furs
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
25
1986
The Bangles
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
20
1986
INXS
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
12
1986
Joe Jackson
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
07
1986
Grateful Dead
Robert F. Kennedy Memorial Stadium, Washington, DC, USA
Add a private note
JUL
07
1986
Bob Dylan with Tom Petty and the Heartbreakers
Robert F. Kennedy Memorial Stadium, Washington, DC, USA
Add a private note
JUL
07
1986
Tom Petty and the Heartbreakers
Robert F. Kennedy Memorial Stadium, Washington, DC, USA
Add a private note
JUN
15
1986
Joe Jackson
Poplar Creek Music Theater, Hoffman Estates, IL, USA
Add a private note
MAY
17
1986
Youth Brigade
Eutaw Street Clubhouse, Baltimore, MD, USA
Add a private note
MAY
10
1986
Dag Nasty
Eutaw Street Clubhouse, Baltimore, MD, USA
Add a private note
JAN
24
1986
Asexuals
Eutaw Street Clubhouse, Baltimore, MD, USA
Add a private note
AUG
17
1985
Adrenalin O.D.
Eutaw Street Clubhouse, Baltimore, MD, USA
Add a private note
JUL
20
1985
Midnight Oil
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
08
1985
Black Flag
Fisherman's Inn, Baltimore, MD, USA
Add a private note
JUL
08
1985
Saint Vitus
Fisherman's Inn, Baltimore, MD, USA
Add a private note
JUL
08
1985
Tom Troccoli’s Dog
Fisherman's Inn, Baltimore, MD, USA
Add a private note
JUL
01
1985
Grateful Dead
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUN
30
1985
Asexuals
The New Loft, Baltimore, MD, USA
Add a private note
JUN
27
1985
Eric Clapton
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUN
26
1985
Howard Jones
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
APR
13
1985
Samhain
Typographer's Hall, Baltimore, MD, USA
Add a private note
APR
13
1985
Reptile House
Typographer's Hall, Baltimore, MD, USA
Add a private note
JAN
04
1985
Circle Jerks
The New Loft, Baltimore, MD, USA
Add a private note
AUG
10
1984
Elvis Costello
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
AUG
10
1984
Nick Lowe and His Cowboy Outfit
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
31
1984
Eurythmics
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
31
1984
Howard Jones
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
29
1984
Pretenders
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
29
1984
Simple Minds
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
08
1984
Go‐Go’s
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUN
23
1984
Joe Jackson
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
AUG
27
1983
David Bowie
Capital Centre, Landover, MD, USA
Add a private note
AUG
16
1983
Elvis Costello & The Attractions
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
AUG
16
1983
Aztec Camera
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
28
1983
Men at Work
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
JUL
15
1983
The B‐52s
Merriweather Post Pavilion, Columbia, MD, USA
Add a private note
APR
21
1983
Stray Cats
Baltimore Civic Center, Baltimore, MD, USA
Add a private note
MAR
22
1982
The Cars
Capital Centre, Landover, MD, USA
Add a private note`;

const lines = rawText.split('\n').map(l => l.trim()).filter(l => l && l !== 'The Cars were my first concert.');
const items = [];
let currentMonth = "JUL"; // Start with month because the first entry is The Police which is missing it as it continues from previously parsed setlist pages but let's see. Wait, actually I'll manually set The Police to JUL. Actually, first line is 14.

let i = 0;
while (i < lines.length) {
    const line = lines[i];

    // Handle Add a private note
    if (line === 'Add a private note') {
        i++;
        continue;
    }

    if (/^[A-Z]{3}$/.test(line)) {
        currentMonth = line;
        i++;
        continue;
    }

    const day = parseInt(line);
    if (!isNaN(day)) {
        const year = parseInt(lines[i + 1]);
        const artist = lines[i + 2];
        const venueLine = lines[i + 3];

        // We expect year and artist to exist
        if (!isNaN(year) && artist && venueLine) {
            let rawVenue = venueLine;
            let location = "USA";

            const parts = rawVenue.split(', ');
            if (parts.length > 1) {
                rawVenue = parts[0];
                location = parts.slice(1).join(', ');
            }

            let storeMonth = currentMonth;
            if (artist === 'The Police' && year === 2008) {
                storeMonth = 'JUL';
            }

            items.push({
                year,
                month: storeMonth,
                day,
                artist,
                venue: rawVenue,
                location
            });

            if (lines[i + 4] === 'Add a private note') {
                i += 5;
            } else {
                i += 4;
            }
        } else {
            i++;
        }
    } else {
        i++;
    }
}

const insert = db.prepare('INSERT INTO concerts (date_year, date_month, date_day, artist, venue, location) VALUES (?, ?, ?, ?, ?, ?)');

const dbTransaction = db.transaction((rows) => {
    for (const row of rows) {
        if (row.artist === 'Run‐D.M.C.') row.artist = 'Run-D.M.C.';
        if (row.artist === 'Ice‐T') row.artist = 'Ice-T';
        insert.run(row.year, row.month, row.day, row.artist, row.venue, row.location);
    }
});

dbTransaction(items);

console.log("Inserted", items.length, "concerts into the database!");
