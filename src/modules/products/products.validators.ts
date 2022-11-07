import { body, param } from 'express-validator';

export const createProductValidator = [
  body('price', 'Price is required').exists().isNumeric(),
  body('name', 'Name is required').exists(),
  body('name', 'Name characters length should be between 3 and 100').isLength({
    min: 3,
    max: 100,
  }),
];

export const updateProductValidator = [
  ...createProductValidator,
  param('id', 'Id is invalid').isNumeric(),
];
