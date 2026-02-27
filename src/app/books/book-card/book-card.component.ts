import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() borrowClicked = new EventEmitter<Book>();

  onBorrowClick(): void {
    this.borrowClicked.emit(this.book);
  }

  isAvailable(): boolean {
    return this.book?.availableCopies > 0;
  }
}