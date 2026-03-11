"use client";

import { useState } from "react";
import { BookComponent, Book } from "./book";
import { Owner } from "./owner";
import { Modal } from "./modal";

export interface Library {
  name: string;
  books: Book[];
}

interface LibraryComponentProps {
  library: Library;
  owners?: Owner[];
  onBorrow?: (bookId: number, owner: Owner) => void;
  onReturn?: (bookId: number) => void;
  onAddBook?: (book: Omit<Book, "id" | "owned_by">) => void;
  onDelete?: (bookId: number) => void;
  onAccessible?: (bookId: number) => void;
}

export const LibraryComponent: React.FC<LibraryComponentProps> = ({
  library,
  owners = [],
  onBorrow,
  onReturn,
  onAddBook,
  onDelete,
  onAccessible,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (book: Omit<Book, "id" | "owned_by">) => {
    if (onAddBook) {
      onAddBook(book);
    }
  };

  const availableBooks = library.books.filter((book) => !book.owned_by);
  const borrowedBooks = library.books.filter((book) => book.owned_by);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBook}
      />
      <div className="w-full">
        <div className="flex justify-between py-1">
          <h1 className="text-3xl w-full font-bold mb-6">
            Bienvenue à la {library.name}
          </h1>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white cursor-pointer rounded-2xl w-40 h-10"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter un livre
          </button>
        </div>

        {/* Livres disponibles */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Livres disponibles ({availableBooks.length})
          </h2>
          {availableBooks.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableBooks.map((book) => (
                <BookComponent
                  key={book.id}
                  book={book}
                  owners={owners}
                  onBorrow={onBorrow}
                  onReturn={onReturn}
                  onDelete={onDelete}
                  onAccessible={onAccessible}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun livre disponible</p>
          )}
        </div>

        {/* Livres empruntés */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">
            Livres empruntés ({borrowedBooks.length})
          </h2>
          {borrowedBooks.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {borrowedBooks.map((book) => (
                <BookComponent
                  key={book.id}
                  book={book}
                  owners={owners}
                  onBorrow={onBorrow}
                  onReturn={onReturn}
                  onDelete={onDelete}
                  onAccessible={onAccessible}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun livre emprunté</p>
          )}
        </div>
      </div>
    </>
  );
};
