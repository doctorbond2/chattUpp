var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
const admin_key_from_server = process.env.ADMIN_API_KEY;
export const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = 10;
    const hashedPassword = yield bcrypt.hash(password, salt);
    return hashedPassword;
});
export function compare_password(unhashed_input_password, hashed_document_password) {
    return __awaiter(this, void 0, void 0, function* () {
        const INPUT_PASSWORD = unhashed_input_password;
        const CORRECT_PASSWORD = hashed_document_password;
        console.log('comparing passwords...');
        if (!INPUT_PASSWORD || !CORRECT_PASSWORD) {
            console.log('Error: provide password details.');
            return;
        }
        try {
            const passwordMatch = yield bcrypt.compare(INPUT_PASSWORD, CORRECT_PASSWORD);
            if (passwordMatch) {
                console.log('Password match!');
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
export function compare_api_keys(admin_key_from_client) {
    console.log(admin_key_from_client, admin_key_from_server);
    return admin_key_from_client === admin_key_from_server ? true : false;
}
