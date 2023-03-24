import { latynka } from './components/models/latynka.model';
import { Rhyme } from './components/models/rhyme.models';
import { Dictionary, Word } from './components/services/poetry.service';

export function latynize(str: string): string {
  Object['entries'](latynka).forEach(letter => str = str.replace(new RegExp(letter[0], 'g'), letter[1]));
  return str
}

let getRandomFromSetCallCount = 0;

export function getRandomFromSet<Type>(set: Type[]): Type {
  const result = set[Math.round(Math.random() * set.length - 1)];
  if (!!result || getRandomFromSetCallCount > 1000) {
    getRandomFromSetCallCount = 0;
    return result;
  } else {
    getRandomFromSetCallCount += 1;
    return getRandomFromSet(set);
  }
};

let getRandomWordOfGivenLengthCallCount = 0;

export function getRandomWordOfGivenLength(words: Word[], targetWordLength: number, transformVowels = false, removeWordsFromDic = false, ending?: string): Word {
  const vowels = 'їёуэеиаоєяіиюыєeuioay';
  const randomWord: Word = getRandomFromSet(words);
  let syllablesCount = 0;
  randomWord.wordContents.split('').forEach(char => {
    syllablesCount += vowels.split('').includes(char) ? 1 : 0;
  })
  if (syllablesCount === targetWordLength || getRandomWordOfGivenLengthCallCount > 100) {
    if (removeWordsFromDic) {
      words.splice(words.indexOf(randomWord), 1);
    }
    let w = randomWord.wordContents;
    if (transformVowels) {
      w = w
        .replace(/ї/g, 'Ї').replace(/ё/g, 'Ё').replace(/у/g, 'У')
        .replace(/э/g, 'Э').replace(/е/g, 'Е').replace(/и/g, 'И')
        .replace(/о/g, 'О').replace(/є/g, 'Є').replace(/а/g, 'А')
        .replace(/я/g, 'Я').replace(/і/g, 'І').replace(/ю/g, 'Ю')
        .replace(/ы/g, 'Ы');
    }
    getRandomWordOfGivenLengthCallCount = 0;
    randomWord.rhymeWordLength = targetWordLength;
    return randomWord;
  } else {
    getRandomWordOfGivenLengthCallCount++;
    return getRandomWordOfGivenLength(words, targetWordLength);
  }
}

export function getRandomName(dictionary: Dictionary) {
  const key: string = getRandomFromSet(dictionary.words).wordContents;
  const randomLen = Math.min(Math.max(Math.floor(Math.random() * key.length), 4), 10);
  return (
    key[Math.floor(Math.random() * key.length)].toUpperCase() +
    key
      .substr(key.length - randomLen)
      .toLowerCase()
      .replace(/_/g, ' ')
  );
};

export function getRandomSequence(dictionary: Dictionary, wordCount: number) {
  let result = '',
    i = 0;
  do {
    result += getRandomName(dictionary) + ' ';
    i++;
  } while (i < wordCount);
  return result;
};

export function cleanUpWord(word: string, syllablesSeparator?: string): string {
  let r = word.replace(/«/gi, '');
  r = r.replace(/»/gi, '');
  r = r.replace(/\?/gi, '');
  r = r.replace(/\./gi, '');
  r = r.replace(/!/gi, '');
  r = r.replace(/"/gi, '');
  r = r.replace(/\)/gi, '');
  r = r.replace(/\(/gi, '');
  r = r.replace(/\[/gi, '');
  r = r.replace(/\]/gi, '');
  r = r.replace(/\:/gi, '');
  r = r.replace(/\;/gi, '');
  r = r.replace(/\,/gi, '');
  r = r.replace(/\—/gi, '');
  if (syllablesSeparator) {
    r = r.replace(/-/g, '');
  }
  return r.toLowerCase();
}

export function copyToClipboardWithVisualResponse(el, text) {
  const responseElement = el.querySelector('.copied');
  if (text) {
      navigator.clipboard.writeText(text).then(function() {
          responseElement.classList.add('show-success');
          setTimeout(() => {
              responseElement.classList.remove('show-success');
          }, 2000);
      }, function(err) {
          console.error('Async: Could not copy text: ', err);
      });
  }
}