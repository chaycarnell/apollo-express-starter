import { exampleResponse } from './example.functions';

const resolver = {
  Query: {
    exampleQuery: () => {
      return exampleResponse();
    },
  },
  Mutation: {
    exampleMutation: () => {
      return exampleResponse();
    },
  },
};

exports.resolver = resolver;
