import { Book } from "./book.model";


export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'user' | 'librarian';
  maxBooksAllowed: number;
  currentBooksCount: number;
  totalFines: number;
}

export interface Issue {
  id: number;
  bookId: number;
  book: Partial<Book>;
  issueDate: string;
  dueDate: string;
  status: 'active' | 'returned';
  fine: number;
  isOverdue: boolean;
}