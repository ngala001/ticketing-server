
import { ApolloServer  } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema/typedefs/type-defs";
import { resolvers } from "./schema/resolvers/resolvers";
import { PrismaClient } from "@prisma/client";



const server = new ApolloServer({typeDefs, resolvers})


async function startServer() {

    const prisma = new PrismaClient()

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async() => ({ prisma })
    });
    
    console.log(`Server is runing at ${url}`)

}

startServer()

 