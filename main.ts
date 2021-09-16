import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import notFound from "./middleware/not_found.ts";
import errorHandler from "./middleware/error-handler.ts";
import { calcAccelsRoutes } from "./routes/index.ts"; 

const env: { [index: string]: string; } = Deno.env.toObject();
const PORT: number = Number(env.PORT) || 3000;
const HOST: string = env.HOST || 'localhost';

const app: Application = new Application();
const router: Router = new Router();

const calcAccelRoute = calcAccelsRoutes(router);
app.use(calcAccelRoute.routes());
app.use(calcAccelRoute.allowedMethods());

app.use(notFound);
app.use(errorHandler);

console.log(`Server started on port ${PORT}`);

app.listen(`${HOST}:${PORT}`);