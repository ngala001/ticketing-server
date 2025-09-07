
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
    price: Section
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
    price: AddSection
  }

  type Section {
    vvip: Int
    vip: Int
    normal: Int
    mediaBox: Int
  }

  input AddSection {
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

  input AddStadium {
    name: String!
    location: String!
    capacity: Int!
    section: AddSection
  }

  type Ticket {
    id: ID!
    section: String
    scannerCode: String!
    matchId: String!
    userId: String!
    price: Int!
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

  type Team {
    id: ID!
    name: String!
    stadiumId: String!
    stadium: Stadium
    logo: String!
  }
  type TeamRes {
    success: Boolean!
  }

  input TeamInput {
    name: String!
    logo: String!
    stadium: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    teams: [Team!]!
    team(id: ID!): Team
    matches: [Match!]!
    match(id: ID!): Match!
    stadiums: [Stadium!]!
    stadium(id: ID!): Stadium!
  }

  type Mutation {
    createUser(input: CreateUser): SignupRes!
    loginUser(input: LoginUser): AuthPayload!
    addTeam(input: TeamInput): TeamRes!
    addMatch(input: AddMatch): Match!
    addStadium(input: AddStadium): Stadium!
  }
`;