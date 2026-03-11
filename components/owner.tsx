import { Book, BookComponent } from "./book";

export interface Owner {
  id: number;
  name: string;
}

// Factory function to create Owner objects
export const Owner = (id: number, name: string): Owner => {
  return { id, name };
};

interface OwnerComponentProps {
  owner: Owner;
  books: Book[];
  onReturn?: (bookId: number) => void;
}

export const OwnerComponent: React.FC<OwnerComponentProps> = ({ owner, books, onReturn }) => {
  return (
    <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl text-center font-bold mb-4">{owner.name}</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500 italic">Aucun livre emprunté</p>
      ) : (
        <div className="space-y-2">
          {books.map((book) => (
            <BookComponent 
              key={book.id} 
              book={book} 
              onReturn={onReturn}
            />
          ))}
        </div>
      )}
    </div>
  );
};
