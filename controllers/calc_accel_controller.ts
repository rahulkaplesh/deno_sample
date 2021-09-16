import { getBeginningOfDay, getEndOfDay } from "../helpers/time_helper.ts";
import { getVscoreByDate, calcAccelSchema } from "../models/calc_accels.ts";

export default class calcAccelController {
  getVScores = async (siteId: string, machineName: string, startEndDate: string): Promise<string> => {
    console.log(siteId, machineName, startEndDate);

    const startDate = startEndDate.split(':')[0];
    const beginningOfDay: Date = getBeginningOfDay(startDate);

    const endDate = startEndDate.split(':')[1];
    const endOfDay: Date = getEndOfDay(endDate);

    const calcAccelFilterCondtion = [
      {site_id: {$regex: `.*${siteId}.*`}},
      {base_ip_address: {$regex: "\." + machineName.substring(1) + "$"}},
      {vscore: {$gt: 1}},
      {timestamp: {$gte: beginningOfDay, $lte: endOfDay}}
    ];

    const dataToReturn = await getVscoreByDate(siteId, calcAccelFilterCondtion, '%Y-%m-%d');
    dataToReturn.forEach((item: calcAccelSchema, _index: number) => {
      console.log(item);
    })

    return "Hi from V-Score Conroller!!";
  }
}