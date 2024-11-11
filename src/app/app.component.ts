import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  playerChoice: string = '';
  computerChoice: string = '';
  result: string = '';
  isChoosing: boolean = true;

  constructor(private gameService: GameService) {}

  play(choice: string): void {
    this.playerChoice = choice;
    this.computerChoice = this.gameService.getComputerChoice();
    this.result = this.gameService.determineWinner(
      this.playerChoice,
      this.computerChoice
    );
    this.isChoosing = false;
  }

  resetGame(): void {
    this.playerChoice = '';
    this.computerChoice = '';
    this.result = '';
    this.isChoosing = true;
  }

  setGameMode(mode: 'RPS' | 'RPSLS'): void {
    this.gameService.setGameMode(mode);
  }

  getGameMode(): string {
    return this.gameService.gameMode();
  }

  getScore() {
    return this.gameService.getScore();
  }

  getImageSrc(choice: string): string {
    switch (choice) {
      case 'rock':
        return 'icon-rock.svg';
      case 'paper':
        return 'icon-paper.svg';
      case 'scissors':
        return 'icon-scissors.svg';
      case 'lizard':
        return 'icon-lizard.svg';
      case 'spock':
        return 'icon-spock.svg';
      default:
        return '';
    }
  }
}
