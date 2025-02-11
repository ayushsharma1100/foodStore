import client from '@/libs/MongoAdapter';
import User from '@/modals/User';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { compareSync } from 'bcryptjs';
import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        console.log("Authorizing user:", credentials.email);

        // Ensure MongoDB connection
        await mongoose.connect(process.env.MONGO_URI);
        
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("User not found");
          throw new Error("Email or Password incorrect");
        }

        const isPasswordValid = compareSync(credentials.password, user.password);
        if (!isPasswordValid) {
          console.log("Invalid password");
          throw new Error("Email or Password incorrect");
        }

        console.log("User authenticated:", user);
        let res = {...user._doc, id: user._id.toString()}

        return res;
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",  // Use "database" if storing sessions in MongoDB
  },
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if(user) {
        token = user;
      }
      if(trigger === 'update') {
        token = session;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token
      return session;
    },
  },
  debug: true, // Enable debugging for logs
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
