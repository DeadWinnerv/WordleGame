import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { WORDS } from 'src/constants/WORDS';

type answer =
  | {
      char: string;
      present: boolean;
      onPosition?: boolean;
    }
  | undefined;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'WordleGame';
  word: string;
  currentWord: string = '';
  answers: answer[][] = [[], [], [], [], []];
  currentRow: number = 0;
  currentCol: number = 0;
  rows: number[] = [0, 1, 2, 3, 4];
  columns: number[] = [0, 1, 2, 3, 4];
  chars: string[] = [];
  isWrong: boolean = false;
  inputs: ElementRef[];
  gameOver?: boolean = false;
  timer: number;
  record: number;

  ngOnInit(): void {
    this.generateWord();
    console.log(this.word);
  }

  @ViewChildren('input') inputList: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.inputs = this.inputList.toArray();
    this.inputs[0].nativeElement.focus();
    this.inputList.changes.subscribe((changes) => {
      this.inputs = changes.toArray();
      this.inputs[0].nativeElement.focus();
    });
  }

  generateWord() {
    this.word = WORDS.at(Math.floor(Math.random() * WORDS.length))!;
    console.log(Math.floor(Math.random() * WORDS.length));
  }

  checkWord() {
    if (this.currentWord !== this.word) {
      for (let i = 0; i < 5; i++) {
        if (this.word[i] === this.currentWord[i]) {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true,
            onPosition: true,
          };
        } else if (this.word.includes(this.currentWord[i])) {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true,
          };
        } else {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: false,
          };
        }
      }
    } else {
      this.gameOver = true;
      this.answers[this.currentRow] = [
        { char: this.currentWord[0], present: true, onPosition: true },
        { char: this.currentWord[1], present: true, onPosition: true },
        { char: this.currentWord[2], present: true, onPosition: true },
        { char: this.currentWord[3], present: true, onPosition: true },
        { char: this.currentWord[4], present: true, onPosition: true },
      ];
    }

    this.currentRow++;
    this.chars = [];
    this.currentRow >= 5 ? this.gameOver = true : null
  }

  handleInputChange(event: Event) {
    this.currentWord = this.chars.toString().replaceAll(',', '').toLowerCase();
    this.currentCol = this.chars.length;
    this.currentCol !== 5
      ? (this.currentCol = this.chars.length)
      : (this.currentCol = 0);
    this.inputs[this.currentCol].nativeElement.focus();
    if (this.currentWord.length === 5) {
      if (WORDS.includes(this.currentWord)) {
        this.checkWord();
      } else {
      this.isWrong = true
        setTimeout( () => {
          this.isWrong = false
          this.chars = []
        }, 400)
      }
    }
  }
  handleBackspace(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.currentWord = this.currentWord.slice(0, -1);
      this.chars.pop();
      this.currentCol = this.currentWord.length;
      this.inputs[this.currentCol].nativeElement.value = '';
      this.inputs[this.currentCol].nativeElement.focus();
    }
  }

  retry() {
    this.generateWord();
    this.currentWord = '';
    this.answers = [[], [], [], [], []];
    this.currentRow = 0;
    this.currentCol = 0;
    this.rows = [0, 1, 2, 3, 4];
    this.columns = [0, 1, 2, 3, 4];
    this.chars = [];
    this.isWrong = false;
    this.gameOver = false;
  }
}
