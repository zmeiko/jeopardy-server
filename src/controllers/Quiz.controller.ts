import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { QuestionEntity } from "../entity/Question";
import { QuizEntity } from "../entity/Quiz";
import { RoundEntity } from "../entity/Round";
import { ThemeEntity } from "../entity/Theme";
import { QuizType } from "../types/Quiz";

export async function createQuiz(data: QuizType): Promise<QuizEntity> {
  const quizEntity = QuizEntity.create({
    name: data.name,
  });
  const rounds = data.rounds.map((round) => {
    const roundEntity = RoundEntity.create({
      name: round.name,
    });
    const themes = round.themes.map((theme) => {
      const themeEntity = ThemeEntity.create({
        name: theme.name,
      });
      const questions = theme.questions.map((question) => {
        const questionEntity = QuestionEntity.create(question);
        return questionEntity;
      });
      themeEntity.questions = Promise.resolve(questions);
      return themeEntity;
    });
    roundEntity.themes = Promise.resolve(themes);
    return roundEntity;
  });
  quizEntity.rounds = Promise.resolve(rounds);
  await quizEntity.save();
  return quizEntity;
}

export async function findQuizById(
  quizId: number,
  options?: FindOneOptions<QuizEntity>
) {
  return QuizEntity.findOne(quizId, options);
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
