import fs from "fs";
import { createConnection } from "typeorm";
import parser from "xml2json";
import { createQuiz } from "../src/controllers/Quiz.controller";
import { QuestionType, RoundType, ThemeType } from "../src/types/Quiz";

const PACKAGE_DIR = "./siq_packages";
const packageName = "Turnirny_paket_3";

const inputFileName = `${PACKAGE_DIR}/${packageName}/content.xml`;
const outputFileName = `${PACKAGE_DIR}/${packageName}/content.json`;

function processQuestion(question): QuestionType {
  const price = question.price;
  const title = question.scenario.atom;
  const answer = question.right.answer;
  const type = question.type;
  return {
    type: type || "simple",
    price: parseInt(price, 10),
    title,
    answer,
  };
}

function processTheme(theme): ThemeType {
  const name = theme.name;
  const questions = theme.questions.question.map(processQuestion);
  return {
    name,
    questions,
  };
}

function processRound(round): RoundType {
  const name = round.name;
  const themes = round.themes.theme.map(processTheme);
  return {
    name,
    themes,
  };
}

function processJson(inputJson) {
  const name = inputJson.package.name;
  const rounds = inputJson.package.rounds.round.map(processRound);
  return {
    name,
    rounds,
  };
}

console.log("Connect to database");
createConnection()
  .then(() => {
    console.log(`Parse file: ${inputFileName}`);
    const data = fs.readFileSync(inputFileName);
    console.log(`XML to JSON`);
    const jsonFromXML = JSON.parse(parser.toJson(data));
    console.log(`Process JSON`);
    const json = processJson(jsonFromXML);
    console.log(`Write file to ${outputFileName}`);
    fs.writeFileSync(outputFileName, JSON.stringify(json, null, 2));
    console.log(`Write data to Database`);
    return createQuiz(json);
  })
  .then(() => console.log("Finish"))
  .catch((error) => console.log("TypeORM connection error: ", error));
