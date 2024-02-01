import { GraphQLResolveInfo } from 'graphql';

import { ProductType } from './enums';
import { CustomRequestContext } from './interfaces';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Order = {
  __typename?: 'Order';
  cost?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<ProductType>;
};

export { ProductType };

export type Query = {
  __typename?: 'Query';
  orders?: Maybe<Array<Maybe<Order>>>;
  products?: Maybe<Array<Maybe<Product>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Order: ResolverTypeWrapper<Order>;
  Product: ResolverTypeWrapper<Product>;
  ProductType: ProductType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Order: Order;
  Product: Product;
  Query: {};
  String: Scalars['String']['output'];
};

export type OrderResolvers<ContextType = CustomRequestContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = CustomRequestContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTypeResolvers = EnumResolverSignature<{ Fruit?: any }, ResolversTypes['ProductType']>;

export type QueryResolvers<ContextType = CustomRequestContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomRequestContext> = {
  Order?: OrderResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductType?: ProductTypeResolvers;
  Query?: QueryResolvers<ContextType>;
};

