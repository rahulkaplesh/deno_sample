import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import { decode, validate, verify } from "https://deno.land/x/djwt/mod.ts"

export const JwtConfig = {
  header: "Authorization",
  schema: "Bearer"
}

const authHandler = async (ctx: Context, next: any) => {
  try {
    const token: string | undefined = ctx.request.headers
                            .get(JwtConfig.header)
                            ?.replace(`${JwtConfig.schema} `, "");

    if (token == undefined) {
      ctx.response.status = Status.Forbidden;
      ctx.response.body = { message: 'Provide authorisation token' };
      return;
    } else {
      if (!(validate(decode(token)))) {
        ctx.response.status = Status.Forbidden;
        ctx.response.body = { message: 'Unauthorised Access Not Permitted' };
        return;
      }
      await next();
    }
  } catch (err) {
    ctx.response.status = Status.Forbidden;
    ctx.response.body = { msg: err };
  }
};

export default authHandler;