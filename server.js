const express = require('express')
const GraphQL = require('express-graphql').graphqlHTTP
const { 
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLNonNull,
        GraphQLList
} = require('graphql')
const app = express()
const employees = [
    {id: 1, emp_name:"John Oliver",emp_designation:'IT-Manager',emp_address:"Pune"},
    {id: 2, emp_name:"Adam Smith",emp_designation:'Developers',emp_address:"Hyderabad"},
    {id: 3, emp_name:"Brad Pit",emp_designation:'Tester',emp_address:"Chennai"},
]
const EmployeeType = new GraphQLObjectType({
    name:"Employee",
    description:"Employee Schema",
    fields:()=>({
        id:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        emp_name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        emp_designation:{
            type: new GraphQLNonNull(GraphQLString)
        },
        emp_address:{
            type: new GraphQLNonNull(GraphQLString)
        }
    })
})
const RootQueryType = new GraphQLObjectType({
    name:"Query",
    description:"Root Query",
    fields:()=>({
     
        employee:{
            type: EmployeeType,
            description:"Fetch me a single employee",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> employees.find(item => item.id === args.id ) 
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            description:"Fetch me all employees",
            resolve: ()=> employees
        },
    })
})
const schema = new GraphQLSchema({
    query:RootQueryType
})
app.use('/',GraphQL({
    schema:schema,
    graphiql:true
}))
const PORT = 8081
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))