import random
from collections import Counter


class Wordle:

    def __init__(self):
        self.guesses = 0
        with open('five-letter-words.txt', 'r') as file:
            data = file.read()
        self.words = data.split('\n')
        self.ans = random.choice(self.words)
        self.words = set(self.words)
        self.characters = Counter(self.ans)
        self.count = 0

    def is_valid_guess(self, guess):
        return len(guess) == 5 and guess in self.words

    def get_guesses(self):
        return self.guesses

    def get_answer(self):
        return self.ans

    def check_guess(self, guess):
        """
        There are 3 states that every character has:
        1. gray: not in word (or in set) at all
        2. yellow: in the word, but in the wrong spot
        3. green: in the word, in the right spot
        """
        self.count += 1
        curr_count = Counter()
        coloring = [[ch, 'gray'] for ch in guess]
        for i, ch in enumerate(guess):
            if ch not in self.characters:
                continue
            else:
                if ch == self.ans[i]:
                    coloring[i][1] = 'green'
                else:
                    if ch not in curr_count or ch in curr_count and curr_count[ch] < self.characters[ch]:
                        coloring[i][1] = 'yellow'
            curr_count[ch] += 1
        self.guesses += 1
        return coloring