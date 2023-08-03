import {makeExecutableSchema} from "@graphql-tools/schema"

import Restaurant from "./restaurant/restaurant"
import Food from "./foods/food"
import Admin from "./admin/admin"

export default makeExecutableSchema({
    typeDefs:[Restaurant.typeDefs,Food.typeDefs,Admin.typeDefs],
    resolvers:[Restaurant.resolvers,Food.resolvers,Admin.resolvers]
})
