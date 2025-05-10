import axios from "axios";
import { type AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type userInfoApi = {
  name:string
    email: string
    sub: string
    picture: string
    updated_at: string
    nickname: string
  }
type userInfo = {
  access_token:string
    email: string
    sub: string
  }


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        try {

          const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            grant_type: 'password',
            username: credentials?.username,
            password: credentials?.password,
            audience: process.env.AUTH0_AUDIENCE,
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            scope: 'openid profile email',
            realm: 'Username-Password-Authentication'
          });          
          
          if (response.data) {
            const userInfoResponse:any = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              }
            });

            const { email, sub } = userInfoResponse.data; 

            return {
              id: sub, // Add the 'id' property as required by the 'User' type
              access_token: response.data.access_token,
              email,  
              sub,  
            };
          }

          
          
          return null; 

        } catch (error) {
          console.error("Error in authorize function:", error);
          return null; 
        }
      }
    })
  ],
  session: {
    strategy: 'jwt', 
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.accessToken = user.access_token;
        token.email = user.email;  
        token.sub = user.sub;     
      }
      return token; 
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      session.email = token.email;  
      session.sub = token.sub;      
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};