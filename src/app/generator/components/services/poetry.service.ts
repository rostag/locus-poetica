import { Injectable } from '@angular/core';
import { cleanUpWord } from '../../generator-helpers';
import { DictionarySource, dictonarySource } from '../models/poetry.model';

/*
 * Poetry backlog
 * 
 * OOPO: Words are interactive objects
 * 
 *  - User can click a word or line to replace it
 *  - Real rhyming
 *  - Punctuation ('—', '₴')
 *  - TODO: sequencing word generation like ('наї' / 'заї') + ('ба') + ('в' || 'ла' || 'ло' || 'ли' || 'ло')
 * 
 * UI Controls:
 * 
 *  - Rhyme selector
 *  - Model selector
 *  - Full-auto (animated) mode
 * 
 * Re-mixing on different levels:
 * 
 *  - Letters
 *  - Syllables
 *  - Words
 *  - Lines
 */

export interface Poetry {
    strophae: Strophae[];
}

export interface Strophae {
    lines: Line[];
}

export interface Line {
    words: Word[];
}

export interface WordProto {
    content: string,
}

export interface Word {
    wordContents: string,
    rhymeWordLength: number,
};

export interface Dictionary {
    name: string;
    words: Word[];
}

export type OOPMode = 'default' | 'wording' | 'stream' | 'feed';

export interface OOPTimeline extends AnimationTimeline {
    currentTime: number;
    mode: OOPTimelineMode;
    modes: OOPTimelineMode[];
}

export interface OOPTimelineMode {
    name: string;
    description?: string;
}

@Injectable()
export class PoetryService {

    private timeline: OOPTimeline = {
        currentTime: 0,
        mode:   { name: 'default', description: 'Строфи виникають по черзі, перемикання одним кліком.' },
        modes: [{ name: 'default', description: 'Строфи виникають по черзі, перемикання одним кліком.' },
                { name: 'wording', description: 'Одинокі слова вистрибують на екран і зникають.' },
                { name: 'stream', description: 'Текст тече горизонтально, слова додаються до рядків і автоматично прокручуються.' },
                { name: 'feed', description: 'Текст тече вертикально, додаються і автоматично прокручуються рядки.' },
        ],
    };

    private dictionaries: Dictionary[] = [];

    public setupDictionaries() {
        this.dictionaries = [
            // this.createDictionaryFromSource(dictonarySource.kobzar, '\n\n', '\n', ' '),
            // this.createDictionaryFromSource(dictonarySource.zagovor_det, '\n\n', '\n', ' '),
            // this.createDictionaryFromSource(dictonarySource.mat),
            // this.createDictionaryFromSource(dictonarySource.roz),
            // this.createDictionaryFromSource(dictonarySource.srcSyllablesSlavic),
            this.createDictionaryFromSource(dictonarySource.srcUkrMova1000),
            this.createDictionaryFromSource(dictonarySource.srcSyllablesEnglish),
            this.createDictionaryFromSource(dictonarySource.dumyLat, '\n\n', '\n', ' ', '-'),
            this.createDictionaryFromSource(dictonarySource.ham),
            this.createDictionaryFromSource(dictonarySource.gg, '--SECTION-->'),
            this.createDictionaryFromSource(dictonarySource.pyro),
            this.createDictionaryFromSource(dictonarySource.srcWordNumbers),
        ]
        return this.dictionaries;
    }

    public getDictionaryByName(name: string) {
        const dictionaryByName = this.dictionaries.find(d => d.name === name) || this.dictionaries[0];
        return dictionaryByName;
    }

    public createDictionaryFromSource(
        dictionarySource: DictionarySource,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator?: string,
    ): Dictionary {
        const dictionaryName = dictionarySource.name;
        const multilineString = dictionarySource.value;
        const sections = multilineString.split(sectionSeparator);
        let dictionaryWords: Word[] = [];
        sections.forEach(section => {
            const lines = section.split(linesSeparator);
            lines.forEach(line => {
                const lineOfWords = line.trim();
                const words = lineOfWords.split(wordsSeparator);
                const superstrings: Word[] = [];
                words.forEach((word, index, wordsArray) => {
                    const wordCleanedUp = cleanUpWord(word, syllablesSeparator)
                    wordsArray[index] = wordCleanedUp;
                    const superstring: Word = {
                        wordContents: wordCleanedUp,
                        rhymeWordLength: 0,
                    };
                    superstrings.push(superstring)
                });
                dictionaryWords = dictionaryWords.concat(superstrings);
            })
        });
        this.dictionaries[dictionaryName as any] = <Dictionary>{
            name: dictionarySource.name,
            words: dictionaryWords,
        };
        return this.dictionaries[dictionaryName as any];
    }

    public getTimeline() {
        return this.timeline
    }

}