import { paramsType } from "@components/OnboardPopup/utils";
import { questionResponse } from "@models/User/questionResponseInterface ";
import { symptomId } from "@models/User/symptoms";
import { create } from "zustand";

interface SymptomIntakeState {
  runHideAnimation: boolean;
  measurAIPre: paramsType;
  measurAIPost: paramsType;
  setMeasurAIPre: (val: paramsType) => void;
  setMeasurAIPost: (val: paramsType) => void;
  currQuestion: questionResponse | undefined;
  lastQuestion: questionResponse | undefined;
  setQuestion: (val: questionResponse | undefined) => void;
  onShowQu: () => void;
  onHideQu: () => void;
  symptomIds: symptomId[];
  setSymptomIds: (IDs: symptomId[]) => void;
}

export const useSymptomIntakeStore = create<SymptomIntakeState>((set, get) => ({
  runHideAnimation: false,
  lastQuestion: undefined,
  currQuestion: undefined,
  symptomIds: [],
  measurAIPre: { fx: 0, fy: 0, width: 0, height: 0, px: 0, py: 0 },
  measurAIPost: { fx: 0, fy: 0, width: 0, height: 0, px: 0, py: 0 },
  setMeasurAIPre: (val: paramsType) => {
    set((state) => ({
      ...state,
      measurAIPre: val,
    }));
  },
  setMeasurAIPost: (val: paramsType) => {
    set((state) => ({
      ...state,
      measurAIPost: val,
    }));
  },
  setQuestion: (val: questionResponse | undefined) => {
    set((state) => ({
      ...state,
      currQuestion: val,
      lastQuestion: val,
    }));
  },
  onShowQu: () => {
    set((state) => ({
      ...state,
      currQuestion: state.lastQuestion,
    }));
  },
  onHideQu: () => {
    set((state) => ({ ...state, runHideAnimation: true }));
    setTimeout(() => {
      set((state) => ({
        ...state,
        runHideAnimation: false,
        currQuestion: undefined,
      }));
    }, 300);
  },
  setSymptomIds: (IDs: symptomId[]) => {
    set((state) => ({
      ...state,
      symptomIds: IDs,
    }));
  },
}));
