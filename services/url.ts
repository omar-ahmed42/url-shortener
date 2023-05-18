import { uidGenerator } from "..";
import { Url } from "../models/url";
import { Uid } from "../uid/distributed-uid-snowflake/uid";

const BASE_62: bigint = 62n;
const ALPHANUMS: string =
  "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export async function createUrl(longUrl: string) {
  let id: Uid;
  const url = await Url.findOrCreate({
    where: { longUrl: longUrl },
    defaults: {
      id: (id = uidGenerator.generate()).getId(),
      shortUrl: await generateShortUrl(id.getId()),
      longUrl: longUrl,
    },
  });
  console.log(url[0].toJSON());
  return url[0];
}

async function generateShortUrl(id: BigInt): Promise<string> {
  let dividend: bigint = id.valueOf();
  let shortUrl: string = "";
  while (dividend > 0n) {
    let remainder: number = Number(dividend % BASE_62).valueOf();
    dividend /= BASE_62;
    shortUrl += ALPHANUMS[remainder];
  }
  return shortUrl;
}

export async function findUrl(shortUrl: string) {
  const url = await Url.findOne({ where: { shortUrl: shortUrl } });
  return url;
}
