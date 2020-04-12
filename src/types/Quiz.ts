export interface QuestionType {
  id?: number;
  title: string;
  price: number;
  answer: string;
  type: string;
}

export interface ThemeType {
  id?: number;
  name: string;
  questions: QuestionType[];
}

export interface RoundType {
  id?: number;
  name: string;
  themes: ThemeType[];
}

export interface QuizType {
  id?: number;
  name: string;
  rounds: RoundType[];
}
