import * as Koa from 'koa';
import * as Router from 'koa-router';
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    const app = new Koa();
    const router = new Router();

    router.get('/*', async (ctx) => {
        ctx.body = 'Hello World!';
    });

    app.use(router.routes());

    app.listen(3000);

    console.log("Koa application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
