const IS_DEV = process.env.NODE_ENV !== "production";
const COMMON_OPTIONS = {
  type: process.env.DATABASE_CONNECTION,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_POST,
  username: process.env.DATABASE_USERNAEM,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const TS_OPTIONS = {
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

const JS_OPTIONS = {
  entities: ["entity/**/*.js"],
  migrations: ["migration/**/*.js"],
  subscribers: ["subscriber/**/*.js"],
};
module.exports = Object.assign(
  {},
  COMMON_OPTIONS,
  IS_DEV ? TS_OPTIONS : JS_OPTIONS
);
