import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaVolumeUp } from 'react-icons/fa';
import { Word } from '../types/word';

interface Props {
  word: Word;
  onFavorite: (wordId: string) => void;
}

export const WordCard = ({ word, onFavorite }: Props) => {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {word.word}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => playAudio()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaVolumeUp className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => onFavorite(word.id)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {word.favorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">{word.phonetic}</p>

      {word.meanings.map((meaning, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {meaning.partOfSpeech}
          </h3>
          {meaning.definitions.map((def, idx) => (
            <div key={idx} className="mb-2">
              <p className="text-gray-800 dark:text-gray-100">{def.definition}</p>
              {def.example && (
                <p className="text-gray-600 dark:text-gray-400 mt-1 italic">
                  Example: {def.example}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};