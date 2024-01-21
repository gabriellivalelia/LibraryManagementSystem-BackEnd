import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function createUser(req: Request, res: Response) {
    const existingEmail = await prisma.user.findUnique({
        where: {
            id: req.body.email,
        },
    });

    if (!existingEmail) {
        await prisma.user.create({
            data: {
                name: req.body.name,
                type: req.body.type,
                email: req.body.email,
                phone_number: req.body.phone_number,
                date_of_birth: req.body.date_of_birth,
                cpf: req.body.cpf,
                password: req.body.password
            },
        })

        res.json({
            statusCode: 200,
        });
    }

    return res
        .status(409)
        .json({ message: "E-mail já cadastrado. Por favor, insira um novo." });

}

export async function updateUser(req: Request, res: Response) {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: req.body.id,
        },
    });

    if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const existingEmail = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });

    if (!existingEmail) {
        await prisma.user.update({
            where: {
                id: req.body.id,
            },
            data: {
                name: req.body?.name || existingUser.name,
                type: req.body?.type || existingUser.type,
                email: req.body?.email || existingUser.email,
                phone_number: req.body?.phone_number || existingUser.phone_number,
                cpf: req.body?.cpf || existingUser.cpf,
                date_of_birth: req.body?.date_of_birth || existingUser.date_of_birth,
                password: req.body?.password || existingUser.password,
            },
        });

        res.json({
            statusCode: 200,
        });
    }


    return res
        .status(409)
        .json({ message: "E-mail já cadastrado. Por favor, insira um novo." });

}

export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
}

export async function getUserById(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    })

    return res.status(200).json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
}

export async function logIn(req: Request, res: Response) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })

    if (!existingUser) {
        return res
            .status(404)
            .json({ message: "E-mail não cadastrado." });
    }


    if (existingUser.password === req.body.password) {
        return res
            .status(200)
            .json({ acessToken: uuidv4() });
    } else {
        return res
            .status(404)
            .json({ message: "Senha incorreta." });
    }
}


