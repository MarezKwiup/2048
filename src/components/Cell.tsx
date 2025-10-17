import { ColorCodes,type TileValue } from "../game/utils"
interface CellProps{
    value:TileValue;
}
const Cell = ({value}:CellProps)=>{
    const {background,text}=ColorCodes[value];

    return (
        <div className="h-full rounded-md w-full flex items-center justify-center" style={{backgroundColor:background,color:text}}>
            {value!==0&&value}
        </div>
    )
}

export default Cell;