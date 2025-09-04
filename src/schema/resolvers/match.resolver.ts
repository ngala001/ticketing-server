import { Context } from "./users.resolver";
type PriceType = {
    vvip?: number
    vip?: number
    normal?: number
    mediaBox?: number
}
type MatchType = {
    homeTeam: string
    awayTeam: string
    stadium: string
    date: string
    time: string
    gameType: string
    gameStage: string
    price: PriceType

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
         const { homeTeam, awayTeam, stadium, date, time, gameStage, gameType, price } = args.input;
         if(!homeTeam || !awayTeam || !stadium || !date || !time || !gameStage || !gameType || !price){
            throw new Error('Insufficient match details provided')
         }

         const playGround = await prisma.stadium.findUnique({ where: {name: stadium}});
         if(!playGround) {
            throw new Error('Invalid or non-existing stadium')
         }

         const isoDateTime = new Date(`${date}T${time}:00.000Z`).toISOString()

         const newMatch = await prisma.match.create({
            data: {
                homeTeam,
                awayTeam,
                stadiumId: playGround.id,
                date: isoDateTime ,
                time: isoDateTime,
                gameStage,
                gameType,
                price: {
                    vvip: price?.vvip,
                    vip: price?.vip,
                    normal: price?.normal,
                    mediaBox: price?.mediaBox
                }
            },
            include: {
                stadium: true
            }
         });

         return newMatch

       } 
    }

}