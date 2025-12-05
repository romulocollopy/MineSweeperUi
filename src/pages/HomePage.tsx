import { generateSlug } from 'random-word-slugs';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Mine Sweeper</h1>

      <p>
        <Link to={`/${generateSlug()}/`}>new game</Link>
      </p>
    </>
  );
}
