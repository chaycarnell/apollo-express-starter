import { GraphQLResolveInfo } from 'graphql';

import { CustomRequestContext } from '../../../types/interfaces';
import { mockProducts } from './mock';

export const resolver = {
  Query: {
    products: (
      _parent: undefined,
      _args: undefined,
      _context: CustomRequestContext,
      _resolveInfo: GraphQLResolveInfo,
    ) => mockProducts,
  },
};
