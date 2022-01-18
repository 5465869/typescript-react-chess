import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";
import  { ChessKnight } from '@emotion-icons/fa-solid'
import { calculateAbsoluteSlope } from "../Utilities/ValidationUtilities";
import { Pieces } from "../Enums/PieceEnum";

export class Knight extends Piece{ 

    constructor(coordinate: Coordinate, color: string) {
        super(ChessKnight, coordinate, color, Pieces.KNIGHT);
    }

    isValidMove( moveLocation: Coordinate): boolean {
        return [2, 0.5].includes(calculateAbsoluteSlope(moveLocation, this.currentLocation)) &&
            (Math.abs(moveLocation.x - this.currentLocation.x) <= 2) &&
            (Math.abs(moveLocation.y - this.currentLocation.y) <= 2);
     }
}