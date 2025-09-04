import { Context } from "./users.resolver";

type Section = {
    vvip: number
    vip: number
    normal: number
    mediaBox: number
  }

type AddStadiumType = {
    name: string
    location: string
    capacity: number
    section: Section
  }


export const StadiumResolvers = {
    Query: {
      stadiums: async(_:unknown, args:any, { prisma }: Context) => {
        const stadias = await prisma.stadium.findMany()
        if(!stadias.length){
            throw new Error('Click add stadium buttom to add new stadia')
        }
        
        return stadias
      },
      stadium: async(_:unknown, args:{id: string}, { prisma }: Context) => {
        const stadi = await prisma.stadium.findUnique({
            where: {
                id: args.id
            }
        });

        if(!stadi) {
            throw new Error('No! result')
        }

        return stadi;
      }
    },
    Mutation: {
       addStadium: async(_:unknown, args:{input: AddStadiumType}, { prisma }: Context) => {
         const { name, location, capacity, section } = args.input;

         if(!name || !location || !capacity || !section) {
            throw new Error('All fields are required for a complete stadium')
         }

         const newStadium = await prisma.stadium.create({
            data: {
                name,
                location,
                capacity,
                section: { ...section}
            }
         });

         if(!newStadium) {
            throw new Error('Error occured while adding a stadium')
         }

         return newStadium

       }
    }
}