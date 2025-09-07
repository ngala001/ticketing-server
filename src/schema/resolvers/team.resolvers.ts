import { cloudinary } from "../../lib/cloudinary";
import { Context } from "./users.resolver";


 type TeamInput = {
    name: string
    logo: string
    stadium: string
  }

  type LogoUrl = {
    logoUrl: string
  }

export const TeamResolvers = {
    Query: {
      teams: async(parent:unknown,_:any, { prisma }: Context) => {
        const teams = await prisma.team.findMany({
          include: {
            stadium: true
          }
        })
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
        const {name, stadium, logo} = args.input;
        if(!name || !stadium || !logo) {
          throw new Error("Please fill in all fields")
        }
        //fetch stadium
        const stadi = await prisma.stadium.findUnique({ where: { name: stadium }});
        if(!stadi) throw new Error("Invalid or non-existing stadium")
        //upload file to cloudinary
        function uploadLogo(): Promise<string> {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { upload_preset:'teams_logo'},
              (error, result) => {
                if(error || !result?.secure_url) {
                 reject(new Error("Logo upload failed, try again"))
                } else {
                   resolve(result?.secure_url)
                }
              }).end(logo)

          })
        }

        const logoUrl = await uploadLogo()

        await prisma.team.create({
          data: {
            name,
            stadiumId: stadi?.id,
            logo: logoUrl
          }
        });

          return { success: true}
        
     }
    }
}