import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { JobsService } from '../jobs.service';
import {
  jobsFetchAPISuccess,
  deleteJobAPISuccess,
  invokeJobsAPI,
  invokeDeleteJobAPI,
  invokeSaveNewJobAPI,
  invokeUpdateJobAPI,
  saveNewJobAPISucess,
  updateJobAPISucess,
} from './jobs.action';
import { selectJobs } from './jobs.selector';

@Injectable()
export class JobsEffect {
  constructor(
    private actions$: Actions,
    private jobsService: JobsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeJobsAPI),
      withLatestFrom(this.store.pipe(select(selectJobs))),
      mergeMap(([, jobformStore]) => {
        if (jobformStore.length > 0) {
          return EMPTY;
        }
        return this.jobsService
          .get()
          .pipe(map((data) => jobsFetchAPISuccess({ allJobs: data })));
      })
    )
  );

  saveNewJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewJobAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.jobsService.create(action.newJob).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewJobAPISucess({ newJob: data });
          })
        );
      })
    );
  });

  updateJobAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateJobAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.jobsService.update(action.updateJob).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateJobAPISucess({ updateJob: data });
          })
        );
      })
    );
  });

  deleteJobsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteJobAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.jobsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteJobAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
