// @ts-nocheck
import { Request } from 'express';
import {
  createProductValidator,
  updateProductValidator,
} from '@modules/products/products.validators';
import { it, describe } from 'node:test';
import { ValidationChain } from 'express-validator';

const runValidators = async (
  validator: ValidationChain[],
  request: Request
) => {
  const result = await Promise.all(
    validator.map((validator) => validator.run(request))
  );

  return result.reduce(
    (prev, curr) => [...prev, ...curr.context.errors.map((e) => e.msg)],
    []
  );
};

describe('createProductValidator', () => {
  it('Should return proper errors when body product name is not defined', async () => {
    const request = {
      body: { name: undefined, price: 0 },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual([
      'Name is required',
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product name chars length is over 100', async () => {
    const request = {
      body: {
        name: [...Array(200)].map((_, i) =>
          String.fromCharCode('A'.charCodeAt(0) + i)
        ),
        price: 0,
      },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual([
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product name chars length is under 3', async () => {
    const request = {
      body: { name: 'N', price: 0 },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual([
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product price is not defined', async () => {
    const request = {
      body: { name: 'name', price: undefined },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual(['Price is required']);
  });

  it('Should return proper error when body product price is not a number', async () => {
    const request = {
      body: { name: 'name', price: '0' },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual(['Price should be a number']);
  });

  it('Should not return any error when body data is correct', async () => {
    const request = {
      body: { name: 'name', price: 0 },
    } as Request;

    const errors = await runValidators(createProductValidator, request);

    expect(errors).toEqual([]);
  });
});

describe('updateProductValidator', () => {
  it('Should return proper errors when body product name is not defined', async () => {
    const request = {
      body: { name: undefined, price: 0 },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual([
      'Name is required',
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product name chars length is over 100', async () => {
    const request = {
      body: {
        name: [...Array(200)].map((_, i) =>
          String.fromCharCode('A'.charCodeAt(0) + i)
        ),
        price: 0,
      },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual([
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product name chars length is under 3', async () => {
    const request = {
      body: { name: 'N', price: 0 },
      params: { id: 1 },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual([
      'Name characters length should be between 3 and 100',
    ]);
  });

  it('Should return proper error when body product price is not defined', async () => {
    const request = {
      body: { name: 'name', price: undefined },
      params: { id: 1 },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual(['Price is required']);
  });

  it('Should return proper error when body product price is not a number', async () => {
    const request = {
      body: { name: 'name', price: '0' },
      params: { id: 1 },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual(['Price should be a number']);
  });

  it('Should return proper error when param product id is not a number', async () => {
    const request = {
      body: { name: 'name', price: '0' },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual(['Id is invalid']);
  });

  it('Should not return any error when body data and params are correct', async () => {
    const request = {
      body: { name: 'name', price: 0 },
      params: { id: 1 },
    } as Request;

    const errors = await runValidators(updateProductValidator, request);

    expect(errors).toEqual([]);
  });
});
