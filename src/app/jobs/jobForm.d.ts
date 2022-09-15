import { FormControl } from "@angular/forms";

export interface JobForm {
  id?: FormControl<number>;
  job_number?: FormControl<string>;
  job_title?: FormControl<string>;
  job_start_date?: FormControl<string>;
  job_close_date?: FormControl<string>;
  experience_required?: FormControl<string>;
  number_of_openings?: FormControl<number>;
  job_notes?: FormControl<string>;
}