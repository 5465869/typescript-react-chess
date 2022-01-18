import { Bishop } from "../Pieces/Bishop";
import { Coordinate } from "../Pieces/Coordinate";
import { King } from "../Pieces/King";
import { Knight } from "../Pieces/Knight";
import { Pawn } from "../Pieces/Pawn";
import { Piece } from "../Pieces/Piece";
import { Queen } from "../Pieces/Queen";
import { Rook } from "../Pieces/Rook";

const createPawn = (columnIndex: number, color: string) : Pawn => {
   let rowIndex = color === 'white' ? 6 : 1;
   return new Pawn(new Coordinate(rowIndex, columnIndex), color);
}

const createPawnRow = (color: string) : Array<Piece> => {
   let row = [];

   for(let i = 0; i<8; i++){
       row.push(createPawn(i, color));
   }

   return row;
}

export const createRoyalRow = (color: string) : Array<Piece> => {
   let row = [];
   let rowIndex = color === 'white' ? 7 : 0;

   row.push(new Rook(new Coordinate(rowIndex, 0), color));
   row.push(new Knight(new Coordinate(rowIndex, 1), color));
   row.push(new Bishop(new Coordinate(rowIndex, 2), color));
   row.push(new Queen(new Coordinate(rowIndex, 3), color));
   row.push(new King(new Coordinate(rowIndex, 4), color));
   row.push(new Bishop(new Coordinate(rowIndex, 5), color));
   row.push(new Knight(new Coordinate(rowIndex, 6), color));
   row.push(new Rook(new Coordinate(rowIndex, 7), color));

   return row;
}

const getNullRow = () => {
   return [null, null, null, null, null, null, null, null];
}

export const initializeBoard = () : Array<Array<(Piece | null)>> => {
   let board = Array<Array<(Piece | null)>>();

   board = [
      createRoyalRow('black'),
      createPawnRow('black'),
      getNullRow(),
      getNullRow(),
      getNullRow(),
      getNullRow(),
      createPawnRow('white'),
      createRoyalRow('white'),
   ]

   return board;
}