import { Add } from '@mui/icons-material'
import Button from './Button'

function TableTopHeader({ buttonText, buttonAction, can, heading }) {
    return (
        <div className="flex w-full items-center ">
            <h2 className="text-lg font-medium mr-auto">{heading}</h2>
            <div className="">
                {can && (
                    <Button
                        onClick={buttonAction}
                        className=" px-4 py-2 rounded-sm text-white font-semibold tracking-wide cursor-pointer">
                        <Add /> {buttonText}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default TableTopHeader
