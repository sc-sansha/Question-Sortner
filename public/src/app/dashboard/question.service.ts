import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    private questionsList: Question[] = [];
    private questionsCount: number;
    private questionsUpdated = new Subject<{ questionsList: Question[]; questionCount: number }>();

    constructor(private http: HttpClient, private router: Router) { }

    getQuestionsList(questionsPerPage: number, currentPage: number, difficulty: any) {
        const queryParams = difficulty ? `?pagesize=${questionsPerPage}&page=${currentPage}&difficulty=${difficulty}` : `?pagesize=${questionsPerPage}&page=${currentPage}`;
        console.log(queryParams, "from frontend");
        this.http
            .get<{ message: string; questions: Question[]; maxCount: number }>(
                'http://localhost:9000/api/v1/question/view' + queryParams
            ).pipe(
                map((questionData) => {

                    return {
                        questionsList: questionData.questions.map((question: Question) => {
                            return {
                                title: question.title,
                                description: question.description,
                                _id: question._id,
                                difficulty: question.difficulty,
                            };
                        }),
                        maxQuestions: questionData.maxCount,
                    };
                })
        ).subscribe((transformedQuestions) => {
                this.questionsList = transformedQuestions.questionsList;
                this.questionsUpdated.next({
                    questionsList: [...this.questionsList],
                    questionCount: transformedQuestions.maxQuestions,
                });
            });
    }

    getQuestionUpdateListener() {
        return this.questionsUpdated.asObservable();
    }

    addQuestion(title: string, description: string, difficulty: string) {
        console.log(title, description, difficulty);
        const question: Question = { _id: '', title: title, description: description, difficulty: difficulty };
        this.http
            .post<{ message: string; question: Question }>(
                'http://localhost:9000/api/v1/question/create-question',
                question
            )
            .subscribe((responseData) => {
                this.router.navigate(['/list']);
            });
    }

}