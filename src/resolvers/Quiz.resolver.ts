import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import * as quizzes from "../controllers/Quiz.controller";
import { QuizEntity } from "../entity/Quiz";
import { RoundEntity } from "../entity/Round";
import { ThemeEntity } from "../entity/Theme";

@Resolver(() => QuizEntity)
export class QuizResolver {
  @Query(() => [QuizEntity])
  quizzes() {
    return QuizEntity.find();
  }

  @Query(() => QuizEntity)
  quiz(@Arg("id") id: number) {
    return quizzes.findQuizById(id, { cache: true });
  }

  @FieldResolver()
  async rounds(@Root() quiz: QuizEntity) {
    return await RoundEntity.find({
      where: {
        quizId: quiz.id,
      },
    });
  }
}

@Resolver(() => RoundEntity)
export class RoundResolver {
  @Query(() => RoundEntity)
  round(@Arg("id") id: number) {
    return quizzes.findRoundById(id, { cache: true });
  }

  @FieldResolver()
  async themes(@Root() round: RoundEntity) {
    return await ThemeEntity.find({
      where: {
        roundId: round.id,
      },
    });
  }
}

@Resolver(() => ThemeEntity)
export class ThemeResolver {
  @Query(() => ThemeEntity)
  round(@Arg("id") id: number) {
    return quizzes.findThemeById(id, { cache: true });
  }

  @FieldResolver()
  async questions(@Root() theme: ThemeEntity) {
    return await QuizEntity.find({
      where: {
        themeId: theme.id,
      },
    });
  }
}

@Resolver(() => QuizEntity)
export class QuestionResolver {
  @Query(() => QuizEntity)
  question(@Arg("id") id: number) {
    return quizzes.findQuestionById(id, { cache: true });
  }
}
