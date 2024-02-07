import {
  KnexTypeAdapter,
  DatabaseTableNames,
} from "@infra/database/KnexAdpter";
import DAO from "@domain/dao/DAO";
import { QuestionModel } from "@domain/model";

export default class QuestionDAO implements DAO<QuestionModel> {
  private readonly tableName: string = DatabaseTableNames.ANSWERS;

  constructor(private readonly connection: KnexTypeAdapter) {}

  async create(data: QuestionModel): Promise<QuestionModel> {
    const [savedQuestion] = await this.connection<QuestionModel>(this.tableName)
      .insert(data)
      .returning("*");

    return savedQuestion;
  }

  async findById(questionId: string): Promise<QuestionModel | null> {
    const data = await this.connection<QuestionModel>(this.tableName)
      .where({ questionId })
      .first();
    if (!data) return null;
    return data;
  }
}
