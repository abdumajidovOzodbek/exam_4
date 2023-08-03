import { ApolloServer,BaseContext } from "@apollo/server";
import { AppDataSource } from './data'
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { graphqlUploadExpress } from 'graphql-upload-ts'
import schema from './modules/index'
import express from 'express'
import http from 'http'
import path from "path";
AppDataSource.initialize().then(_d => console.log('connected')).catch(error => console.log(error))
const app = express()
const httpServer = http.createServer(app);
(async function () {
  const server = new ApolloServer({ schema, csrfPrevention: false, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] })
  await server.start()
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    cors<cors.CorsRequest>(),
    express.static(path.resolve('uploads')),
    express.json(),
    expressMiddleware(server,{context:async({req}):Promise<BaseContext>=>{
      return {token:req.headers.authorization}
    }}),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(` Server is ready at http://localhost:4000/`);
}())