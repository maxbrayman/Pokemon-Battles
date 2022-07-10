import { random } from "./math";

type Casing = "lowercase" | "uppercase" | "both";

export const generateRandomString = (
  length: number,
  includeNumbers: boolean,
  casing: Casing
): string => {
  let characters: string;
  if (casing === "uppercase") characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  else if (casing === "lowercase") characters = "abcdefghijklmnopqrstuvwxyz";
  else characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  if (includeNumbers) characters += "0123456789";
  let string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = random(0, characters.length - 1);
    string += characters[randomIndex];
  }
  return string;
};
