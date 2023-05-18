'use client'
interface LeftContainerProps {
    children: React.ReactNode
}

const LeftContainer:React.FC<LeftContainerProps> = ({
    children
}) => {
    return(
        <div>
            {children}
        </div>
    )
}

export default LeftContainer