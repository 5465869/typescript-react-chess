import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";
import  { ChessQueen } from '@emotion-icons/fa-solid'
import { calculateAbsoluteSlope } from "../Utilities/ValidationUtilities";
import { Pieces } from "../Enums/PieceEnum";


export class Queen extends Piece { 
   constructor(coordinate: Coordinate, color: string) {
      super(ChessQueen, coordinate, color, Pieces.QUEEN);
   }
   
   isValidMove(moveLocation: Coordinate): boolean {
      return [1, Infinity, 0].includes(calculateAbsoluteSlope(moveLocation, this.currentLocation));
   }
}
