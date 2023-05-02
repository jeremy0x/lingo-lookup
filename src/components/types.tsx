/**
  Interface describing the structure of word details returned from a dictionary API.
*/
export interface WordDetails {
  title?: string;
  word: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example: string;
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls: string[];
  license: {
    name: string;
    url: string;
  };
}
