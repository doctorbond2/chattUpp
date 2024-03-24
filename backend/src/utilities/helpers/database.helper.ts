import bcrypt, { hash } from "bcrypt";
export const hashPassword = async (password: string) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export const error_MESSAGE = (type: any) => {
  switch (type) {
    case "post": {
      return "---------- ERROR WITH POST ----------\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n";
    }
    case "update": {
      return "---------- ERROR WITH PUT ----------\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n";
    }
    case "delete": {
      return "---------- ERROR WITH DELETE ----------\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n";
    }
    case "get": {
      return "---------- ERROR WITH GET ----------\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n";
    }
  }
};
