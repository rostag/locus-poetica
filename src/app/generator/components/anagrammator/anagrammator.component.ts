import { Component } from '@angular/core';

@Component({
  selector: 'app-anagrammator',
  templateUrl: './anagrammator.component.html',
  styleUrls: ['./anagrammator.component.scss']
})

export class AnagrammatorComponent {

  public sourceWord = '';

  public anagrammate(event: any) {
    const word = event?.target?.value;
    console.log('word:', word);
    const reverse = word.split('').reverse().join('');
    console.log('reve:', reverse);


    function allanagrams(str = '') {

      if (str.length === 0) return [''];
      var result = {} as any;
      str.split('').forEach(function (char, i) {
        var remainingLetters = str.slice(0, i) + str.slice(i + 1);

        allanagrams(remainingLetters).forEach(
          function (anagram = '') {
            result[char + anagram] = true;
          });
      });
      return Object.keys(result);

    }


    const annagrams = allanagrams(word);
    console.log('annagrams:', annagrams);
  }
}
