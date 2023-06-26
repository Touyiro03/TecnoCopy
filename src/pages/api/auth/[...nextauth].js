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
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            const datos = await prisma.users.findUnique({ where: { id: parseInt(token.sub) } });
            return {
                // datos completos/necesarios del usuario
                id: datos.id,
                name: datos.name,
                email: datos.email,
                img: datos.img,
                pin: datos.pin,
                // dejar los datos por defecto tambien
                ...session,
                ...token
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)