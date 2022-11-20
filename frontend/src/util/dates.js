export function convertDate(
  date,
  language = "en-US",
  options = { year: "numeric", month: "long", day: "numeric" }
) {
  return new Date(date).toLocaleDateString(language, options);
}
