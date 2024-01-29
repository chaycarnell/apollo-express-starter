import { GraphQLResolveInfo } from 'graphql';

import { CustomContext } from '../../types/interfaces';
import { mockOrders } from './mock';

export const resolver = {
  Query: {
    orders: (
      _parent: undefined,
      __args: undefined,
      context: CustomContext,
      ___resolveInfo: GraphQLResolveInfo,
    ) => {
      const { user } = context;
      const userId = user && user.id;
      // If userId exists return order for user, else return all orders
      return userId
        ? mockOrders.filter((order) => order.customerId === userId)
        : mockOrders;
    },
  },
};