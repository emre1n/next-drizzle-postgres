import {
  bigint,
  bigserial,
  boolean,
  char,
  decimal,
  doublePrecision,
  json,
  jsonb,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  address: varchar('address', { length: 256 }),
});

export const testTable = pgTable('testTable', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  qty: bigint('qty', { mode: 'bigint' }),
  price: decimal('price', { precision: 7, scale: 2 }), // 12345.67
  score: doublePrecision('score'),
  delivered: boolean('delivered'),
  // description: text('description'),
  description: varchar('description', { length: 256 }),
  name: char('name', { length: 10 }), // "chair     " - 10 a string of characters total
  // data: json('data'),
  data: jsonb('data'), // with jsonb the js object will be converted to binary type
});
