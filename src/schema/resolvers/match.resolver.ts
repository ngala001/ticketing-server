import { Context } from "./users.resolver";

type MatchType = {
    homeTeam: string
    awayTeam: string
    stadium: string
    date: string
    time: string
    gameType: string
    gameStage: string
}

export const MatchResolvers = {
    Query: {
      matches: async(parent:any, _:unknown, { prisma }:Context) => {
       const matches = await prisma.match.findMany({
        include: { 
            stadium: { 
                select: {
                    name: true,
                    location: true
                }
            }
        }
       });

       return matches
      },

      match: async(parent:any, args:{id: string}, { prisma }: Context ) => {
        const match = await prisma.match.findUnique({
            where: {id: args.id},
            include: {
                stadium: true
            }
        });

        return match
      }
    },

    Mutation: {
       addMatch: async(_:unknown, args:{input: MatchType}, { prisma}: Context) => {
         const { homeTeam, awayTeam, stadium, date, time, gameStage, gameType } = args.input;
         if(!homeTeam || !awayTeam || !stadium || !date || !time || !gameStage || !gameType){
            throw new Error('Insufficient match details provided')
         }

         const playGround = await prisma.stadium.findUnique({ where: {name: stadium}});
         if(!playGround) {
            throw new Error('Invalid or non-existing stadium')
         }

         const newMatch = await prisma.match.create({
            data: {
                homeTeam,
                awayTeam,
                stadiumId: playGround.id,
                date,
                time,
                gameStage,
                gameType
            },
            include: {
                stadium: true
            }
         });

         return newMatch

       } 
    }

}