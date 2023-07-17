import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import conn from '@/lib/mongo'
import compareHash from '@/lib/compareHash'


export const authOptions = {
    // Configure one or more authentication providers
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                console.log("cred");
                console.log(credentials);
                const mongo = await conn;
                const db = mongo.db();
                var user = await db.collection('users').find({
                    name: req.body.name
                }).toArray();
                user = user[0];
                if (user != '' && user != undefined) {
                    let conf = await compareHash(req.body.password, user.password)
                    if (conf) {
                        mongo.close();
                        return user;
                    }
                }

                mongo.close();
                throw new Error("Usuario o Contraseña Incorrectos.")
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            console.log("1.");
            console.log(token);
            console.log("2.");
            console.log(account);
            if (account) {
                token.accessToken = account.access_token
                token.account = account;
            }
            return token
        },
        async session({ session, token }) {
            console.log("3");
            console.log(session);
            console.log("4.");
            console.log(token);

            return {
                ...session,
                ...token
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)