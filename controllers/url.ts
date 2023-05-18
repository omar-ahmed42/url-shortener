import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUrl, findUrl } from "../services/url";

export const persistUrl = async (req: Request, res: Response) => {
  const longUrl: string = req.body.longUrl;
  if (isEmpty(longUrl))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "Url field is missing" });

  const url = await createUrl(longUrl);
  const shortUrl: string = url.get("shortUrl") as string;
  res.status(StatusCodes.CREATED).location(`/${shortUrl}`).json();
};

export const getUrl = async (req: Request, res: Response) => {
  const shortUrl: string = req.params["url"];
  if (isEmpty(shortUrl))
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ success: false, msg: "Url field is missing" });
  const url = await findUrl(shortUrl);
  const longUrl: string = url?.get("longUrl") as string;
  if (!longUrl) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: "Url not found" });
  }
  const redirectionUrl: string = appendHttp(longUrl);
  res.status(StatusCodes.MOVED_PERMANENTLY).location(redirectionUrl).json();
};

function appendHttp(longUrl: string) {
  return startsWithIgnoreCase(longUrl, "http://") ||
    startsWithIgnoreCase(longUrl, "https://")
    ? longUrl
    : "http://" + longUrl;
}

function startsWithIgnoreCase(searchString: string, prefix: string) {
  if (prefix.length > searchString.length)
    return false;
  
  for (let i = 0; i < prefix.length; i++) {
    if (searchString[i].toUpperCase() != prefix[i].toUpperCase()) return false;
  }
  return true;
}
function isEmpty(text: string) {
  return !text || text.trim().length == 0;
}
