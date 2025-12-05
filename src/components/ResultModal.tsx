import { generateSlug } from 'random-word-slugs';
import { PaperLink, PaperSubtitle, paperBaseStyle } from './PaperComponents';

export function ResultModal({ result, onClose }: { result: 'win' | 'lose'; onClose: () => void }) {
  const message = result === 'win' ? '🎉 You Won!' : '💥 Game Over';

  const closeButtonClasses = `
    absolute top-0 right-0 m-2 
    bg-transparent border-none text-3xl font-bold cursor-pointer 
    text-gray-900 hover:text-red-600 focus:outline-none p-1
  `;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className={`relative p-8 text-center w-[340px] ${paperBaseStyle} rounded-lg bg-white`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className={closeButtonClasses} onClick={onClose} aria-label="Close Modal">
          ×
        </button>

        <PaperSubtitle>{message}</PaperSubtitle>

        <div className="flex justify-center mt-6">
          <PaperLink
            to={`/${generateSlug()}/`}
            variant="primary"
            onClick={onClose}
            className="w-full justify-center"
          >
            ➕ Start New Game
          </PaperLink>
        </div>
      </div>
    </div>
  );
}
