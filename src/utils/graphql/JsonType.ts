import { GraphQLScalarType, Kind } from "graphql";

export const JsonType = new GraphQLScalarType({
  name: "JSON",
  description: "JSON type",
  parseValue(value: string) {
    return JSON.parse(value); // value from the client input variables
  },
  serialize(value: any) {
    return value; // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new JsonType(ast.value); // value from the client query
    }
    return null;
  },
});
