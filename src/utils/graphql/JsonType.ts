import { GraphQLScalarType } from "graphql";

export const JsonType: GraphQLScalarType = new GraphQLScalarType({
  name: "JSON",
  description: "JSON type",
  parseValue(value: string) {
    return JSON.parse(value); // value from the client input variables
  },
  serialize(value: any) {
    return value; // value sent to the client
  },
});
