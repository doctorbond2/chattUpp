import { hashPassword } from "../helpers/auth.helpers";

export async function hashHelper(this: any) {
  const doc: any = this;
  if (doc.isModified(doc.password) || doc.isNew) {
    try {
      doc.password = await hashPassword(doc.password);
    } catch (err: any) {
      console.error("Error pre-saving user", err);
      throw err;
    }
  }
}
