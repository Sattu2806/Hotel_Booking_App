'use client'
import Image from "next/image";

interface AvatarProps{
  src: string | null | undefined
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
    <Image 
      className="rounded-full" 
      height="24" 
      width="24" 
      alt="Avatar" 
      src={ src || '/placeholder.jpg'}
    />
  );
};
 
export default Avatar;