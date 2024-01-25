import { GraphQLResolveInfo } from 'graphql';

import { CustomContext } from '../../types/interfaces';

const mockOrders = [
  { orderId: '0001', customerId: '1000', cost: 12.0 },
  { orderId: '0002', customerId: '2000', cost: 6.0 },
  { orderId: '0003', customerId: '3000', cost: 9.5 },
  { orderId: '0004', customerId: '3000', cost: 9.5 },
  { orderId: '0005', customerId: '1000', cost: 17.5 },
];

const ordersResolver = {
  Query: {
    orders: (_: any, __: any, ctx: CustomContext, ___: GraphQLResolveInfo) => {
      const { user } = ctx;
      const userId = user && user.id;
      // If userId exists return order for user, else return all orders
      return userId
        ? mockOrders.filter((order) => order.customerId === userId)
        : mockOrders;
    },
  },
};

exports.resolver = ordersResolver;
