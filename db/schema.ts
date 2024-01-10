import { relations } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  boolean,
  char,
  date,
  decimal,
  doublePrecision,
  integer,
  interval,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  time,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

import type { AdapterAccount } from '@auth/core/adapters';

// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   fullName: text('full_name'),
//   phone: varchar('phone', { length: 256 }),
//   address: varchar('address', { length: 256 }),
//   score: integer('score'),
// });

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// export const userRelations = relations(users, ({ one, many }) => ({
//   profile: one(profiles, {
//     fields: [users.id],
//     references: [profiles.userId],
//   }),
//   posts: many(posts),
// }));

// export const posts = pgTable('posts', {
//   id: serial('id').primaryKey(),
//   text: varchar('text', { length: 256 }),
//   authorId: integer('author_id')
//     .notNull()
//     .references(() => users.id),
// });

// export const postRelations = relations(posts, ({ one, many }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),

//   postOnCategories: many(postOnCategories),
// }));

// export const categories = pgTable('categories', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
// });

// export const categoryRelations = relations(categories, ({ many }) => ({
//   posts: many(postOnCategories),
// }));

// export const postOnCategories = pgTable(
//   'post_categories',
//   {
//     postId: integer('post_id')
//       .notNull()
//       .references(() => posts.id),
//     categoryId: integer('category_id')
//       .notNull()
//       .references(() => categories.id),
//   },
//   t => ({
//     pk: primaryKey(t.postId, t.categoryId),
//   })
// );

// export const postOnCategoriesRelations = relations(
//   postOnCategories,
//   ({ one }) => ({
//     post: one(posts, {
//       fields: [postOnCategories.postId],
//       references: [posts.id],
//     }),

//     category: one(categories, {
//       fields: [postOnCategories.categoryId],
//       references: [categories.id],
//     }),
//   })
// );

// export const profiles = pgTable('profiles', {
//   id: serial('id').primaryKey(),
//   bio: varchar('bio', { length: 256 }),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id),
// });

// export const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy']);
// export const testTable = pgTable('testTable', {
//   id: bigserial('id', { mode: 'bigint' }).primaryKey(),
//   qty: bigint('qty', { mode: 'bigint' }),
//   price: decimal('price', { precision: 7, scale: 2 }), // 12345.67
//   score: doublePrecision('score'),
//   delivered: boolean('delivered'),
//   // description: text('description'),
//   description: varchar('description', { length: 256 }),
//   name: char('name', { length: 10 }), // "chair     " - 10 a string of characters total
//   // data: json('data'),
//   data: jsonb('data'), // with jsonb the js object will be converted to binary type
//   date: date('date', { mode: 'date' }).defaultNow(),
//   interval2: interval('interval2', { fields: 'day' }),
//   startAt: time('startAt', { precision: 0 }).defaultNow(),
//   mood: moodEnum('mood').default('ok'),
// });
