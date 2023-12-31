import { db } from '@/db';
import { users } from '@/db/schema';
import {
  and,
  between,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  like,
  lt,
  lte,
  ne,
  not,
  notBetween,
  notIlike,
  notInArray,
  notLike,
  or,
} from 'drizzle-orm';

export async function GET() {
  // const result = await db.select().from(users).where(eq(users.id, 1));

  const result = await db.query.users.findFirst({
    with: {
      profile: true,
    },
  });

  return new Response(JSON.stringify(result));
}
