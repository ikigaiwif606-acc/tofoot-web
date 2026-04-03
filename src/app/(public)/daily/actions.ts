"use server";

import {
  getTodayChallenge,
  getAllPlayerNames,
  getChallengeNumber,
} from "@/lib/db/queries";

export async function fetchTodayChallenge() {
  const { challenge, player } = await getTodayChallenge();
  const challengeNumber = await getChallengeNumber(challenge.date);

  return {
    date: challenge.date,
    challengeNumber,
    // Only expose clue data, not the answer name directly
    answer: player.name,
    clues: {
      nationality: player.nationality,
      nationalityFlag: player.nationalityFlag,
      position: player.position,
      clubCount: player.clubCount,
      pastClub: player.pastClub,
      league: player.league,
      currentClub: player.currentClub,
    },
  };
}

export async function fetchPlayerNames() {
  return getAllPlayerNames();
}
