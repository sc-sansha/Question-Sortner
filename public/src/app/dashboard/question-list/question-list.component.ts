import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../question.model';
import { PageEvent } from '@angular/material/paginator';
import { QuestionService } from '../question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questionsList: Question[] = [];
  isLoading = false;
  totalQuestions = 0;
  questionsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  options = ['easy', 'medium', 'hard'];
  selectedOptions: { [key: string]: boolean } = {};
  selectedDifficulty: string;

  private questionSub: Subscription;

  constructor(
    public questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.optionConverter();
    this.questionService.getQuestionsList(this.questionsPerPage, this.currentPage, this.selectedDifficulty);
    this.questionSub = this.questionService
      .getQuestionUpdateListener()
      .subscribe((questionData: { questionsList: Question[]; questionCount: number }) => {
        this.isLoading = false;
        this.totalQuestions = questionData.questionCount;
        this.questionsList = questionData.questionsList;
      });
  }

  optionConverter() {
    const selectedDifficultyLevels = Object.keys(this.selectedOptions).filter(key => this.selectedOptions[key]);
    this.selectedDifficulty = selectedDifficultyLevels.join(',');
  }

  onCheckboxChange(option: string) {
    this.optionConverter();
    this.questionService.getQuestionsList(this.questionsPerPage, this.currentPage, this.selectedDifficulty);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.questionsPerPage = pageData.pageSize;
    this.questionService.getQuestionsList(this.questionsPerPage, this.currentPage, this.selectedDifficulty);
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
  }
}
