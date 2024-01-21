import express, { Request, Response } from 'express';
import { Router } from "express";
import { createUser, updateUser, getUsers, getUserById, deleteUser, logIn } from "./Controller/User";
import { validateCreateUser, validateUpdateUser, handleValidationErrors, validateById, validateLogin } from './Validator/UserValidator';
import { createBook, updateBook, getBooks, getBookById, deleteBook } from './Controller/Book';
import { validateCreateBook, validateUpdateBook, validateBookById, handleBookValidationErrors } from './Validator/BookValidator';
import { createRental, updateRental, getRentals, getRentalById, getRentalByStatus, getRentalByClientId, getRentalByBookId, deleteRental } from './Controller/Rental';
import { validateCreateRental, validateUpdateRental, validateRentalById, handleRentalValidationErrors, validateRentalByStatus } from './Validator/RentalValidator';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});


router.post(
    '/createUser',
    validateCreateUser,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await createUser(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.put(
    '/updateUser',
    validateUpdateUser,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await updateUser(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getUsers',
    async (req: Request, res: Response) => {
        try {
            await getUsers(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getUserById/:id',
    validateById,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getUserById(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.delete(
    '/deleteUser/:id',
    validateById,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await deleteUser(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.post(
    '/logIn',
    validateLogin,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await logIn(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);


router.post(
    '/createBook',
    validateCreateBook,
    handleBookValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await createBook(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.put(
    '/updateBook',
    validateUpdateBook,
    handleBookValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await updateBook(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getBooks',
    async (req: Request, res: Response) => {
        try {
            await getBooks(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getBookById/:id',
    validateBookById,
    handleBookValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getBookById(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.delete(
    '/deleteBook/:id',
    validateBookById,
    handleBookValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await deleteBook(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.post(
    '/createRental',
    validateCreateRental,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await createRental(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.put(
    '/updateRental',
    validateUpdateRental,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await updateRental(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getRentals',
    async (req: Request, res: Response) => {
        try {
            await getRentals(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getRentalById/:id',
    validateRentalById,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getRentalById(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getRentalByClientId/:id',
    validateRentalById,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getRentalByClientId(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getRentalByBookId/:id',
    validateRentalById,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getRentalByBookId(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.get(
    '/getRentalByStatus',
    validateRentalByStatus,
    handleRentalValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await getRentalByStatus(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);

router.delete(
    '/deleteRental/:id',
    validateRentalById,
    handleBookValidationErrors,
    async (req: Request, res: Response) => {
        try {
            await deleteRental(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
);



export default router;
