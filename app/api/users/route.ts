import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const result = await db.select().from(users).where(eq(users.id, 1));
  return new Response(JSON.stringify(result));
}
