import { ConnectionFactory } from "../connectionManager/ConnectionFactory";
import { DbConnection } from "../connectionManager/DbConnection";
import { Question } from "../../interface/QuestionInterface";

export class QuestionRepository {
    private connectionManager: DbConnection =
        ConnectionFactory.getConnectionManager();

    public async createQuestion(Question: Question) {
        try {
            let connection = await this.connectionManager.getConnection();
            const result = await connection
                .collection("Question")
                .insertOne({ title: Question.title, description: Question.description, difficulty: Question.difficulty })
            return await connection
                .collection("Question")
                .findOne({ _id: result.insertedId });
        } catch (ex) {
            console.error("error in creating Question - ", ex);
        }
    }

    public async viewQuestions(pageSize: any, currentPage: any, difficulty: string[]) {
        try {
            let connection = await this.connectionManager.getConnection();
            let collection = await connection.collection("Question");
            if (!difficulty.includes('undefined')) {
                const query = await collection.find({ difficulty: { $in: difficulty } }).toArray();
                return {
                    questionsList: await collection.find({ difficulty: { $in: difficulty } }).skip(pageSize * (currentPage - 1)).limit(pageSize).toArray(),
                    maxQuestions: query.length,
                }
            }
            return {
                questionsList: await collection.find({}).skip(pageSize * (currentPage - 1)).limit(pageSize).toArray(),
                maxQuestions: await collection.countDocuments()
            }

        } catch (ex) {
            console.error("error in viewing Questions - ", ex);
        }
    }
}