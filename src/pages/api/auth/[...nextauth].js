import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';
import compareHash from '@/lib/compareHash'

const prisma = new PrismaClient({});

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
                var user = await prisma.users.findUnique({
                    where: { name: req.body.name }
                });
                if (user != '' && user != undefined) {
                    let conf = await compareHash(req.body.password, user.password)
                    if (conf) {
                        prisma.$disconnect();
                        return user;
                    }
                }

                prisma.$disconnect();
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