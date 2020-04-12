export interface QuestionType {
  title: string;
  price: number;
  answer: string;
  type: string;
}

export interface ThemeType {
  name: string;
  questions: QuestionType[];
}

export interface RoundType {
  name: string;
  themes: ThemeType[];
}

export interface QuizType {
  name: string;
  rounds: RoundType[];
}
