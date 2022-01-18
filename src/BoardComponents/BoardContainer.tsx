import Row from "./Row";
import { Piece } from "../Pieces/Piece";

interface BoardProps {
    board: Array<Array<(Piece | null)>>;
    isValidMove: Function;
    handlePieceMove: Function;
    isWhitesTurn: boolean;
    gameId: string;
}

const BoardContainer = ({ board, isValidMove, handlePieceMove, isWhitesTurn, gameId } : BoardProps) => {
    return (
        <>
            {
                board.map((row, index) => 
                    <Row 
                        row={row} 
                        key={`${index}-${gameId}`}
                        rowIndex={index}
                        isValidMove={isValidMove}
                        handlePieceMove={handlePieceMove}
                        isWhitesTurn={isWhitesTurn}
                    />
                )
            }
        </>
    )
};

export default BoardContainer;