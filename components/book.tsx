"use client";

import { useState } from "react";
import { Owner } from "./owner";

export enum BookAction {
  BORROW = "BORROW",
  RETURN = "RETURN",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  owned_by?: null | Owner;
}

// Factory function to create Book objects
export const Book = (
  id: number,
  title: string,
  author: string,
  year: number,
): Book => {
  return { id, title, author, year };
};

interface BookComponentProps {
  book: Book;
  owners?: Owner[];
  onBorrow?: (bookId: number, owner: Owner) => void;
  onReturn?: (bookId: number) => void;
  onDelete?: (bookId: number) => void;
}

export const BookComponent: React.FC<BookComponentProps> = ({
  book,
  owners = [],
  onBorrow,
  onReturn,
  onDelete,
}) => {
  const [showOwnerSelect, setShowOwnerSelect] = useState(false);

  const handleBorrow = (owner: Owner) => {
    if (onBorrow) {
      onBorrow(book.id, owner);
      setShowOwnerSelect(false);
    }
  };

  const handleReturn = () => {
    if (onReturn) {
      onReturn(book.id);
    }
  };

  const handleDelete = () => {
    if (onDelete && confirm('Êtes-vous sûr de vouloir supprimer "' + book.title + '" ?')) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 text-black">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl text-center font-bold">{book.title}</h2>
        <button
          className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
      <p className="text-lg">
        <span className="underline">Auteur:</span> {book.author}
      </p>
      <p className="text-lg">
        <span className="underline">Année:</span> {book.year}
      </p>
      {book.owned_by && (
        <p className="text-lg">
          <span className="underline">Propriétaire:</span> {book.owned_by.name}
        </p>
      )}

      {!book.owned_by && !showOwnerSelect && (
        <div className="flex justify-end">
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            onClick={() => setShowOwnerSelect(true)}
          >
            Emprunter
          </button>
        </div>
      )}

      {!book.owned_by && showOwnerSelect && (
        <div className="mt-4">
          <p className="text-sm mb-2">Choisir un propriétaire:</p>
          <div className="flex gap-2 flex-wrap">
            {owners.map((owner) => (
              <button
                key={owner.id}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                onClick={() => handleBorrow(owner)}
              >
                {owner.name}
              </button>
            ))}
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
              onClick={() => setShowOwnerSelect(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {book.owned_by && (
        <div className="flex justify-end">
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            onClick={handleReturn}
          >
            Rendre
          </button>
        </div>
      )}
    </div>
  );
};
