import { useState } from "react";
import BoardContainer from "./BoardComponents/BoardContainer";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Coordinate } from "./Pieces/Coordinate";
import { Piece } from "./Pieces/Piece";
import { initializeBoard } from '../src/Utilities/GameSetupUtilities'
import { Pieces } from "./Enums/PieceEnum";
import { isValidMove, createCopyOfCurrentBoardAfterMove, getSubsetOfCoordinatesBetweenTwoPoints } from "./Utilities/ValidationUtilities";
import { Button, Container, Typography, Grid } from "@mui/material";
import ButtonAppBar from "./Views/ButtonAppBar";
import { v4 as uuidv4 } from 'uuid';

const Chess = (): JSX.Element => {
    const [board, setBoard] = useState(initializeBoard());
    const [isWhitesTurn, setIsWhitesTurn] = useState(true);
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckMate, setIsCheckMate] = useState(false);
    const [winningTeam, setWinningTeam] = useState('');
    const [teamInCheck, setTeamInCheck] = useState('');
    const [gameId, setGameId] = useState(uuidv4());

    function handleIsValidMove(moveLocation: Coordinate, piece: Piece){
        if (!isValidMove(moveLocation, piece, board)) return false;

        const boardWithMoveExecuted = createCopyOfCurrentBoardAfterMove(moveLocation, piece, board);
        
        if(checkIfIsCheck(piece.color, boardWithMoveExecuted)) return false;

        return true;
    }

    const handlePieceMove = (moveLocation: Coordinate, piece: Piece): void => {
        updatePieceLocation(moveLocation, piece);
        setIsWhitesTurn(prevState => !prevState);

        if(checkIfIsCheck(getOppositeColor(piece.color), board)) {
            if(checkIfIsCheckMate(getOppositeColor(piece.color))) {
                setIsCheckMate(true);
                setWinningTeam(piece.color);
            } 

            setTeamInCheck(getOppositeColor(piece.color))
            setIsCheck(true);
        } else {
            setIsCheck(false);
        }
        
    }

    function checkIfIsCheckMate(teamColorToCheck: string) : boolean {
        const piecesOfAttackingTeam = getPiecesFromBoardByTeam(getOppositeColor(teamColorToCheck), board);
        const piecesOfTeamInCheck = getPiecesFromBoardByTeam(teamColorToCheck, board);

        const checkedKing = getKingFromBoardByTeam(teamColorToCheck, board);
        const locationOfCheckedKing = checkedKing?.currentLocation as Coordinate

        const attackers = piecesOfAttackingTeam.filter(piece => isValidMove(locationOfCheckedKing, piece as Piece, board));

        return !checkedTeamCanBlockOrKillAttacker(attackers, locationOfCheckedKing, piecesOfTeamInCheck) && !kingCanEscape(checkedKing as Piece);
    }

    function checkedTeamCanBlockOrKillAttacker(attackers: (Piece | null)[], locationOfKing: Coordinate, piecesOfTeamInCheck: (Piece | null)[]) : boolean {
        if(attackers.length === 1) {
            const attackersLocation = attackers[0]?.currentLocation as Coordinate;
            
            return piecesOfTeamInCheck
                .some(piece => getSubsetOfCoordinatesBetweenTwoPoints(attackersLocation, locationOfKing).concat(attackersLocation)
                    .some(location => handleIsValidMove(location, piece as Piece)));
        }

        return false;
    }

    function kingCanEscape(checkedKing: Piece) : boolean {
        return locationsOnBoardAroundKing(checkedKing.currentLocation).some(location => handleIsValidMove(location, checkedKing));
    }

    function locationsOnBoardAroundKing(locationOfCheckedKing: Coordinate): Coordinate[] {        
        return getLocationOfKingsPeremiter(locationOfCheckedKing).filter(location => location.x <= 7 && location.x >=0 && location.y <= 7 && location.y >= 0);
    }

    function getLocationOfKingsPeremiter(locationOfCheckedKing: Coordinate) {
        let spacesToCheck = [];
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x + 1), locationOfCheckedKing.y));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x + 1), (locationOfCheckedKing.y - 1)));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x + 1), (locationOfCheckedKing.y + 1)));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x - 1), locationOfCheckedKing.y));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x - 1), (locationOfCheckedKing.y - 1)));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x - 1), (locationOfCheckedKing.y + 1)));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x), (locationOfCheckedKing.y + 1)));
        spacesToCheck.push(new Coordinate((locationOfCheckedKing.x), (locationOfCheckedKing.y - 1)));

        return spacesToCheck;
    }

    function checkIfIsCheck(color: string, boardToCheck: Array<Array<(Piece | null)>>) {
        const locationOfWhiteKing = getLocationOfKingByTeam(color, boardToCheck);

        return locationOfKingIsValidMoveForOpposingTeam(color, boardToCheck, locationOfWhiteKing);
    }

    function locationOfKingIsValidMoveForOpposingTeam(color: string, boardToCheck: (Piece | null)[][], locationOfWhiteKing: Coordinate | undefined) {
        return getPiecesFromBoardByTeam(getOppositeColor(color), boardToCheck)
            .some(piece => isValidMove(locationOfWhiteKing as Coordinate, piece as Piece, boardToCheck));
    }

    function getOppositeColor(color: string): string {
        return color === 'white' ? 'black' : 'white';
    }

    function getPiecesFromBoardByTeam(teamColor: string, boardToCheck: (Piece | null)[][]) {
        return boardToCheck.flat().filter(piece => piece?.color === teamColor);
    }

    function getLocationOfKingByTeam(teamColor: string, boardToCheck: Array<Array<(Piece | null)>>) {
        return boardToCheck.flat().find(piece => piece?.color === teamColor && piece.pieceName === Pieces.KING)?.currentLocation;
    }

    function getKingFromBoardByTeam(teamColor: string, boardToCheck: Array<Array<(Piece | null)>>) {
        return boardToCheck.flat().find(piece => piece?.color === teamColor && piece.pieceName === Pieces.KING);
    }

    function updatePieceLocation(moveLocation: Coordinate, piece: Piece) {
        board[moveLocation.x][moveLocation.y] = piece;
        board[piece.currentLocation.x][piece.currentLocation.y] = null;
        setBoard([...board]);

        piece.setCurrentLocation(moveLocation);
    }

    const getHeaderText = () => {
        if(isCheckMate) {
            return `${winningTeam} Won! Click the button to play again!`;
        }

        if(isCheck) return `${teamInCheck} is in check`;

        return isWhitesTurn ? "White's turn" : "Black's turn"
    }

    const handleNewGameClick = () => {
        setBoard(initializeBoard());
        setIsWhitesTurn(true);
        setIsCheck(false);
        setIsCheckMate(false);
        setWinningTeam('');
        setTeamInCheck('');
        setGameId(uuidv4());
    }

    console.log(board);

    return (
        <>
            <ButtonAppBar/>
            <Container >
                <Grid container justifyContent="center">
                    <Typography variant="h4" style={{marginTop:'5px', marginLeft:'5px'}}>
                        {getHeaderText()}
                    </Typography>
                </Grid>
                <div style={{marginTop:'10px'}}>
                    <DndProvider backend={HTML5Backend}>
                        <BoardContainer gameId={gameId} board={board} handlePieceMove={handlePieceMove} isValidMove={handleIsValidMove} isWhitesTurn={isWhitesTurn}/>
                    </DndProvider>
                </div>
                <Grid container justifyContent="center" style={{marginTop:'10px'}}>
                    <Button variant="contained" style={{backgroundColor:'green'}} onClick={handleNewGameClick}>
                        Start New Game
                    </Button>      
                </Grid>
            </Container>
        </>

    )
}

export default Chess