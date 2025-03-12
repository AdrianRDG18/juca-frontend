import CryptoJS from "crypto-js";
import { environment } from "../../environments/environment";

export const encrypt = (toEncrypt: string):string => {
    return CryptoJS.AES.encrypt(toEncrypt, environment.crypto_key).toString();
}

export const decrypt = (toDecrypt: string): string => {
    const bytes = CryptoJS.AES.decrypt(toDecrypt, environment.crypto_key);
    return bytes.toString(CryptoJS.enc.Utf8);
}