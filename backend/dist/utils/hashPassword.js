import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const HashedPassword = async (password, round) => {
    const hashedPassword = await bcrypt.hash(password, round);
    return hashedPassword;
};
const PasswordMatch = async (password, oldPassword) => {
    const matchedPassword = await bcrypt.compare(password, oldPassword);
    return matchedPassword;
};
const GeneratingToken = async (id, email, secret, exp) => {
    const token = jwt.sign({ id: id, email: email }, secret, { expiresIn: exp });
    return token;
};
const verifyToken = async (password, secret) => {
    const verifiedToken = jwt.verify(password, secret);
    return verifiedToken;
};
export { HashedPassword, PasswordMatch, GeneratingToken, verifyToken };
