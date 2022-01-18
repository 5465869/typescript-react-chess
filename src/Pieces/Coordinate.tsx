
export class Coordinate{
    x: number;
    y: number;

    constructor(x:number, y: number){
        this.x = x;
        this.y = y;
    }

    equals(coordinate: Coordinate): boolean {
        return (coordinate.x === this.x) && (coordinate.y === this.y);
    }
}