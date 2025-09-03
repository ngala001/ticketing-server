
export const userTypeDefs = `#graphql 
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
  }

  input CreateUser {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginUser {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type SignupRes {
    success: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(input: CreateUser): SignupRes!
    loginUser(input: LoginUser): AuthPayload!
  }
`;