const IS_DEV = process.env.NODE_ENV !== "production";
const DATABASE_EXTRA = process.env.DATABASE_EXTRA
  ? JSON.parse(process.env.DATABASE_EXTRA)
  : undefined;

const COMMON_OPTIONS = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: !!process.env.DATABASE_SSL,
  extra: DATABASE_EXTRA,
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
