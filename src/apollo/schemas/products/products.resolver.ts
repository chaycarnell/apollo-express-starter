import { Resolvers } from '../../../types/graphql-generated';
import { mockProducts } from './mock';

export const resolver: Resolvers = {
  Query: {
    products: (_parent, _args, _context, _resolveInfo) => mockProducts,
  },
};
