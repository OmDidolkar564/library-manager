import { Book } from "./book.model";

export interface Issue {
  id:           number;
  bookId:       number;
  userId:       number;
  issueDate:    string;                    // ISO 8601
  dueDate:      string;                    // ISO 8601
  returnDate:   string | null;
  status:       'active' | 'returned';
  renewCount:   number;                    // max 2
  fine:         number;
  finePaid:     boolean;
  daysUntilDue: number;                    // negative when overdue
  isOverdue:    boolean;
  book?:        Pick<Book, 'id' | 'title' | 'author' | 'isbn'>;  // populated in GET /api/issues/my
}