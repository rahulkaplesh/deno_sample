import { MongoClient, Database } from "https://deno.land/x/mongo/mod.ts";

const env: { [index: string]: string; } = Deno.env.toObject();
const user: string = env.ATLAS_GLOBAL_USER || 'sample';
const password: string = env.ATLAS_GLOBAL_PASSWORD || 'samplepassword';
const host: string = env.MONGO_DATABASE_HOST || 'samplemongohost';

const _makeApmConnectString = (iata: string): string => {
  if (host.indexOf(':') > -1) {
    return `mongodb://${user}:${password}@${host}/apm_${iata}?authSource=admin`;
  } else {
    return `mongodb+srv://${user}:${password}@${host}/apm_${iata}?retryWrites=true`;
  }
}

export async function getConnection (iata: string): Promise<Database> {
  const client = new MongoClient();
  return await client.connect({
    db: `apm_${iata}`,
    tls: true,
    servers: [
      {
        host: "mongohost_cluster_1",
        port: 27017,
      },
      {
        host: "mongohost_cluster_1",
        port: 27017,
      },
      {
        host: "mongohost_cluster_1",
        port: 27017,
      },
    ],
    credential: {
      username: `${user}`,
      password: `${password}`,
      db: "admin",
      mechanism: "SCRAM-SHA-1",
    }
  });
}