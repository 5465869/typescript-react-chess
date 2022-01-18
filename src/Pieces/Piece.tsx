import { Coordinate } from './Coordinate';
import { Pieces } from '../Enums/PieceEnum';
import { v4 as uuidv4 } from 'uuid';

export abstract class Piece { 
    pieceName: Pieces
    currentLocation: Coordinate;
    color: string;
    icon: any;
    uuid: string;

    constructor(icon: any, coordinate: Coordinate, color: string, pieceName : Pieces ){
        this.pieceName = pieceName;
        this.currentLocation = coordinate;
        this.color = color;
        this.icon = icon;
        this.uuid = uuidv4();

    }

    setCurrentLocation(newLocation: Coordinate){
        this.currentLocation = newLocation;
    }

    isSameTeam(piece: Piece): boolean {
        return this.color === piece.color;
    }

    abstract isValidMove( moveLocation: Coordinate): boolean;
}