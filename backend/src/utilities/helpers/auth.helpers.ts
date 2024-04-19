import bcrypt, { hash } from "bcrypt";
export const hashPassword = async (password: string) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export async function compare_password(
  unhashed_input_password: string,
  hashed_document_password: string
) {
  const INPUT_PASSWORD = unhashed_input_password;
  const CORRECT_PASSWORD = hashed_document_password;
  console.log("comparing passwords...");
  if (!INPUT_PASSWORD || !CORRECT_PASSWORD) {
    console.log("Error: provide password details.");
    return;
  }
  try {
    const passwordMatch = await bcrypt.compare(
      INPUT_PASSWORD,
      CORRECT_PASSWORD
    );
    if (passwordMatch) {
      console.log("Password match!");
      return true;
    } else {
      console.log("Password don't match.");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}
