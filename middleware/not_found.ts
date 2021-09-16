// deno-lint-ignore-file
import { Context, Status } from "https://deno.land/x/oak/mod.ts";

const notFound = async (ctx: Context) => {
  ctx.response.status = Status.NotFound;
  ctx.response.body = { message: "Not Found!!"};
};

export default notFound;