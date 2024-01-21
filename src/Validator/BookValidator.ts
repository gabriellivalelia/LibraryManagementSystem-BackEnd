import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';

export const validateCreateBook: ValidationChain[] = [
    body('title').notEmpty().withMessage('O campo "Título" é obrigatório.'),
    body('author').notEmpty().withMessage('O campo "Autor" é obrigatório.'),
    body('genre').notEmpty().withMessage('O campo "Gênero" é obrigatório.'),
    body('pages').notEmpty().isNumeric().withMessage('O campo "Número de páginas" é obrigatório.'),
    body('total_quantity').notEmpty().isNumeric().withMessage('O campo "Número total de exemplares" é obrigatório.'),
    body('available_quantity').notEmpty().isNumeric().withMessage('O campo "Número disponível de exemplares" é obrigatório.'),
    body('media_base64').notEmpty().withMessage('O campo "Mídia em Base64" é obrigatório.'),

];

export const validateUpdateBook: ValidationChain[] = [
    body('id').notEmpty().withMessage('O campo "Id de livro" é obrigatório.'),
    body('title').optional().notEmpty().withMessage('O campo "Título" é obrigatório.'),
    body('author').optional().notEmpty().withMessage('O campo "Autor" é obrigatório.'),
    body('genre').optional().notEmpty().withMessage('O campo "Gênero" é obrigatório.'),
    body('pages').optional().notEmpty().isNumeric().withMessage('O campo "Número de páginas" é obrigatório.'),
    body('total_quantity').optional().notEmpty().isNumeric().withMessage('O campo "Número total de exemplares" é obrigatório.'),
    body('available_quantity').optional().notEmpty().isNumeric().withMessage('O campo "Número disponível de exemplares" é obrigatório.'),
    body('media_base64').optional().notEmpty().withMessage('O campo "Mídia em Base64" é obrigatório.'),
];

export const validateBookById: ValidationChain[] = [
    param('id').notEmpty().withMessage('O parâmetro "Id de livro" é obrigatório.')
];



export const handleBookValidationErrors = (
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
