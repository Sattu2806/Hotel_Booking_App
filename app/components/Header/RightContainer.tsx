'use client'
interface LeftContainerProps {
    children: React.ReactNode
}

const RightContainer:React.FC<LeftContainerProps> = ({
    children
}) => {
    return(
        <div>
            {children}
        </div>
    )
}

export default RightContainer