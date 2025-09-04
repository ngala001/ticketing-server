import { Context } from "./users.resolver";


 type TeamInput = {
    name: string
    logo: string
    stadium: string
  }

export const TeamResolvers = {
    Query: {
      teams: async(parent:unknown,_:any, { prisma }: Context) => {
        const teams = await prisma.team.findMany()
        if(!teams.length) {
            throw new Error("No team yet")
        }

        return teams
      },

      team: async(_:any, args:{id: string}, { prisma }: Context) => {
        if(!args.id) {
            throw new Error("Invalid operation - team id is required contact admin")
        }

        const team = await prisma.team.findUnique({
            where: {
                id: args.id
            },
            include: {
                stadium: {
                    select: {
                        name: true,
                        location: true
                    }
                }
            }
        });

        return team;

      }
    },
    Mutation: {
     addTeam: async(_:any, args:{input: TeamInput}, {prisma}: Context) => {
        const {name, stadium, logo} = args.input
        
     }
    }
}