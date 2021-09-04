import { exampleResponse } from './example.functions';

const resolver = {
  Query: {
    exampleQuery: async () => {
      return exampleResponse();
    },
  },
  Mutation: {
    exampleMutation: async () => {
      return exampleResponse();
    },
  },
};

exports.resolver = resolver;
