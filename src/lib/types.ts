// src/lib/types.ts
export type Transaction = {
  id: number;
  created_at: string;
  amount: number;
  description: string | null; // description can be empty
  type: 'income' | 'expense';
};
