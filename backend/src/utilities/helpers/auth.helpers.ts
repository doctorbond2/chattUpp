import bcrypt, { hash } from "bcrypt";
export const hashPassword = async (password: string) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
