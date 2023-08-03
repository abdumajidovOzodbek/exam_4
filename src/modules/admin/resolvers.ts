import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const manager = process.env.MANAGER
const managerPass = process.env.MANAGER_PASS
const secret_key = process.env.SECRET_KEY

const resolvers = {
    Mutation: {
        login: async (_: any, body: any) => {
            try {
                const { sign } = jwt;
                const { admin, password } = body;

                if (!(admin == manager && password == managerPass)) {
                    throw new Error(`invalid admin or admin password`);
                }
                return {
                    status: 200,
                    message: "you are logged in ",
                    token: sign({ admin: admin }, secret_key || "secret")
                }
            } catch (error: any) {
                return {
                    status: 404,
                    message: `Error: ${error.message}`,
                }
            }
        }
    }
}



export default resolvers