import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";
import  { ChessPawn } from '@emotion-icons/fa-solid'
import { Pieces } from "../Enums/PieceEnum";

export class Pawn extends Piece{ 
   constructor(startLocation: Coordinate, color: string) {
      super(ChessPawn, startLocation, color, Pieces.PAWN);
   }

   isValidMove(moveLocation: Coordinate): boolean {
      if(this.color === 'white'){
         if(this.currentLocation.x === 6) {
            return ((moveLocation.x - this.currentLocation.x >= -2) && (moveLocation.y === this.currentLocation.y)) ||
            (((moveLocation.x - this.currentLocation.x === -1)) && (Math.abs(moveLocation.y - this.currentLocation.y) === 1));
         }

         return ((moveLocation.x - this.currentLocation.x === -1) && (moveLocation.y === this.currentLocation.y)) || 
         (((moveLocation.x - this.currentLocation.x === -1)) && (Math.abs(moveLocation.y - this.currentLocation.y) === 1));
      } else {
         if(this.currentLocation.x === 1) {
            return ((moveLocation.x - this.currentLocation.x <= 2) && (moveLocation.y === this.currentLocation.y)) || 
            (((moveLocation.x - this.currentLocation.x === 1)) && (Math.abs(moveLocation.y - this.currentLocation.y) === 1));
         }

         return ((moveLocation.x - this.currentLocation.x === 1) && (moveLocation.y === this.currentLocation.y)) || 
         (((moveLocation.x - this.currentLocation.x === 1)) && (Math.abs(moveLocation.y - this.currentLocation.y) === 1));
      }
   }
}
