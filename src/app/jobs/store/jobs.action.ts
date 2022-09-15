import { createAction, props } from '@ngrx/store';
import { Jobs } from './jobs';

export const invokeJobsAPI = createAction(
  '[Jobs API] Invoke jobs Fetch API'
);

export const jobsFetchAPISuccess = createAction(
  '[Jobs API] Fetch API Success',
  props<{ allJobs: Jobs[] }>()
);

export const invokeSaveNewJobAPI = createAction(
  '[Jobs API] Inovke save new job api',
  props<{ newJob: Jobs }>()
);

export const saveNewJobAPISucess = createAction(
  '[Jobs API] save new job api success',
  props<{ newJob: Jobs }>()
);

export const invokeUpdateJobAPI = createAction(
  '[Jobs API] Inovke update job api',
  props<{ updateJob: Jobs }>()
);

export const updateJobAPISucess = createAction(
  '[Jobs API] update  job api success',
  props<{ updateJob: Jobs }>()
);

export const invokeDeleteJobAPI = createAction(
  '[Jobs API] Inovke delete job api',
  props<{id:number}>()
);

export const deleteJobAPISuccess = createAction(
  '[Jobs API] deleted job api success',
  props<{id:number}>()
);