import { Router, Status } from "https://deno.land/x/oak/mod.ts";
import authHandler from "../middleware/auth-handler.ts";
import calcAccelController from "../controllers/calc_accel_controller.ts";

const calcAccelCont = new calcAccelController();

export function calcAccelsRoutes(router: Router): Router {
  return router
    .get('/vscore/:siteId/:machineName/:startEndDate/', authHandler, async (ctx) => {
      if (!ctx.params.siteId && !ctx.params.machineName && !ctx.params.startEndDate) {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = { message: "Invalid Params"};
      } else {
        const response: string = await calcAccelCont.getVScores(ctx.params.siteId? ctx.params.siteId: '', ctx.params.machineName? ctx.params.machineName: '', ctx.params.startEndDate? ctx.params.startEndDate: '');
        ctx.response.status = Status.OK;
        ctx.response.body = { message: response};
      }
      return;
    });
}