import { QuestionRepository } from "../../server/dbLayer/repositories/QuestionRepository";
import { Question } from "../interface/QuestionInterface";

export class QuestionService {
    private questionRepo: QuestionRepository = new QuestionRepository();

    public async createQuestion(Question: Question): Promise<any> {
        const newQuestion = await this.questionRepo.createQuestion(Question);
        return { data: newQuestion };
    }

    public async viewQuestions(pagesize: any, currentPage: any, difficulty: any): Promise<any> {
        const questionList = await this.questionRepo.viewQuestions(pagesize, currentPage, difficulty);
        return { status: "success", data: questionList };
    }
}