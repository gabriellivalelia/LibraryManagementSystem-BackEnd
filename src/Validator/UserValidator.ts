import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';

export const validateCreateUser: ValidationChain[] = [
    body('name').notEmpty().withMessage('O campo "Nome de usuário" é obrigatório.'),
    body('type').notEmpty().withMessage('O campo "Tipo de usuário" é obrigatório.'),
    body('email').isEmail().withMessage('Digite um email válido.'),
    body('phone_number').notEmpty().withMessage('O campo "Número de telefone" é obrigatório.'),
    body('cpf').notEmpty().withMessage('O campo "CPF" é obrigatório.'),
    body('date_of_birth').notEmpty().withMessage('O campo "Data de nascimento" é obrigatório.'),
    body('password')
        .notEmpty()
        .withMessage('A senha é obrigatória')
        .isLength({ min: 8 })
        .withMessage('A senha deve ter pelo menos 8 caracteres.')
];

export const validateUpdateUser: ValidationChain[] = [
    body('id').notEmpty().withMessage('O campo "Id de usuário" é obrigatório.'),
    body('name').optional().notEmpty().withMessage('O campo "Nome de usuário" não pode ser nulo.'),
    body('type').optional().notEmpty().withMessage('O campo "Tipo de usuário" não pode ser nulo.'),
    body('email').optional().isEmail().withMessage('Digite um email válido.'),
    body('phone_number').optional().notEmpty().withMessage('O campo "Número de telefone" não pode ser nulo.'),
    body('cpf').optional().notEmpty().withMessage('O campo "CPF" não pode ser nulo.'),
    body('date_of_birth').optional().notEmpty().withMessage('O campo "Data de nascimento" não pode ser nulo.'),
    body('password')
        .optional()
        .notEmpty()
        .withMessage('A senha não pode ser nula')
        .isLength({ min: 8 })
        .withMessage('A senha deve ter pelo menos 8 caracteres.')
];

export const validateById: ValidationChain[] = [
    param('id').notEmpty().withMessage('O parâmetro "Id de usuário" é obrigatório.')
];

export const validateLogin: ValidationChain[] = [
    body('email').isEmail().withMessage('Digite um email válido.'),
    body('password')
        .notEmpty()
        .withMessage('A senha não pode ser nula')
        .isLength({ min: 8 })
        .withMessage('A senha deve ter pelo menos 8 caracteres.')
];


export const handleValidationErrors = (
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
