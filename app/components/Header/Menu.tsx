'use client'

interface MenuProps{
    onClick: () => void
    label: string
}
const Menu: React.FC<MenuProps> = ({onClick, label}) => {

    return(
        <span onClick={onClick} className={`  font-medium text-gray-400 hover:text-blue-400 active:text-blue-700 cursor-pointer`}>{label}</span>
    )
}

export default Menu