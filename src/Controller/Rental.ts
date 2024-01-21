import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function createRental(req: Request, res: Response) {
    await prisma.rental.create({
        data: {
            client_id: req.body.client_id,
            book_id: req.body.book_id,
            return_date: req.body.return_date,
            status: req.body.status
        },
    })

    res.json({
        statusCode: 200,
    });


}

export async function updateRental(req: Request, res: Response) {
    const existingRental = await prisma.rental.findUnique({
        where: {
            id: req.body.id,
        },
    });

    if (!existingRental) {
        return res.status(404).json({ error: 'Locação não encontrada.' });
    }

    await prisma.rental.update({
        where: {
            id: req.body.id,
        },
        data: {

            client_id: req.body?.client_id || existingRental.client_id,
            book_id: req.body?.book_id || existingRental.book_id,
            return_date: req.body?.return_date || existingRental.return_date,
            status: req.body?.status || existingRental.status

        },
    });

    res.json({
        statusCode: 200,
    });

}

export async function getRentals(req: Request, res: Response) {
    const rentals = await prisma.rental.findMany();
    return res.status(200).json(rentals);
}

export async function getRentalById(req: Request, res: Response) {
    const rental = await prisma.rental.findUnique({
        where: {
            id: req.params.id,
        },
    })

    return res.status(200).json(rental);
}

export async function getRentalByBookId(req: Request, res: Response) {
    const rental = await prisma.rental.findMany({
        where: {
            book_id: req.params.id,
        },
    })

    return res.status(200).json(rental);
}

export async function getRentalByClientId(req: Request, res: Response) {
    const rentals = await prisma.rental.findMany({
        where: {
            client_id: req.params.id,
        },
    })

    return res.status(200).json(rentals);
}

export async function getRentalByStatus(req: Request, res: Response) {
    const rentals = await prisma.rental.findMany({
        where: {
            status: req.params.status,
        },
    })

    return res.status(200).json(rentals);
}

export async function deleteRental(req: Request, res: Response) {
    const existingRental = await prisma.rental.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!existingRental) {
        return res.status(404).json({ error: 'Locação não encontrada.' });
    }

    await prisma.rental.delete({
        where: {
            id: req.params.id,
        },
    })
}




