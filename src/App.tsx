import { useEffect, useState } from 'react';
import { FaCog, FaHeart } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { WordCard } from './components/WordCard';
import { Settings } from './components/Settings';
import { useStore } from './store/useStore';
import { Word } from './types/word';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { words, favorites, dailyWordCount, isDarkMode, addWord, toggleFavorite } = useStore();

  const fetchWord = async () => {
    try {
      const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/random');
      const data = await response.json();
      
      if (data[0]) {
        const wordData: Word = {
          id: crypto.randomUUID(),
          word: data[0].word,
          phonetic: data[0].phonetic || '',
          meanings: data[0].meanings,
          favorite: false,
        };
        addWord(wordData);
      }
    } catch (error) {
      toast.error('Failed to fetch word');
    }
  };

  useEffect(() => {
    if (words.length < dailyWordCount) {
      const fetchWords = async () => {
        const wordsToFetch = dailyWordCount - words.length;
        for (let i = 0; i < wordsToFetch; i++) {
          await fetchWord();
        }
      };
      fetchWords();
    }
  }, [dailyWordCount]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Vocabulary Builder
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <FaHeart className={showFavorites ? 'text-red-500' : 'text-gray-400'} />
                <span className="text-gray-700 dark:text-gray-300">Favorites</span>
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <FaCog className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </header>

          <div className="space-y-6">
            {(showFavorites ? favorites : words).map((word) => (
              <WordCard
                key={word.id}
                word={word}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>

        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default App;