import prettyMilliseconds from 'pretty-ms';

export const findTeamIndividualStatsFromSummaries = (
  { teamMembers = [], playerSummaries },
) => {
  if (teamMembers.length === 0) return [];
  const teamStats = playerSummaries.filter(({ playerName }) => teamMembers.includes(playerName));
  return teamStats;
};

export const computedPlayerSummaries = ({ playerSummaries }) => playerSummaries.map((player) => {
  const {
    kills, damage, survivedTime, playerMatchStat: matches,
  } = player;

  const matchesPlayed = matches.length;
  const matchesDead = matches.filter(({ participant: { deathType } }) => deathType !== 'alive');
  const wins = matches.filter(({ participant: { winPlace } }) => winPlace === 1).length;
  const deaths = matchesDead.length;
  const kd = Number((kills / deaths).toFixed(2));
  const adr = Math.round(damage / matchesPlayed);

  const aliveRounded = prettyMilliseconds(survivedTime * 1000, { unitCount: 2 });
  // remove ugly tilt added by pretty-ms
  const aliveArr = aliveRounded.split('~');
  const alive = aliveArr.length > 1 ? aliveArr[1] : aliveArr[0];
  return {
    computed: {
      matchesPlayed,
      deaths,
      wins,
      kd,
      adr,
      alive,
    },
    ...player,
  };
});


export const computedPlayerSummariesWithTeam = (
  {
    playerSummaries,
    teamStats,
    teams,
  },
) => playerSummaries.map((player) => {
  const {
    kills, damage, survivedTime, playerMatchStat: matches, playerName,
  } = player;

  // get team reference from cms
  const team = teamStats.find(({ teamMember }) => teamMember.includes(playerName));
  const { teamId } = team;
  const teamReference = teams.find(({ slot }) => teamId === slot);
  let teamData = {};
  let restTeamData = {};
  let teamLogo = null;
  if (teamReference) {
    teamData = teamReference.team;
    const { logo, ...rest } = teamData;
    if (logo && logo.asset && logo.asset.url) teamLogo = logo.asset.url;
    restTeamData = rest;
  }

  const matchesPlayed = matches.length;
  const matchesDead = matches.filter(({ participant: { deathType } }) => deathType !== 'alive');
  const wins = matches.filter(({ participant: { winPlace } }) => winPlace === 1).length;
  const deaths = matchesDead.length;
  const kd = Number((kills / deaths).toFixed(2));
  const adr = Math.round(damage / matchesPlayed);

  const aliveRounded = prettyMilliseconds(survivedTime * 1000, { unitCount: 2 });
  // remove ugly tilt added by pretty-ms
  const aliveArr = aliveRounded.split('~');
  const alive = aliveArr.length > 1 ? aliveArr[1] : aliveArr[0];
  return {
    computed: {
      matchesPlayed,
      deaths,
      wins,
      kd,
      adr,
      alive,
      team: {
        ...team,
        ref: {
          ...restTeamData,
          logo: teamLogo,
        },
      },
    },
    ...player,
  };
});
