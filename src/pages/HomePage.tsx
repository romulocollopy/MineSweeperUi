import { generateSlug } from 'random-word-slugs';
export function HomePage() {
  return (
    <>
      <h1>Welcome to Mine Sweeper</h1>

      <p>
        <a href={`/${generateSlug()}/`}>new game</a>
      </p>
    </>
  );
}
