import { Resolvers } from '../../../types/graphql-generated';
import { mockOrders } from './mock';

export const resolver: Resolvers = {
  Query: {
    orders: (_parent, _args, context, _resolveInfo) => {
      const { user } = context;
      const userId = user && user.id;
      // If userId exists return order for user, else return all orders
      return userId
        ? mockOrders.filter((order) => order.customerId === userId)
        : mockOrders;
    },
  },
};
