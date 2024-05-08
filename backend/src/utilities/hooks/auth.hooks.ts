import { hashPassword } from '../helpers/auth.helpers.js';

export async function hashHelper(this: any) {
  const doc: any = this;
  if (doc.isModified('password') || doc.isNew) {
    try {
      doc.password = await hashPassword(doc.password);
      console.log('hashed the password');
    } catch (err: any) {
      console.error('Error pre-saving user', err);
      throw err;
    }
  }
}
