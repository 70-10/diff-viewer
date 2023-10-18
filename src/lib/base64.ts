export function encode(text: string) {
  const base64String = btoa(text); // Base64 エンコード
  return encodeURIComponent(base64String); // URL エンコード
}

export function decode(encodedText: string) {
  const base64String = decodeURIComponent(encodedText);
  return atob(base64String);
}
