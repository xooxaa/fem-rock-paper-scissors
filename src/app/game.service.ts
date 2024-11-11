import { Injectable, signal } from '@angular/core';
import { GameResult } from './game-results.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private choicesRPS = ['rock', 'paper', 'scissors'];
  private choicesRPSLS = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  wins = signal(0);
  losses = signal(0);
  draws = signal(0);
  gameMode = signal<'RPS' | 'RPSLS'>('RPS');

  getComputerChoice(): string {
    const choices =
      this.gameMode() === 'RPSLS' ? this.choicesRPSLS : this.choicesRPS;
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  determineWinner(playerChoice: string, computerChoice: string): string {
    if (playerChoice === computerChoice) {
      this.draws.set(this.draws() + 1);
      return GameResult.Draw;
    }

    if (this.gameMode() === 'RPS') {
      if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
      ) {
        this.wins.set(this.wins() + 1);
        return GameResult.Win;
      }
      this.losses.set(this.losses() + 1);
      return GameResult.Loss;
    } else {
      if (
        (playerChoice === 'rock' &&
          (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (playerChoice === 'paper' &&
          (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (playerChoice === 'scissors' &&
          (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (playerChoice === 'lizard' &&
          (computerChoice === 'spock' || computerChoice === 'paper')) ||
        (playerChoice === 'spock' &&
          (computerChoice === 'scissors' || computerChoice === 'rock'))
      ) {
        this.wins.set(this.wins() + 1);
        return GameResult.Win;
      }
      this.losses.set(this.losses() + 1);
      return GameResult.Loss;
    }
  }

  setGameMode(mode: 'RPS' | 'RPSLS'): void {
    this.gameMode.set(mode);
  }

  getGameMode(): 'RPS' | 'RPSLS' {
    return this.gameMode();
  }

  resetGame(): void {
    this.wins.set(0);
    this.losses.set(0);
    this.draws.set(0);
  }

  getScore(): { wins: number; losses: number; draws: number } {
    return { wins: this.wins(), losses: this.losses(), draws: this.draws() };
  }
}
