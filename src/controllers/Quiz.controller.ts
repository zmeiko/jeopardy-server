import { DeepPartial } from "typeorm";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { QuestionEntity } from "../entity/Question";
import { QuizEntity } from "../entity/Quiz";
import { RoundEntity } from "../entity/Round";
import { ThemeEntity } from "../entity/Theme";

export async function createQuiz(
  data: DeepPartial<QuizEntity>
): Promise<QuizEntity> {
  const quizEntity = QuizEntity.create(data);
  await quizEntity.save();
  return quizEntity;
}

export async function findQuizById(
  quizId: number,
  options?: FindOneOptions<QuizEntity>
) {
  return QuizEntity.findOne(quizId, options);
}

export async function findFullQuizById(quizId: number) {
  return await QuizEntity.createQueryBuilder("quiz")
    .where("quiz.id = :id", { id: quizId })
    .leftJoinAndSelect("quiz.rounds", "rounds")
    .leftJoinAndSelect("rounds.themes", "themes")
    .leftJoinAndSelect("themes.questions", "questions")
    .cache(1000)
    .getOne();
}

export async function findRoundById(
  roundId: number,
  options?: FindOneOptions<RoundEntity>
) {
  return RoundEntity.findOne(roundId, options);
}

export async function findQuestionById(
  questionId: number,
  options?: FindOneOptions<QuestionEntity>
) {
  return QuestionEntity.findOne(questionId, options);
}

export async function findThemeById(
  themeId: number,
  options?: FindOneOptions<ThemeEntity>
) {
  return ThemeEntity.findOne(themeId, options);
}
