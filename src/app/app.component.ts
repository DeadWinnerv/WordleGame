import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WORDS } from 'src/constants/WORDS';

type answer = {
  char: string,
  present: boolean
  onPosition?: boolean
} | undefined

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WordleGame';
  word: string;
  currentWord: string = '';
  answers: answer[][] = [[],[],[],[],[]]
  currentRow: number = 0;
  rows: number[] = [0,1,2,3,4]
  columns: number[] = [0,1,2,3,4]
  inputGroup = new FormGroup ({
    char: new FormControl('')
  })

  ngOnInit(): void {
    this.generateWord()
    console.log(this.word);
  }

  generateWord() {
    this.word = WORDS.at(Math.floor(Math.random() * WORDS.length))!
    console.log(Math.floor(Math.random() * WORDS.length));
  }

  checkWord() {
    if (this.currentWord !== this.word) {
      for (let i = 0; i < 5; i++) {
        
        if (this.word[i] === this.currentWord[i]) {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true,
            onPosition: true
          }
        } else if (this.word.includes(this.currentWord[i])) {
          
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true
          }
        } else {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: false
          }
        }
      }
    } else {
      
    }
    
    this.currentRow++
    this.currentWord = ''
  }

  handleInputChange() {
    this.currentWord = this.currentWord + this.inputGroup.value.char?.toLocaleLowerCase()
    if (this.currentWord.length >= 5) {
      this.checkWord()
    }
    
  }
}
