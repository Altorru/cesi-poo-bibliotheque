'use client';

import { useState } from "react";
import { Owner } from "./owner";

export enum BookAction {
  BORROW = "BORROW",
  RETURN = "RETURN"
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
}

export const BookComponent: React.FC<BookComponentProps> = ({ 
  book, 
  owners = [], 
  onBorrow, 
  onReturn 
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

  return (
    <div className="bg-white p-4 rounded shadow mb-4 text-black">
      <h2 className="text-xl text-center font-bold">{book.title}</h2>
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
            {owners.map(owner => (
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
