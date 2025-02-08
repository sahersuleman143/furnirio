import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
};
  



import order from "./order"; // Order schema شامل کریں

export const schemaTypes = [product, order];
