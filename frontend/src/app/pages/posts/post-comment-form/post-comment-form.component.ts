import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.scss'],
})
export class PostCommentFormComponent implements OnInit {
  form?: FormGroup;
  isAuthenticated = false;

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      comment: this.fb.control('', [Validators.required, this.minLengthValidator]),
    });
  }

  onTextAreaClick(): void {
    if (this.isAuthenticated) {
      return;
    }

    this.router.navigateByUrl('/login');
  }

  onSubmit(): void {
    if (this.form && this.form.invalid) {
      return;
    }

    // TODO
  }

  private minLengthValidator(control: any): null | { minLength: true } {
    const value = String(control.value).trim() || '';
    if (value.length > 0) {
      return null;
    }

    return { minLength: true };
  }
}
