import { GraphQLResolveInfo } from 'graphql';

import { CustomContext } from '../../types/interfaces';
import { mockProducts } from './mock';

export const resolver = {
  Query: {
    products: (
      _parent: undefined,
      __args: undefined,
      ___context: CustomContext,
      ____resolveInfo: GraphQLResolveInfo,
    ) => mockProducts,
  },
};
