import { BookComponent, Book } from "./book";
import { Owner } from "./owner";

export interface Library {
  name: string;
  books: Book[];
}

interface LibraryComponentProps {
  library: Library;
  owners?: Owner[];
  onBorrow?: (bookId: number, owner: Owner) => void;
  onReturn?: (bookId: number) => void;
}

export const LibraryComponent: React.FC<LibraryComponentProps> = ({
  library,
  owners = [],
  onBorrow,
  onReturn
}) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl text-center w-full font-bold mb-6">Bienvenue à la {library.name}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {library.books.map((book) => (
          <BookComponent 
            key={book.id} 
            book={book} 
            owners={owners}
            onBorrow={onBorrow}
            onReturn={onReturn}
          />
        ))}
      </div>
    </div>
  );
};
