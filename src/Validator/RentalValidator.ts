import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';

export const validateCreateRental: ValidationChain[] = [
    body('client_id').notEmpty().withMessage('O campo "Id do cliente" é obrigatório.'),
    body('book_id').notEmpty().withMessage('O campo "Id do livro" é obrigatório.'),
    body('status').notEmpty().withMessage('O campo "Status" é obrigatório.'),
    body('return_date').optional().notEmpty().isNumeric().withMessage('O campo "Data de retorno" não pode ser nulo.')

];

export const validateUpdateRental: ValidationChain[] = [
    body('id').notEmpty().withMessage('O campo "Id de locação" é obrigatório.'),
    body('client_id').optional().notEmpty().withMessage('O campo "Id do cliente" não pode ser nulo.'),
    body('book_id').optional().notEmpty().withMessage('O campo "Id do livro" não pode ser nulo.'),
    body('status').optional().notEmpty().withMessage('O campo "Status" não pode ser nulo.'),
    body('return_date').optional().notEmpty().isNumeric().withMessage('O campo "Data de retorno" não pode ser nulo.')
];

export const validateRentalById: ValidationChain[] = [
    param('id').notEmpty().withMessage('O parâmetro "Id de locação" é obrigatório.')
];

export const validateRentalByStatus: ValidationChain[] = [
    body('status').notEmpty().withMessage('O parâmetro "Status de locação" é obrigatório.')
];



export const handleRentalValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};
