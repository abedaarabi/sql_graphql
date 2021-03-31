// const axios = require("axios");
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLNonNull,
// } = require("graphql");

// const MealType = new GraphQLObjectType({
//   name: "Meal",
//   fields: () => ({
//     id: { type: GraphQLString },
//     reservations: { type: GraphQLString },
//     title: { type: GraphQLString },
//     reviews: { type: GraphQLString },
//     created_date: { type: GraphQLString },
//     limit: { type: GraphQLString },
//     price: { type: GraphQLString },
//     imagePath: { type: GraphQLString },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     meal: {
//       type: new GraphQLList(MealType),

//       resolve(parentValue, args) {
//         return axios
//           .get("http://104.131.66.109:5000/meals")
//           .then((res) => res.data);
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   name: RootQuery,
// });
