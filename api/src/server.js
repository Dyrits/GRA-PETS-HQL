const {ApolloServer}=require("@apollo/server");
const {startStandaloneServer}=require("@apollo/server/standalone");
const typeDefs=require("./schema");const resolvers=require("./resolvers");const {models,db}=require("./db");
const server=new ApolloServer({typeDefs,resolvers});
startStandaloneServer(server,{listen:{port:Number(process.env.PORT||4000)},context:async()=>({models,db,user:db.get("user").value()})}).then(({url})=>console.log(`Server ready at ${url}`));
