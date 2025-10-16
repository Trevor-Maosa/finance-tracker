// src/app/page.tsx
import { createClient } from '../lib/supabase/server';
import { redirect } from 'next/navigation';
import { Transaction } from '../lib/types'; // Import our new type
import LogoutButton from './LogoutButton';

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch transactions for the logged-in user
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false }); // Show newest first

  if (error) {
    console.error('Error fetching transactions:', error);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
        <LogoutButton />
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>

      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {transactions && transactions.length > 0 ? (
            transactions.map((tx: Transaction) => (
              <li key={tx.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{tx.description || 'No description'}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p
                  className={`font-bold text-lg ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </p>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">
              You have no transactions yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
