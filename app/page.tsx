import { db } from '@/db';
import { users } from '@/db/schema';

export default async function Home() {
  const usersData = await db.select().from(users);
  console.log('🚀 ~ file: page.tsx:6 ~ Home ~ result:', usersData);

  return (
    <main className="bg-slate-800 text-lime-400 h-screen p-8 flex flex-col gap-4 items-center">
      <h1>Drizzle ORM with Postgres DB</h1>
      <div>
        <ul className="flex flex-col gap-2">
          {usersData.map(user => (
            <li key={user.id}>
              <div className="flex flex-col bg-slate-900 p-2">
                <p>{user.fullName}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
