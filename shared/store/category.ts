import {create } from 'zustand'
interface State {
    activityId: number;
    setActivityId: (activityId: number) => void;
}

export const useCategoryStore = create<State>((set) => ({
    activityId: 1,
    setActivityId: (activityId) => set({activityId})
}))