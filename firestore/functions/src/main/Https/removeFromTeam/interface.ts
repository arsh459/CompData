export interface removeFromTeam {
  uid?: string;
  eventId?: string;
}

export interface moveUserToNewTeam {
  uid?: string;
  newTeamId?: string;
  gameId?: string;
}
