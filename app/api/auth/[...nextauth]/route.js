import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import UserModel from "@/models/users"
import connectDB from "@/utils/db"


const handler = NextAuth({
    providers:[
        GithubProvider({
        clientId:process.env.GITHUB_ID,
        clientSecret:process.env.GITHUB_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await UserModel.findOne({
                email:session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
          console.log(profile.avatar_url)
            try {
              await connectDB();
              const userExists=await UserModel.findOne({
                email:profile.email
              })
              if(!userExists){
                await UserModel.create({
                 email:profile.email,
                 userName:profile.name.replace(" ","").toLowerCase(),
                 avatar:profile.avatar_url
                })
              }  
              return true;
            } catch (error) {
               console.log(error)
               return false; 
            }
        }
    }

})

export {handler as GET , handler as POST};