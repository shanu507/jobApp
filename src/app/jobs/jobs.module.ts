import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { jobReducer } from './store/jobs.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JobsEffect } from './store/jobs.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [HomeComponent, EditComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myjobs', jobReducer),
    EffectsModule.forFeature([JobsEffect])
  ],
})
export class JobsModule {}
