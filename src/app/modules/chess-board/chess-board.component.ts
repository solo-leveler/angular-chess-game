import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-logic/chess-board';
import {
  CheckState,
  Color,
  Coords,
  FENChar,
  LastMove,
  pieceImagePaths,
  SafeSquares,
} from '../../chess-logic/model';
import { SelectedSqaure } from './model';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  public get playerColor(): Color {
    return this.chessBoard.playerColor;
  }
  public get safeSqaures(): SafeSquares {
    return this.chessBoard.safeSqaures;
  }

  private selectedSqaure: SelectedSqaure = { piece: null };
  private pieceSafeSqaures: Coords[] = [];
  private checkState: CheckState = this.chessBoard.checkState;
  private lastMove: LastMove | undefined = this.chessBoard.lastMove;

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public isSqaureSelected(x: number, y: number): boolean {
    if (!this.selectedSqaure.piece) return false;
    return this.selectedSqaure.x === x && this.selectedSqaure.y === y;
  }

  public isSqaureSafeForSelectedPiece(x: number, y: number): boolean {
    return this.pieceSafeSqaures.some(
      (coords) => coords.x === x && coords.y === y
    );
  }

  public isSquareLastMove(x: number, y: number): boolean {
    if (!this.lastMove) return false;
    const { prevX, prevY, currX, currY } = this.lastMove;
    return (x === prevX && y === prevY) || (x === currX && y === currY);
  }

  public isSqaureChecked(x: number, y: number) {
    return (
      this.checkState.isInCheck &&
      this.checkState.x === x &&
      this.checkState.y === y
    );
  }

  private unmarkingPreviouslySelectedAndSafeSqaures(): void {
    this.selectedSqaure = { piece: null };
    this.pieceSafeSqaures = [];
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;

    const isSameSqaureClicked: boolean =
      !!this.selectedSqaure.piece &&
      this.selectedSqaure.x === x &&
      this.selectedSqaure.y === y;
    this.unmarkingPreviouslySelectedAndSafeSqaures();
    if (isSameSqaureClicked) return;

    this.selectedSqaure = { piece, x, y };
    this.pieceSafeSqaures = this.safeSqaures.get(x + ',' + y) || [];
  }

  private isWrongPieceSelected(piece: FENChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return (
      (isWhitePieceSelected && this.playerColor === Color.Black) ||
      (!isWhitePieceSelected && this.playerColor === Color.White)
    );
  }

  private placingPiece(newX: number, newY: number): void {
    if (!this.selectedSqaure.piece) return;
    if (!this.isSqaureSafeForSelectedPiece(newX, newY)) return;
    const { x: prevX, y: prevY } = this.selectedSqaure;
    this.chessBoard.move(prevX, prevY, newX, newY);
    this.chessBoardView = this.chessBoard.chessBoardView;
    this.checkState = this.chessBoard.checkState;
    this.lastMove = this.chessBoard.lastMove;
    this.unmarkingPreviouslySelectedAndSafeSqaures();
  }

  public move(x: number, y: number): void {
    this.selectingPiece(x, y);
    this.placingPiece(x, y);
  }
}
