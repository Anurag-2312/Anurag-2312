// Reads a 6-digit hex colour token from the text of app/globals.css.
export function readToken(css, name) {
  const match = css.match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!match) {
    throw new Error(
      `Design token --${name} is missing from app/globals.css, or its value is not a 6-digit hex colour.`,
    );
  }
  return match[1];
}
