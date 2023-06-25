// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  const prisma = new PrismaClient({});

  switch (req.method) {
    case 'GET':
      var resp = await prisma.users.create({
        data: {
          name: "juan",
          password: 'juan123'
        }
      })
      res.send(resp);
  }
}
