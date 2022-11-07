import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name', 'Name is required').exists(),
  body('price', 'Price is required').exists(),
];

export const updateProductValidator = [
  param('id', 'Id is invalid').isNumeric(),
  body('name', 'Name is required').exists(),
  body('price', 'Price is required').exists(),
];
