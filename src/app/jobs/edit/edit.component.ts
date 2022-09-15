import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { JobForm } from '../jobForm';
import { invokeSaveNewJobAPI, invokeUpdateJobAPI } from '../store/jobs.action';
import { selectJobById } from '../store/jobs.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  jobForm = new FormGroup<JobForm>({
    id: new FormControl(0, { nonNullable: true }),
    job_number: new FormControl('', { nonNullable: true }),
    job_title: new FormControl('', { nonNullable: true }),
    job_start_date: new FormControl('', { nonNullable: true }),
    job_close_date: new FormControl('', { nonNullable: true }),
    experience_required: new FormControl('', { nonNullable: true }),
    number_of_openings: new FormControl(0, { nonNullable: true }),
    job_notes: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        this.editMode = id !== 0;
        return this.store.pipe(select(selectJobById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.jobForm.setValue({
          id: data.id ?? 0,
          job_number: data.job_number,
          job_title: data.job_title,
          job_start_date: data.job_start_date,
          job_close_date: data.job_close_date,
          experience_required: data.experience_required,
          number_of_openings: data.number_of_openings ?? 0,
          job_notes: data.job_notes,
        });
      }
    });
  }

  udapte() {
    if (!this.editMode) {
      console.log('add mode');

      this.store.dispatch(
        invokeSaveNewJobAPI({ newJob: { ...this.jobForm.value } })
      );
    } else {
      console.log('edit mode');
      this.store.dispatch(
        invokeUpdateJobAPI({ updateJob: { ...this.jobForm.value } })
      );
    }

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
