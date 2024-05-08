var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hashPassword } from '../helpers/auth.helpers.js';
export function hashHelper() {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        if (doc.isModified('password') || doc.isNew) {
            try {
                doc.password = yield hashPassword(doc.password);
                console.log('hashed the password');
            }
            catch (err) {
                console.error('Error pre-saving user', err);
                throw err;
            }
        }
    });
}
