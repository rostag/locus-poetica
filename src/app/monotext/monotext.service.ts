/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';

  /**
   * (c) cpsdqs 2016
   * MIT License
   *
   * A small utility for converting text to unicode variants
   */
  
  // offsets to apply counting up from 0-26 for A-Z, 27-52 for a-z, and 0-9 for 0-9
  /*
   * letters sorted alphabetically
   * m: monospace
   * b: bold
   * i: italic
   * c: script
   * f: fraktur
   * d: double-struck
   * s: sans-serif
   * g: greek
   */
  const offsets = {
    m: [0x1d670, 0x1d7f6],
    b: [0x1d400, 0x1d7ce],
    i: [0x1d434, 0x00030],
    bi: [0x1d468, 0x00030],
    c: [0x1d49c, 0x00030],
    bc: [0x1d4d0, 0x00030],
    f: [0x1d504, 0x00030],
    d: [0x1d538, 0x1d7d8],
    bf: [0x1d56c, 0x00030],
    s: [0x1d5a0, 0x1d7e2],
    bs: [0x1d5d4, 0x1d7ec],
    is: [0x1d608, 0x00030],
    bis: [0x1d63c, 0x00030],
    bg: [0x1d6a8, 0x00030],
    gi: [0x1d6e2, 0x00030],
    bgi: [0x1d71c, 0x00030]
  }
  
  // special characters (absolute values)
  // applied *before* any offsets
  const special = {
    m: {
      ' ': 0x2000,
      '-': 0x2013
    },
    i: {
      'h': 0x210e
    },
    f: {
      'C': 0x212d,
      'H': 0x210c,
      'I': 0x2111,
      'R': 0x211c,
      'Z': 0x2128
    }
  }

  // use monospace by default
  let type: 'm' | 'i' | 'f' = 'm'
  let underline = false
  let strike = false
  
  // converter
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let numbers = '0123456789'

  let typeFlags = {
    monospace: 'm',
    script: 'c',
    fraktur: 'f',
    double: 'd',
    sans: 's',
    greek: 'g'
  }
  let modFlags = {
    bold: 'b',
    italic: 'i',
    underline: 'u',
    strike: 'k'
  }
  let flagAliases = {
    'doublestruck': 'double',
    'double-struck': 'double',
    'sansserif': 'sans',
    'sans-serif': 'sans'
  }

  const helpText = `---- Monotext Help ----
Converts text to a unicode variant

Usage:
    monotext [flags] [text]
Use with a pipe:
    cat file | monotext [flags]

Flags:
  Types:
    -monospace -m   Monospace text (default)
    -script    -c   Script (!)
    -fraktur   -f   Fraktur (!)
    -double    -d   Double-struck (!)
    -sans      -s   Sans-serif
    -greek     -g   Greek (characters might not yield their respective greek version)
                    This doesn't have a regular version!

    (!): Some characters do not exist in the regular version of this set (i.e. without bold/italic)

  Modifiers:
    -bold      -b   Bold
        Can be used with: script, fraktur, sans and greek
        Serif is used when no type is specified
    -italic    -i   Italic
        Can be used with: sans and greek
        Serif is used when no type is specified
    -underline -u   Underline
        Can be used with any
    -strike    -k   Strike-through
        Can be used with any
`;

@Injectable({
  providedIn: 'root'
})
export class MonotextService {
  
  convert(t: any, end: boolean): string {
    let result = ''
    for (let k of t) {
      let index
      let c = k
      if (special[type] && special[type].hasOwnProperty(c)) {
        const cc = special[type];
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const ccc = cc[c];
        c = String.fromCodePoint(ccc);
      }
      if (type && (index = chars.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + offsets[type][0])
      } else if (type && (index = numbers.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + offsets[type][1])
      } else {
        result += c
      }
      if (underline) result += '\u0332' // add combining underline
      if (strike) result += '\u0336' // add combining strike
    }
    return result;
  }
  
  mono(args: any[], text) {
    let output = '';
    type FlagType = 'doublestruck' | 'double-struck' | 'sansserif' | 'sans-serif';
    type FlagAlias = 'monospace' | 'script' | 'fraktur' | 'double' | 'sans' | 'greek';
    type ModFlag = 'bold' | 'italic' | 'underline' | 'strike';
    let flags: any = []
    let input: any[] = []
    let parseFlags = true
    for (let i in args) {
      if (args[i][0] === '-' && parseFlags) {
        let flag: FlagType = args[i].replace(/^-+/, '') as FlagType
        let flagChars = flag.split('').sort().join('')
        if (flag in flagAliases) {
          flag = flagAliases[flag] as FlagType
        } else if (flag in typeFlags) {
          flags.push(typeFlags[flag as FlagAlias])
        } else if (flag in modFlags) {
          flags.push(modFlags[flag as ModFlag])
        } else if (flag as any === 'help') {
          output = helpText;
          return output;
        } else {
          flags = flags.concat(flagChars.split(''))
        }
      } else {
        parseFlags = false
        input.push(args[i])
      }
    }
  
    // remove underline and strike
    if (flags.includes(modFlags.underline)) {
      flags.splice(flags.indexOf(modFlags.underline), 1)
      underline = true
    }
    if (flags.includes(modFlags.strike)) {
      flags.splice(flags.indexOf(modFlags.strike), 1)
      strike = true
    }
  
    type = flags.sort().join('')
    if (!offsets.hasOwnProperty(type) && !underline && !strike) {
      output = `No such combination: ${type}. Check help text below.`;
      return output;
    }
    if (!underline && !strike && !type) type = 'm'

    output = this.convert(text, true);
  
    return output;
  }
}
