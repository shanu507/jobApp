import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeJobsAPI, invokeDeleteJobAPI } from '../store/jobs.action';
import { selectJobs } from '../store/jobs.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  jobs$ = this.store.pipe(select(selectJobs));

  deleteModal: any;
  idToDelete: number = 0;
   tableHeaders = [
    "Job Id",
    "Job title",
    "Job number",
    "Job start date",
    "Job close date",
    "Experience required",
    "Number of job openings",
    "Job notes",
    "Actions"
  ];
  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeJobsAPI());
  }

  openDeleteModal(id?: number) {
    id ? this.idToDelete = id : '';
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteJobAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
