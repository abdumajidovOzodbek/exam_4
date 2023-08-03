import { createWriteStream } from "fs"
import { Food } from "../../entity/Food.entity"
import { resolve } from "path"
import CHECKTOKEN from "../../middlewares/checktoken"


const resolvers = {

    Query: {

        foods: () => Food.find({
            relations: {
                restarant: true
            }
        })

    },
    Mutation: {
        createFood: async (_: any, body: any, { token }: any) => {
            try {

                if (CHECKTOKEN(token) == 'loged in') {
                    console.log( token);

                    let { filename, createReadStream } = await body.image


                    filename = Date.now() + filename.replace(/\s/g, '')
                    const newRestarant: any = {
                        foodName: body.foodName,
                        info: body.info,
                        image: filename,
                        cost: body.cost,
                        type: body.type,
                        restarant: body.restarant
                    }
                    const stream = createReadStream();
                    const out = createWriteStream(resolve('uploads', filename));
                    stream.pipe(out);
                    const food = await Food.create(newRestarant)
                    Food.save(food)
                    return {
                        status: 201,
                        message: 'ok',
                        data: newRestarant
                    }
                } else {
                    throw new Error('you can not post')
                }
            } catch (error: any) {
                console.log(token);
                return {
                    status: 401,
                    message: error.message,
                    data: null
                }
            }
        },
        updateFood: async (_: any, body: any, { token }: any) => {
            try {
                console.log(token);

                if (CHECKTOKEN(token) == 'loged in') {
                    const { foodName, id, cost, info } = body
                    const food = (await Food.update({ id }, { foodName, cost, info })).raw[0];
                    return `food updated`
                } else {
                    throw new Error('you can not update food')
                }
            } catch (error: any) {
                return `error ${error.message}`
            }
        },
        deleteFood: async (_: any, body: any, { token }: any) => {
            try {
                if (CHECKTOKEN(token) == 'loged in') {
                    const { id } = body
                    await Food.delete({ id })
                    return "food deleted"
                } else {
                    throw new Error(`food was not deleting`)
                }
            } catch (error: any) {
                return error.message
            }
        }
    }
}

export default resolvers