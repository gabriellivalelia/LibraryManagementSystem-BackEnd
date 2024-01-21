import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function createBook(req: Request, res: Response) {
    await prisma.book.create({
        data: {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            pages: req.body.pages,
            total_quantity: req.body.total_quantity,
            available_quantity: req.body.available_quantity,
            media_base64: req.body.media_base64,
            synopsis: req.body.synopsis
        },
    })

    res.json({
        statusCode: 200,
    });


}

export async function updateBook(req: Request, res: Response) {
    const existingBook = await prisma.book.findUnique({
        where: {
            id: req.body.id,
        },
    });

    if (!existingBook) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    await prisma.book.update({
        where: {
            id: req.body.id,
        },
        data: {
            title: req.body?.title || existingBook.title,
            author: req.body?.author || existingBook.author,
            genre: req.body?.genre || existingBook.genre,
            pages: req.body?.pages || existingBook.pages,
            total_quantity: req.body?.total_quantity || existingBook.total_quantity,
            available_quantity: req.body?.available_quantity || existingBook.available_quantity,
            media_base64: req.body?.media_base64 || existingBook.media_base64,
            synopsis: req.body?.synopsis || existingBook.synopsis,
        },
    });

    res.json({
        statusCode: 200,
    });

}

export async function getBooks(req: Request, res: Response) {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
}

export async function getBookById(req: Request, res: Response) {
    const book = await prisma.book.findUnique({
        where: {
            id: req.params.id,
        },
    })

    return res.status(200).json(book);
}

export async function deleteBook(req: Request, res: Response) {
    const existingBook = await prisma.book.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!existingBook) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }

    await prisma.book.delete({
        where: {
            id: req.params.id,
        },
    })
}




