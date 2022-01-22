import { useDrag } from 'react-dnd'
import { Teams } from '../Enums/Teams';
import { Piece } from "../Pieces/Piece";

interface PieceContainerProps {
   piece: (Piece | null);
   isWhitesTurn: boolean;
}

const PieceContainer = ({ piece, isWhitesTurn} : PieceContainerProps) => {
   const [{ isDragging, canDrag}, drag] = useDrag(() => ({
      type: 'piece',
      item: piece,
      canDrag: () => (isWhitesTurn && piece?.team === Teams.WHITE) || (!isWhitesTurn && piece?.team === Teams.BLACK),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag(),
      })
    }), [isWhitesTurn])

   const Icon = piece?.icon;

   const getCursor = () => {
      if(isDragging) return 'grabbing';
      if(!isDragging && canDrag) return 'grab';
      if(!canDrag) return 'default'
   }

   const style = { 
      opacity: isDragging ? .4 : 1,
      cursor: getCursor(),
   }

   return (
      <div 
         ref={drag}
         style={style}
      >
         {piece ? <Icon size={48} style={{color:piece.team === Teams.WHITE ? "#efdfbb" : 'black'}}/> : <></>}
      </div>
   );
}

export default PieceContainer