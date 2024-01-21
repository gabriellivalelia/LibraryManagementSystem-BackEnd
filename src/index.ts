import { PrismaClient } from '@prisma/client'
import express from 'express';
import cors from 'cors';
import router from './routes';


const prisma = new PrismaClient()

async function main() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
  }));
  app.use(router);
  app.use("*", (req, res) => {
    res.status(404).json({ message: `Rota '${req.originalUrl}' não encontrada!` });
  });

  app.listen(3000, () => console.log("API rodando"));
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


