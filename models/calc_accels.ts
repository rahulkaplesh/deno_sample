import { getConnection } from "../helpers/db_helpers.ts";
import { Database, Collection } from "https://deno.land/x/mongo/mod.ts";
import { AggregateCursor } from "https://deno.land/x/mongo@v0.25.0/src/collection/commands/aggregate.ts";

export interface calcAccelSchema {
  clacId: string;
  siteId: string;
  scanStartTime: Date;
  baseSerialNumber: string;
  baseIpAddress: string;
  nodeAddress: string;
  nodeSerialNumber: string;
  tick: string;
  timestamp: Date;
  samplerate: string;
  ch1Rms: number;
  ch2Rms: number;
  ch3Rms: number;
  ch1Peaktopeak: number;
  ch2Peaktopeak: number;
  ch3Peaktopeak: number;
  ch1Ips: number;
  ch2Ips: number;
  ch3Ips: number;
  ch1Crestfactor: number;
  ch2Crestfactor: number;
  ch3Crestfactor: number;
  vscore: number;
  noderssi: string;
  baserssi: string;
  run: number;
  stdCh1: number;
  stdCh2: number;
  stdCh3: number;
  stdVector: number;
  aminCh1: number;
  aminCh2: number;
  aminCh3: number;
  aminVector: number;
  amaxCh1: number;
  amaxCh2: number;
  amaxCh3: number;
  amaxVector: number;
}

export async function getCollection(siteId: string): Promise<Collection<calcAccelSchema>> {
  const calcAccelsDB: Database = await getConnection(siteId);
  const collection: Collection<calcAccelSchema> = await calcAccelsDB.collection<calcAccelSchema>('calc_accels')
  return collection;
}

// deno-lint-ignore no-explicit-any
export async function getVscoreByDate(siteId: string ,filerCondition: any, frequecyPattern: string): Promise<calcAccelSchema[]>{
  const collection: Collection<calcAccelSchema> = await getCollection(siteId);
  const valueToGet = "$vscore";
  const dataToReturn = await collection.find().toArray();
  return dataToReturn;
}