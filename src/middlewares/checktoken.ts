import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const CHECKTOKEN = (payload: string) => {
  try {
    const { verify } = jwt;
    const manager = process.env.MANAGER
    const {admin} = verify(payload || 'token', process.env.SECRET_KEY || "secret") as JwtPayload

    if (!(admin == manager)) {
      throw new Error(`admin must be single`);
    }else{
      return 'loged in'
    }
  }
  catch (error: any) {
    return error.message
  }
}
export default CHECKTOKEN;
