import { ApolloServer } from "@apollo/server"
import { taskSchema } from "../graphql/taskSchema.js"
import taskResolvers from "../graphql/taskResolvers.js"


const apolloServer = new ApolloServer({
    typeDefs: taskSchema,
    resolvers:taskResolvers
    
})

export default apolloServer;
