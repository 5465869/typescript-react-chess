import Cell from "./Cell";
import { Grid } from "@mui/material";
import PieceContainer from "../BoardComponents/PieceContainer"
import { Piece } from "../Pieces/Piece";

interface RowProps {
    row: (Piece | null)[];
    rowIndex: number;
    isValidMove: Function;
    handlePieceMove: Function;
    isWhitesTurn: boolean;
}

const Row = ({ row, rowIndex, handlePieceMove, isValidMove, isWhitesTurn } : RowProps) => {
    return (
        <Grid container justifyContent='center'>
            {
                row.map((piece, index) => {
                    return (
                        <Cell 
                            x={rowIndex}
                            y={index} 
                            key={`${index}-${piece?.uuid}`}
                            isValidMove={isValidMove}
                            handlePieceMove={handlePieceMove}
                        >
                            {piece ? <PieceContainer isWhitesTurn={isWhitesTurn} key={piece?.uuid} piece={piece}/> : <></>}
                        </Cell>
                    )
                })
            }
        </Grid>
    )
};

export default Row;