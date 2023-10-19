import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types"
import { AvatarProps } from "@radix-ui/react-avatar"
import { Icons } from "@/components/Icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "avatar" | "username">
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatar ? (
        <AvatarImage alt="Avatar" src={user.avatar} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.username}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
