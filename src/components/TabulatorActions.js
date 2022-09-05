export function ActionCol(props) {
    const cellData = props.cell._cell.row.data
    return props.can ? (
        <button
            title={props.title}
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                props.handleClick(cellData.id)
            }}
            type="button"
            className="text-gray-600 hover:text-theme-1 text-sm flex rounded-sm items-center button--sm ">
            <span className="w-5 h-5 mr-1">{props.icon}</span>
        </button>
    ) : null
}
