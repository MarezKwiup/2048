import { ColorCodes,type TileValue } from "../game/utils"
interface CellProps{
    value:TileValue;
    merged?:boolean;
}
const Cell = ({value,merged=false}:CellProps)=>{
    const {background,text}=ColorCodes[value];

    return (
        <div className={`h-full rounded-md w-full flex items-center justify-center ${merged ? "merged" : ""} `} style={{backgroundColor:background,color:text}}>
            <span className="text-3xl">{value!==0&&value}</span>
        </div>
    )
}

export default Cell;