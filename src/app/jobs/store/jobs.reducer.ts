import { createReducer, on } from '@ngrx/store';
import { Jobs } from './jobs';
import { jobsFetchAPISuccess, deleteJobAPISuccess, saveNewJobAPISucess, updateJobAPISucess } from './jobs.action';

export const initialState: ReadonlyArray<Jobs> = [];

export const jobReducer = createReducer(
  initialState,
  on(jobsFetchAPISuccess, (state, { allJobs }) => {
    return allJobs;
  }),
  on(saveNewJobAPISucess, (state, { newJob }) => {
    let newState = [...state];
    newState.unshift(newJob);
    return newState;
  }),
  on(updateJobAPISucess, (state, { updateJob }) => {
    let newState = state.filter((_) => _.id != updateJob.id);
    newState.unshift(updateJob);
    return newState;
  }),
  on(deleteJobAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
