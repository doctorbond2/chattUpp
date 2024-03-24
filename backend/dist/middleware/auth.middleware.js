var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hashPassword } from "../utilities/helpers/database.helper.js";
import bcrypt from "bcrypt";
export function hash_password(next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Pre save!");
        const doc = this;
        if (doc.isModified(doc.password) || doc.isNew) {
            try {
                doc.password = yield hashPassword(doc.password);
            }
            catch (err) {
                console.error("Error pre-saving user", err);
                next(err);
            }
        }
        next();
    });
}
export function compare_password(unhashed_input_password, hashed_document_password) {
    return __awaiter(this, void 0, void 0, function* () {
        const INPUT_PASSWORD = unhashed_input_password;
        const CORRECT_PASSWORD = hashed_document_password;
        console.log("comparing passwords...");
        if (!INPUT_PASSWORD || !CORRECT_PASSWORD) {
            console.log("Error: provide password details.");
            return;
        }
        try {
            const passwordMatch = yield bcrypt.compare(INPUT_PASSWORD, CORRECT_PASSWORD);
            if (passwordMatch) {
                console.log("Password match!");
                return true;
            }
            else {
                console.log("Password don't match.");
                return false;
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
