export interface ComicIssue {
  id: string;
  releaseDate: string;
  title: string;
  plotDescription: string;
  marvelFandomLink: string;
  thumbnailPath: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function formatDateShort(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  return `${MONTHS_SHORT[month - 1]} ${year}`;
}

/** All 27 issues sorted by releaseDate ascending (oldest first) */
export const COMIC_ISSUES: ComicIssue[] = [
  {
    id: "uncanny-xmen-251",
    releaseDate: "1989-07-04",
    title: "Uncanny X-Men #251",
    plotDescription:
      "Betsy forces the X-Men through the Siege Perilous to save them from the Reavers, resetting her life.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_251",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_1_251.png",
  },
  {
    id: "uncanny-xmen-255",
    releaseDate: "1989-09-05",
    title: "Uncanny X-Men #255",
    plotDescription:
      "An amnesiac Betsy washes up on a Hand-controlled beach and is found by Matsu'o Tsurayaba.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_255",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_1_255.png",
  },
  {
    id: "uncanny-xmen-256",
    releaseDate: "1989-10-03",
    title: "Uncanny X-Men #256",
    plotDescription:
      "The Hand and Spiral begin the physical and mental transformation of Betsy into Lady Mandarin.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_256",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_1_256.png",
  },
  {
    id: "uncanny-xmen-257",
    releaseDate: "1989-11-07",
    title: "Uncanny X-Men #257",
    plotDescription:
      "Brainwashed as an enforcer, Betsy hunts down Wolverine and debuts her psychic knife.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_257",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_1_257.png",
  },
  {
    id: "uncanny-xmen-258",
    releaseDate: "1989-12-05",
    title: "Uncanny X-Men #258",
    plotDescription:
      "With Wolverine's help, Betsy breaks her brainwashing but remains in her Asian physical form.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_258",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_1_258.png",
  },
  {
    id: "xmen-v2-17",
    releaseDate: "1992-12-15",
    title: "X-Men Vol 2 #17",
    plotDescription:
      "A mysterious woman (Revanche) appears in Betsy's original body, claiming she is the real Betsy.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_17",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_17.png",
  },
  {
    id: "xmen-v2-18",
    releaseDate: "1993-01-19",
    title: "X-Men Vol 2 #18",
    plotDescription:
      "Revanche arrives at the X-Mansion, causing immediate psychic confusion and doubt.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_18",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_18.png",
  },
  {
    id: "xmen-v2-19",
    releaseDate: "1993-02-16",
    title: "X-Men Vol 2 #19",
    plotDescription:
      "Psylocke and Revanche engage in a duel to prove who is the original through psychic combat.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_19",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_19.png",
  },
  {
    id: "xmen-v2-20",
    releaseDate: "1993-03-16",
    title: "X-Men Vol 2 #20",
    plotDescription:
      "The X-Men travel to Japan to confront Matsu'o and uncover the truth behind their shared memories.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_20",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_20.png",
  },
  {
    id: "xmen-v2-21",
    releaseDate: "1993-04-20",
    title: "X-Men Vol 2 #21",
    plotDescription:
      "The team investigates Hand records as the two women realize their psychic signatures are merged.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_21",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_21.png",
  },
  {
    id: "xmen-v2-22",
    releaseDate: "1993-05-18",
    title: "X-Men Vol 2 #22",
    plotDescription:
      "Revanche reveals she is dying from the Legacy Virus, destabilizing her psychic powers.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_22",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_22.png",
  },
  {
    id: "xmen-v2-23",
    releaseDate: "1993-06-15",
    title: "X-Men Vol 2 #23",
    plotDescription:
      "The conflict intensifies as the X-Men prevent the Hand from reclaiming their assassins.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_23",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_23.png",
  },
  {
    id: "xmen-v2-24",
    releaseDate: "1993-07-20",
    title: "X-Men Vol 2 #24",
    plotDescription:
      "Betsy and Revanche reach a peace while fighting Hand ninjas during their quest for answers.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_24",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_24.png",
  },
  {
    id: "xmen-v2-25",
    releaseDate: "1993-08-17",
    title: "X-Men Vol 2 #25",
    plotDescription:
      "Magneto's Fatal Attractions interrupts the search, forcing both women to fight on Avalon.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_25",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_25.png",
  },
  {
    id: "xmen-v2-28",
    releaseDate: "1993-11-16",
    title: "X-Men Vol 2 #28",
    plotDescription:
      "Betsy deals with the fallout of Sabretooth's presence while Revanche's health fails.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_28",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_28.png",
  },
  {
    id: "xmen-v2-31",
    releaseDate: "1994-02-15",
    title: "X-Men Vol 2 #31",
    plotDescription:
      "Spiral reveals she merged their DNA and souls into both bodies rather than just swapping.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_31",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_31.png",
  },
  {
    id: "xmen-v2-32",
    releaseDate: "1994-03-15",
    title: "X-Men Vol 2 #32",
    plotDescription:
      "Kwannon (as Revanche) dies of the Legacy Virus, returning her psychic fragments to Betsy.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_32",
    thumbnailPath: "/psylocke-backstory/X-Men_Vol_2_32.png",
  },
  {
    id: "mystery-madripoor-1",
    releaseDate: "2018-05-23",
    title: "Mystery in Madripoor #1",
    plotDescription:
      "Searching for Logan, Betsy is psychically attacked by Sapphire Styx and her body fails.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_1",
    thumbnailPath:
      "/psylocke-backstory/Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_1.png",
  },
  {
    id: "mystery-madripoor-2",
    releaseDate: "2018-06-27",
    title: "Mystery in Madripoor #2",
    plotDescription:
      "Betsy's soul is absorbed by Sapphire Styx, leaving her Asian physical form an empty shell.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_2",
    thumbnailPath:
      "/psylocke-backstory/Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_2.png",
  },
  {
    id: "mystery-madripoor-3",
    releaseDate: "2018-07-25",
    title: "Mystery in Madripoor #3",
    plotDescription:
      "Inside the psychic void, Betsy encounters Wolverine and decides to rebuild her own body.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_3",
    thumbnailPath:
      "/psylocke-backstory/Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_3.png",
  },
  {
    id: "mystery-madripoor-4",
    releaseDate: "2018-08-22",
    title: "Mystery in Madripoor #4",
    plotDescription:
      "Betsy manifests a new British body, while Kwannon's soul re-inhabits the original Asian body.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_4",
    thumbnailPath:
      "/psylocke-backstory/Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_4.png",
  },
  {
    id: "uncanny-xmen-v5-16",
    releaseDate: "2019-04-17",
    title: "Uncanny X-Men Vol 5 #16",
    plotDescription:
      "Betsy and Kwannon both exist as separate individuals on the team during a time of crisis.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_16",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_5_16.png",
  },
  {
    id: "uncanny-xmen-v5-17",
    releaseDate: "2019-05-01",
    title: "Uncanny X-Men Vol 5 #17",
    plotDescription:
      "The two women navigate a tense professional relationship as the X-Men face extinction.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_17",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_5_17.png",
  },
  {
    id: "uncanny-xmen-v5-18",
    releaseDate: "2019-05-15",
    title: "Uncanny X-Men Vol 5 #18",
    plotDescription:
      "Betsy continues to struggle with her identity and her return to her proper body.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_18",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_5_18.png",
  },
  {
    id: "uncanny-xmen-v5-19",
    releaseDate: "2019-06-05",
    title: "Uncanny X-Men Vol 5 #19",
    plotDescription:
      "The team faces the Hellfire Club; Kwannon proves her lethality as an independent agent.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_19",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_5_19.png",
  },
  {
    id: "uncanny-xmen-v5-20",
    releaseDate: "2019-06-19",
    title: "Uncanny X-Men Vol 5 #20",
    plotDescription:
      "The era ends with Betsy and Kwannon finally parting ways to seek their own futures.",
    marvelFandomLink:
      "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_20",
    thumbnailPath: "/psylocke-backstory/Uncanny_X-Men_Vol_5_20.png",
  },
  {
    id: "excalibur-v4-1",
    releaseDate: "2019-10-30",
    title: "Excalibur Vol 4 #1",
    plotDescription:
      "Betsy officially becomes Captain Britain, while Kwannon takes the name Psylocke.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Excalibur_Vol_4_1",
    thumbnailPath: "/psylocke-backstory/Excalibur_Vol_4_1.png",
  },
];
