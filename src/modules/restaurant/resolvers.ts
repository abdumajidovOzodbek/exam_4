import { createWriteStream } from "fs";
import { Restarants } from "../../entity/Restaurant.entity"
import { GraphQLUpload } from 'graphql-upload-ts';
import { resolve } from "path";
import CHECKTOKEN from "../../middlewares/checktoken";

const resolvers = {
    Query: {
        restarants: () => Restarants.find()
    },
    Mutation: {
        createRestarant: async (_: any, body: any, { token }: any) => {
            try {
                if (CHECKTOKEN(token) == 'loged in'){

                    let { filename, createReadStream } = await body.image
                    filename = Date.now() + filename.replace(/\s/g, '')
                    const newRestarant: any = {
                        restarantName: body.restarantName,
                        info: body.info,
                        image: filename
                    }
                    const stream = createReadStream();
                    const out = createWriteStream(resolve('uploads', filename));
                    stream.pipe(out);
                    const restarant = Restarants.create(newRestarant)
                    Restarants.save(restarant)
                    return "new Restarant created"
                }else{
                    throw new Error('you can not create a new')
                }
            
            } catch (error: any) {
                return error.message
            }
        },
        updateRestarant: async (_: any, body: any, { token }: any) => {
            try {
                if (CHECKTOKEN(token) == 'loged in') {
                    const { restarantName, id, info } = body
                    const restarant = (await Restarants.update({ id }, { restarantName, info })).raw[0];
                    return `restarant updated`

                }else{
                    new Error('you can not update')
                }
            } catch (error: any) {
                return error.message

            }
        },
        deleteRestarant: async (_: any, body: any, { token }: any) => {
            try {
                if (CHECKTOKEN(token) == 'loged in') {
                    const { id } = body
                    await Restarants.delete({ id })
                    return "Restarant deleted"

                }else{
                    throw new Error('you can not delete')
                }
            } catch (error: any) {
                return error.message
            }
        }
    },
    Upload: GraphQLUpload,
}

export default resolvers