import { GraphQLResolveInfo } from 'graphql';

import { CustomContext } from '../../types/interfaces';

const mockProducts = [
  { productId: '0001', productName: 'Apple' },
  { productId: '0002', productName: 'Pear' },
  { productId: '0003', productName: 'Orange' },
];

const productsResolver = {
  Query: {
    products: (_: any, __: any, ___: CustomContext, ____: GraphQLResolveInfo) =>
      mockProducts,
  },
};

exports.resolver = productsResolver;
