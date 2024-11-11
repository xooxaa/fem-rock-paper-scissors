import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
}
