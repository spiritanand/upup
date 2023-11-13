import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.CRYPT_KEY || "bruce_is_the_bat");

export default cryptr;
