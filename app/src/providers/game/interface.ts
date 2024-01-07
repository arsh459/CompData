import { dateObject } from "@hooks/program/useProgramTasks";
import { EventInterface, RoundObject, SprintObject } from "@models/Event/Event";

export type GameContextProps = {
  children: React.ReactNode;
  selectedGameId: string;
};

export interface GameParameters {
  currentRound?: RoundObject;
  currentSprint?: SprintObject;
  daysElapsed: number;
  currentRoundDay: number;
  currentSprintDay: number;
  roundStartUnix: number;
  sprintStartUnix: number;
}

export interface GameMonthParams {
  rangeDate?: dateObject[];
  sprintId?: string;
  nowObj?: dateObject;
  defaultObj?: dateObject;
  lastSprintId?: string;
}

export interface GameWeekParams {
  roundEndUnix?: number;
  roundStartUnix?: number;
  isFinale?: boolean;
  roundId?: string;
}

export interface GameContextInterface {
  game?: EventInterface;
  loading?: boolean;
  params?: GameParameters;
  monthParams?: GameMonthParams;
  weekParams?: GameWeekParams;
  selectedGameId?: string;
  activeFutureRounds: string[];
  allRounds: string[];
}
