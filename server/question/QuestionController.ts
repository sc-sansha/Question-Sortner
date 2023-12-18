import { NextFunction, Request, Response, Router } from "express";
import { QuestionService } from "./QuestionService";

export class QuestionController {
    private static instance: QuestionController;
    private router: Router = Router();

    constructor() {
        this.router.post("/create-question", this.createQuestion.bind(this));
        this.router.get("/view", this.viewQuestion.bind(this));
    }

    public async createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
        let questionService: QuestionService = new QuestionService();
        questionService
            .createQuestion(req.body)
            .then((responseData) => {
                res.status(200).json({
                    message: 'Question created successfully',
                    responseData,
                });
            })
            .catch((error: Error) => {
                res.status(401).send({ message: error.message });
            });
    }

    public async viewQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
        let questionService: QuestionService = new QuestionService();
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const difficulty = req.query.difficulty + "";
        const difficulties: string[] = difficulty.split(',');

        questionService
            .viewQuestions(pageSize, currentPage, difficulties)
            .then((response) => {
                res.status(200).json({
                    message: "List Fetched successfully",
                    questions: response.data.questionsList,
                    maxCount: response.data.maxQuestions,
                });
            })
            .catch((error: Error) => {
                res.status(401).send({ message: error.message });
            });
    }

    public get Router(): Router {
        return this.router;
    }

    /**
     * Function to return instance
     */
    public static get Instance(): QuestionController {
        if (!QuestionController.instance)
            QuestionController.instance = new QuestionController();
        return QuestionController.instance;
    }
}