import { db } from '@/db';

export async function GET() {
  const result = await db.query.posts.findMany({
    with: {
      author: true,
    },
  });

  return new Response(JSON.stringify(result));
}
