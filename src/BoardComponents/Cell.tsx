import { useDrop } from 'react-dnd'
import { Coordinate } from '../Pieces/Coordinate';
import { Piece } from '../Pieces/Piece';

interface CellProps {
    x: number;
    y: number;
    handlePieceMove: Function;
    isValidMove: Function;
    children?: JSX.Element;
}

const greenSquare = {
    backgroundColor: '#779556',
    height:'85px',
    width:'85px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
};

const offWhiteSquare = {
    backgroundColor: '#f8f8ff',
    height:'85px',
    width:'85px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}

const baseSquareStyle = {
    height:'85px',
    width:'85px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}

const neonRed = {
    backgroundColor: '#f51414'
};

const neonYellow = {
    backgroundColor: '#edf514'
}

const neonGreen = {
    backgroundColor: '#5ceb23'
}

const Cell = ({x, y, children, isValidMove, handlePieceMove} : CellProps) => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
          accept: 'piece',
          drop: (piece) => handlePieceMove(new Coordinate(x,y), piece),
          canDrop: (piece : Piece) => isValidMove(new Coordinate(x, y), piece),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
          })
        }),
        [x, y]
    );

    const getSquareStyle = () => {
        if(isOver && !canDrop) {
            return {...baseSquareStyle, ...neonRed};
        }

        if(!isOver && canDrop) {
            return {...baseSquareStyle, ...neonYellow}
        }

        if(isOver && canDrop) {
            return {...baseSquareStyle, ...neonGreen}
        }

        return (x+y) % 2 === 1 ? greenSquare : offWhiteSquare
    }
    
    return (    
        <div ref={drop} style={getSquareStyle()} >
            {children}
        </div>
    )
}

export default Cell;