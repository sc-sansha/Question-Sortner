import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { QuestionService } from '../question.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {
  enteredTitle: String = "";
  enteredDescription: String = "";
  questions: Question[] = [];
  question!: Question;
  isLoading = false;
  form!: FormGroup;

  constructor(
    public questionsService: QuestionService,
    // public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null, { validators: [Validators.required, Validators.minLength(20)] }),
      difficulty: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSaveQuestion() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.questionsService.addQuestion(
      this.form.value.title,
      this.form.value.description,
      this.form.value.difficulty
    );
    // const post: Post = { title: form.value.title, content: form.value.content };
    this.form.reset();
  }
}
