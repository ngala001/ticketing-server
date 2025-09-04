import { MatchResolvers } from "./match.resolver";
import { StadiumResolvers } from "./stadium.resolvers";
import { TeamResolvers } from "./team.resolvers";
import { UserResolvers } from "./users.resolver";

export const resolvers = [
    UserResolvers, 
    MatchResolvers, 
    StadiumResolvers,
    TeamResolvers
]