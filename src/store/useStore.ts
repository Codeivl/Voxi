import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Word } from '../types/word';

interface Store {
  words: Word[];
  favorites: Word[];
  dailyWordCount: number;
  isDarkMode: boolean;
  addWord: (word: Word) => void;
  toggleFavorite: (wordId: string) => void;
  setDailyWordCount: (count: number) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      words: [],
      favorites: [],
      dailyWordCount: 5,
      isDarkMode: false,
      addWord: (word) =>
        set((state) => ({
          words: [...state.words, word],
        })),
      toggleFavorite: (wordId) =>
        set((state) => {
          const word = state.words.find((w) => w.id === wordId);
          if (!word) return state;

          const updatedWord = { ...word, favorite: !word.favorite };
          return {
            words: state.words.map((w) => (w.id === wordId ? updatedWord : w)),
            favorites: word.favorite
              ? state.favorites.filter((f) => f.id !== wordId)
              : [...state.favorites, updatedWord],
          };
        }),
      setDailyWordCount: (count) =>
        set(() => ({
          dailyWordCount: count,
        })),
      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: 'vocabulary-store',
    }
  )
);