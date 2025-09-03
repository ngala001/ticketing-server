import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { signToken } from "../../lib/token"

type User = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword:string
}

type LoginType = {
  email: string
  password: string
}

interface Context {
    prisma: PrismaClient
}


export const UserResolvers = {
    Query: {
        users: async(_:unknown, args: any, { prisma }: Context) => {
          const users =  await prisma.user.findMany();
          return users 
        },

        user: async(_:any, args:any, {prisma}: Context) => {
          const user = await prisma.user.findUnique({ where: { id: args.id } });

          return user
        }
    },
    Mutation: {

        createUser: async(_:unknown, args: {input: User}, { prisma }: Context) => {
          const { firstName, lastName, email, password, confirmPassword } = args.input

          if(confirmPassword !== password) {
            throw new Error("Password do not match!")
          }

          const userExist = await prisma.user.findUnique({ where: { email } });

          if(userExist) {
            throw new Error("User with the same email already exists")
          }

          const hashPassword = await bcrypt.hash(password, 10)

          await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassword
            }
          });

          return  { success: "Account created successfully"}
        },

        loginUser: async(_:unknown, args:{ input:LoginType }, { prisma }: Context) => {
           const { email, password } = args.input

           const user = await prisma.user.findUnique({ where: {email} })
           if(!user) {
             throw new Error("Email provided is not registered")
           }

           const isValid = await bcrypt.compare(password, user.password);

           if(!isValid) {
             throw new Error("Invalid email or password")
           }

           const  token  = signToken(user.id);

           return { token }
        }
    }
   
}