// This function is for importing files from public folder

export default function publicURL(str = "") {
  if (str && typeof str === "string") return process.env.PUBLIC_URL + "/" + str;
  return undefined;
}
