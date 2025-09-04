
export const typeDefs = `#graphql 
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
    tickets: [Ticket]
  }

  type Match {
    id: ID!
    homeTeam: String!
    awayTeam: String!
    stadiumId: String!
    date: String!
    time: String!
    gameType: String!
    gameStage: String!
    tickets: [Ticket]
    stadium: Stadium
  }

  input AddMatch {
    homeTeam: String!
    awayTeam: String!
    stadium: String!
    date: String!
    time: String!
    gameType: String!
    gameStage: String!
  }

  type Section {
    vvip: Int
    vip: Int
    normal: Int
    mediaBox: Int
  }

  type Stadium {
    id: ID!
    name: String!
    location: String!
    capacity: Int!
    section: Section
    matches: [Match]
  }

  type Ticket {
    id: ID!
    section: String
    scannerCode: String!
    matchId: String!
    userId: String!
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
    matches: [Match!]!
    match(id: ID!): Match!
  }

  type Mutation {
    createUser(input: CreateUser): SignupRes!
    loginUser(input: LoginUser): AuthPayload!
    addMatch(input: AddMatch): Match!
  }
`;