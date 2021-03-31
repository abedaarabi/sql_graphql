const express = require("express");
const app = express();
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
//To create GrapjQl serving
const { graphqlHTTP } = require("express-graphql");
const knex = require("./database");
// const schema = require("./schema.js");

//Create Type for <Meal>
const MealType = new GraphQLObjectType({
  name: "Meal",

  fields: () => ({
    id: { type: GraphQLInt },
    reservations: { type: GraphQLString },
    title: { type: GraphQLString },
    reviews: { type: GraphQLInt },
    created_date: { type: GraphQLString },
    limit: { type: GraphQLInt },
    price: { type: GraphQLInt },
    imagePath: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    getAllMeals: {
      type: new GraphQLList(MealType),

      resolve: async (parent, args) => {
        try {
          return await knex("meal");
        } catch (error) {
          console.log(error);
        }
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createMeal: {
      type: MealType,

      //args to create new object
      args: {
        id: { type: GraphQLInt },
        reservations: { type: GraphQLString },
        title: { type: GraphQLString },
        reviews: { type: GraphQLInt },
        created_date: { type: GraphQLString },
        limit: { type: GraphQLInt },
        price: { type: GraphQLInt },
        imagePath: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          await knex("meal").insert({
            id: args.id,
            title: args.title,
            reviews: args.reviews,
            limit: args.limit,
            price: args.price,
          });
          return args;
        } catch (error) {
          console.log(error);
        }
      },
    },
  }),
});

/**
 * query: has the data,
 * mutation: CRUD
 */

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000..");
});
