import { db } from '@/db';

export async function GET() {
  const result = await db.query.posts.findFirst({
    with: {
      author: true,
      postOnCategories: {
        columns: {
          categoryId: false,
          postId: false,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  //   const result2 = await db.query.categories.findFirst({
  //     with: { posts: true },
  //   });

  return new Response(JSON.stringify(result));
}
