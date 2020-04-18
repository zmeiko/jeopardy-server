module.exports = {
  type: process.env.DATABASE_CONNECTION,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_POST,
  username: process.env.DATABASE_USERNAEM,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
