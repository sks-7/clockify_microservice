import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const HashedPassword = async (password: string, round: number) => {
  const hashedPassword = await bcrypt.hash(password, round);

  return hashedPassword;
};

const PasswordMatch = async (password: string, oldPassword: string) => {
  const matchedPassword = await bcrypt.compare(password, oldPassword);

  return matchedPassword;
};

const GeneratingToken = async (
  id: mongoose.Types.ObjectId,
  email: string,
  secret: string,
  exp: string
) => {
  const token = jwt.sign({ id: id, email: email }, secret, { expiresIn: exp });

  return token;
};

const verifyToken = async (password: string, secret: string) => {
  
  const verifiedToken =  jwt.verify(password,secret)
  
  return verifiedToken

}



export { HashedPassword, PasswordMatch, GeneratingToken,verifyToken };
