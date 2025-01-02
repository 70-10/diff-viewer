import lz from "lz-string";

export function createShareUrl(baseUrl: string, textA: string, textB: string) {
  const url = new URL(baseUrl);
  url.searchParams.set(
    "data",
    lz.compressToEncodedURIComponent(JSON.stringify({ textA, textB }))
  );
  return url.toString();
}
