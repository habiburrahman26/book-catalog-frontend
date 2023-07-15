import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();

  console.log(bookId)
  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">
      BookDetails
    </section>
  );
};

export default BookDetails;
