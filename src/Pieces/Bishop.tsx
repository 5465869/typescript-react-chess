import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";
import  { ChessBishop } from '@emotion-icons/fa-solid'
import { calculateSlope } from "../Utilities/ValidationUtilities";
import { Pieces } from "../Enums/PieceEnum";

export class Bishop extends Piece{ 

   constructor(coordinate: Coordinate, color: string) {
      super(ChessBishop, coordinate, color, Pieces.BISHOP);
   }
   
   isValidMove( moveLocation: Coordinate): boolean {
      return Math.abs(calculateSlope(moveLocation, this.currentLocation)) === 1;
   }
}
