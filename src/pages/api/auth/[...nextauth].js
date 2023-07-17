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
                //console.log(user[0]);
                user = user[0];
                if (user != '' && user != undefined) {
                    let conf = await compareHash(req.body.password, user.password)
                    if (conf) {
                        //mongo.close();
                        return user;
                    }
                }

                //mongo.close();
                throw new Error("Usuario o Contraseña Incorrectos.")
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.account = account;
                token.profile = profile;
            }
            return token
        },
        async session({ session, token }) {
            const mongo = await conn;
            const db = mongo.db();
            const user = await db.collection('users').findOne({
                name: token.name
            });
            token.user = user;
            token.user.password = '';
            //console.log(token);
            return {
                ...session,
                ...token,
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)