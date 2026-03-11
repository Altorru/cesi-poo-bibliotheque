'use client';

import { useState } from "react";
import { Book } from "@/components/book";
import { LibraryComponent } from "@/components/library";
import { Owner, OwnerComponent } from "@/components/owner";

const initialBooks = [
  Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 1925),
  Book(2, "To Kill a Mockingbird", "Harper Lee", 1960),
  Book(3, "1984", "George Orwell", 1949),
  Book(4, "Pride and Prejudice", "Jane Austen", 1813),
  Book(5, "The Catcher in the Rye", "J.D. Salinger", 1951)
];

const owners = [
  Owner(1, "Alice Dupont"),
  Owner(2, "Bob Martin")
];

export default function Home() {
  const [books, setBooks] = useState(initialBooks);

  const borrowBook = (bookId: number, owner: Owner) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, owned_by: owner } : book
    ));
  };

  const returnBook = (bookId: number) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, owned_by: null } : book
    ));
  };

  const addBook = (bookData: Omit<Book, "id" | "owned_by">) => {
    const newBook = Book(
      Math.max(...books.map(b => b.id)) + 1,
      bookData.title,
      bookData.author,
      bookData.year
    );
    setBooks([...books, newBook]);
  };

  const deleteBook = (bookId: number) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  return (
    <div className="p-8">
      <LibraryComponent 
        library={{
          name: "Magnifique Bibliothèque",
          books: books
        }} 
        owners={owners}
        onBorrow={borrowBook}
        onReturn={returnBook}
        onAddBook={addBook}
        onDelete={deleteBook}
      />
    </div>
  );
}
