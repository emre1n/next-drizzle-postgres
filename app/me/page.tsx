import FeedPost from '@/components/FeedPost';

import Profile from '../../components/Profile';

import { auth, signOut } from '@/auth/auth';

import { redirect } from 'next/navigation';

import SignoutButton from '@/components/SignoutButton';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/me');
  }

  //   const posts = await userPostsQuery.execute({ userId: session.user.id });

  interface Post {
    id: number;
    userId: string;
    mediaId?: number | null;
    replyId?: number | null;
    content: string;
    createdAt: string;
  }

  const posts: Post[] = [
    {
      id: 1,
      userId: 'user123',
      mediaId: 456,
      replyId: null,
      content: 'This is the first sample post content for the dummy entry.',
      createdAt: '2024-01-06T12:34:56+00:00',
    },
    {
      id: 2,
      userId: 'user456',
      mediaId: null,
      replyId: 789,
      content: 'This is the second sample post content for the dummy entry.',
      createdAt: '2024-01-07T08:00:00+00:00',
    },
  ];

  return (
    <>
      <Profile user={session.user} />

      <SignoutButton
        signOut={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      />
      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        {/* <div className="flex flex-col divide-y">
          {posts?.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div> */}
      </div>
    </>
  );
}
