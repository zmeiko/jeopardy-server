import fs from "fs";
import path from "path";
import { createConnection } from "typeorm";
import parser from "xml2json";
import system from "child_process";
import { SIQ_DIR } from "../config/siq";
import { createQuiz } from "../controllers/Quiz.controller";
import { PackageEntity } from "../entity/Packages.entry";
import { QuestionType, RoundType, ThemeType } from "../service/game";

const SIQ_TMP_DIR = "./temp";

function processQuestion(question: any): QuestionType {
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

function processTheme(theme: any): ThemeType {
  const name = theme.name;
  const questions = theme.questions.question.map(processQuestion);
  return {
    name,
    questions,
  };
}

function processRound(round: any): RoundType {
  const name = round.name;
  const themes = round.themes.theme.map(processTheme);
  return {
    name,
    themes,
  };
}

function processJson(inputJson: any) {
  const name = inputJson.package.name;
  const rounds = inputJson.package.rounds.round.map(processRound);
  return {
    name,
    rounds,
  };
}

async function getNewPackages() {
  if (!fs.existsSync(SIQ_DIR)) {
    return [];
  }
  const packageNames = fs
    .readdirSync(SIQ_DIR)
    .filter((name) => path.extname(name) === ".siq");

  const importedPackages = (await PackageEntity.find()).map(
    ({ packageName }) => packageName
  );

  return packageNames.filter((name) => !importedPackages.includes(name));
}

async function processFile(fileName: string) {
  const inputSiq = `${SIQ_DIR}/${fileName}`;
  console.log(`RUN /usr/bin/unzip -u -d ${SIQ_TMP_DIR} ${inputSiq}`);
  system.execSync(`/usr/bin/unzip -u -d ${SIQ_TMP_DIR} ${inputSiq}`);

  const xmlFile = `${SIQ_TMP_DIR}/content.xml`;
  console.log(`Parse file: ${xmlFile}`);
  const data = fs.readFileSync(xmlFile);
  console.log(`XML to JSON`);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const jsonFromXML = JSON.parse(parser.toJson(data));
  console.log(`Process JSON`);
  const json = processJson(jsonFromXML);
  const quiz = await createQuiz(json);
  console.log(`Create Quiz with id = ${quiz.id}`);
  const packageEntity = PackageEntity.create({
    packageName: fileName,
  });
  await packageEntity.save();
}

console.log("Connect to database");
createConnection()
  .then(async () => {
    const packages = await getNewPackages();
    if (packages.length === 0) {
      console.log("All packages have been imported");
    }
    for (const siqPackage of packages) {
      console.log(`IMPORT ------${siqPackage}--------`);
      await processFile(siqPackage);
    }
    console.log("Remove temp dir ");
    system.execSync(`rm -rf ${SIQ_TMP_DIR}`);
  })
  .then(() => console.log("Disconnect from database"))
  .catch((error) => console.log("TypeORM connection error: ", error));
