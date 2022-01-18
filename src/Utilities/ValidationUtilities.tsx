import { Pieces } from '../Enums/PieceEnum';
import { Coordinate } from '../Pieces/Coordinate'
import { Piece } from '../Pieces/Piece';
import { cloneDeep } from 'lodash';

export const calculateSlope = (coordinate1: Coordinate, coordinate2: Coordinate): number => {
   const rise = coordinate2.y - coordinate1.y;
   const run = coordinate2.x - coordinate1.x;

   return rise/run;
}

export const calculateAbsoluteSlope = (coordinate1: Coordinate, coordinate2: Coordinate): number => {
   const rise = coordinate2.y - coordinate1.y;
   const run = coordinate2.x - coordinate1.x;

   return Math.abs(rise/run);
}

const createLineFunction = (coordinate1: Coordinate, coordinate2: Coordinate): Function => {
   const slope = calculateSlope(coordinate1, coordinate2);

   const b = coordinate1.y - (slope*coordinate1.x);

   return function(x: number) {
      const y = (slope * x) + b;
      return new Coordinate(x, y);
   }
}

export const getSubsetOfCoordinatesBetweenTwoPoints = (coordinate1: Coordinate, coordinate2: Coordinate): Array<Coordinate> => {
   const slope = calculateAbsoluteSlope(coordinate1, coordinate2);

   if(slope === Infinity) {
      return getSubsetOfPointsBetweenTwoPointsOnAVerticalLine(coordinate1, coordinate2);
   }

   return getSubsetOfPointsBetweenTwoPointsOnLinearFunction(coordinate1, coordinate2);
}

export const getSubsetOfPointsBetweenTwoPointsOnLinearFunction = (coordinate1: Coordinate, coordinate2: Coordinate): Array<Coordinate> => {
   let subset = [];

   const lineFunction = createLineFunction(coordinate1, coordinate2);

   const max = Math.max(coordinate1.x, coordinate2.x);

   const min = Math.min(coordinate1.x, coordinate2.x);

   for(let i = min + 1; i < max; i++){
      subset.push(lineFunction(i));
   }

   return subset;
}

export const getSubsetOfPointsBetweenTwoPointsOnAVerticalLine = (coordinate1: Coordinate, coordinate2: Coordinate): Array<Coordinate> => {
   let subset = []

   const x = coordinate1.x;

   const max = Math.max(coordinate1.y, coordinate2.y);

   const min = Math.min(coordinate1.y, coordinate2.y);

   for(let i = min+1; i<max; i++){
      subset.push(new Coordinate(x, i));
   }

   return subset;
}

export function isValidMove(
   moveLocation: Coordinate, 
   piece: Piece, 
   board: Array<Array<(Piece | null)>>,
){
   if(!piece.isValidMove(moveLocation)) return false;

   const contentsOfMoveSquare = getPieceAtLocation(moveLocation);

   if(pieceAtMoveLocationIsSameTeam(contentsOfMoveSquare, piece)) return false;
   if(shouldDisablePawnAttackMove(moveLocation, piece, contentsOfMoveSquare)) return false;
   if(shouldDisablePawnForwardMove(moveLocation, piece, contentsOfMoveSquare)) return false;
   if(pieceIsBlockingMove(moveLocation, piece)) return false;

   return true;

   function getPieceAtLocation(location: Coordinate): (Piece | null){
      return board[location.x][location.y];
   }
   
   function pieceAtMoveLocationIsSameTeam(contentsOfMoveSquare: Piece | null, piece: Piece): boolean {
      return contentsOfMoveSquare !== null && piece.isSameTeam(contentsOfMoveSquare as Piece);
   }

   function shouldDisablePawnForwardMove(moveLocation: Coordinate, piece: Piece, contentsOfMoveSquare: Piece | null): boolean {
      if(piece.pieceName !== Pieces.PAWN) return false;

      if((contentsOfMoveSquare !== null) && moveLocation.y === piece.currentLocation.y) return true;

      return false;
   }
   
   function shouldDisablePawnAttackMove(moveLocation: Coordinate, piece: Piece, contentsOfMoveSquare: Piece | null): boolean {
      if(piece.pieceName !== Pieces.PAWN) return false;
   
      return pawnCanAttack(moveLocation, piece, contentsOfMoveSquare);
   }
   
   function pawnCanAttack(moveLocation: Coordinate, piece: Piece, contentsOfMoveSquare: Piece | null): boolean {
      return (calculateAbsoluteSlope(moveLocation, piece.currentLocation) === 1 && contentsOfMoveSquare === null);
   }
   
   function pieceIsBlockingMove(moveLocation: Coordinate, piece: Piece): boolean {
      if(piece.pieceName === Pieces.KNIGHT) return false;
   
      return pieceExistsBetweenTwoPoints(piece.currentLocation, moveLocation);
   }
   
   function pieceExistsBetweenTwoPoints(currentLocation: Coordinate, moveLocation: Coordinate) : boolean {
      return getSubsetOfCoordinatesBetweenTwoPoints(currentLocation, moveLocation)
               .map(point => getPieceAtLocation(point))
                  .some(piece => piece !== null);      
   }
}

export function createCopyOfCurrentBoardAfterMove(moveLocation: Coordinate, piece: Piece, board: Array<Array<(Piece | null)>>): Array<Array<(Piece | null)>> {
   let boardCopy = [...board.map(row => [...row.map(piece => piece === null ? null : cloneDeep(piece))])];

   const pieceCopy = cloneDeep(piece);
   boardCopy[moveLocation.x][moveLocation.y] = pieceCopy;
   boardCopy[piece.currentLocation.x][piece.currentLocation.y] = null;
   pieceCopy.setCurrentLocation(moveLocation);

   return boardCopy;
}