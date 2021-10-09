## Basketball-Reference Player Scraper

_It's amazing how this website refuses to provide a public API after all of these years._

**However, be responsible.**

### Getting Started

`npm install basketball-reference-player-scraper`

```javascript
const { getPlayer } = require('basketball-reference-player-scraper')
const data = await getPlayer('Anthony, Carmelo')
```

### Output Sample

```json
{
  "bio": {
    "accolades": [
      "10x All Star",
      "2012-13 Scoring Champ",
      "6x All-NBA",
      "2003-04 All-Rookie"
    ],
    "attributes": { "hand": "Right", "height": "201", "weight": "107" },
    "age": "37-133d",
    "birthplace": "Brooklyn, New York us",
    "draft": {
      "team": "Denver Nuggets",
      "year": 2003,
      "position": { "round": 1, "position": 3 }
    },
    "education": {
      "college": ["Syracuse"],
      "highSchool": [
        "Towson Catholic in Towson, Maryland",
        "Oak Hill Academy in Mouth of Wilson, Virginia"
      ]
    },
    "name": "\n\t\tCarmelo Anthony\n\t\t\t",
    "nicknames": ["Melo", " Hoodie Melo", " Sweet Melon", " Mel"],
    "position": ["Small Forward", "Power Forward"],
    "dob": "May 29, 1984"
  },
  "contract": null,
  "honors": [
    {
      "label": "All-Star Games",
      "results": [
        { "honor": "2007 NBA", "rank": "2007 NBA" },
        ...
  ],
  "per_game": [
    {
      "season": "2003-04",
      "age": 19,
      "team_id": "DEN",
      "lg_id": "NBA",
      "pos": "SF",
      "g": 82,
      "gs": 82,
      "mp_per_g": 36.5,
...
```

[Full Sample Here](./sample-output.json)

### Options

```javascript
const { getPlayer } = require('basketball-reference-player-scraper')
const data = await getPlayer('Anthony, Carmelo', {
  contract: true,
  honors: true,
  tableIDs: ['advanced'],
  bio: true
})
```

#### Contract

Include the player contract table (default: false).

#### Honors

Include the honors and leaderboard table (default: true).

#### Bio

Include basic bio info like education, birthdate, etc (default: true)

#### Table IDs

Tables to include within the output (default: advanced).

```javascript
const VALID_TABLE_IDS = [
  'advanced',
  'all_college_stats',
  'all_salaries',
  'all_star',
  'pbp',
  'per_game',
  'per_minute',
  'per_poss',
  'playoffs_advanced',
  'playoffs_pbp',
  'playoffs_per_game',
  'playoffs_per_minute',
  'playoffs_per_poss',
  'playoffs_shooting',
  'playoffs_totals',
  'shooting',
  'sim_career',
  'sim_thru',
  'totals',
  'year-and-career-highs-po',
  'year-and-career-highs'
]
```
