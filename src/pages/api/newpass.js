import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson'
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({})
export default async function newPass(req, res) {
    let id = new ObjectId()
    let newpass = await bcrypt.hash('admin', 10);
    console.log(newpass);

    const newuser = await prisma.users.create({
        data: {
            name: 'admin',
            password: String(newpass)
        }
    })
    return res.send('bien');
}