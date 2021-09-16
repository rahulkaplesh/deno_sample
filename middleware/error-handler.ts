
import { Context, Status } from "https://deno.land/x/oak/mod.ts";

const errorHandler = async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { message: err.message };
  }
};

export default errorHandler;