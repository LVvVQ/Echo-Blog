import { IconType } from "react-icons"
import { FiMoon, FiSun, FiUser, FiChevronLeft } from "react-icons/fi"
import { GiDragonHead } from "react-icons/gi"
import { ImGithub, ImSpinner2 } from "react-icons/im"
import { LuLaptop2, LuArrowRight, LuFileText, LuCreditCard, LuSettings, LuPlus, LuMoreVertical, LuTrash, LuAlertTriangle } from "react-icons/lu"
import { MdClose } from "react-icons/md"

export type Icon = IconType

export const Icons = {
  logo: GiDragonHead,
  close: MdClose,
  spinner: ImSpinner2,
  chevronLeft: FiChevronLeft,
  user: FiUser,
  sun: FiSun,
  moon: FiMoon,
  laptop: LuLaptop2,
  github: ImGithub,
  arrowRight: LuArrowRight,
  post: LuFileText,
  billing: LuCreditCard,
  settings: LuSettings,
  add: LuPlus,
  ellipsis: LuMoreVertical,
  trash: LuTrash,
  warning: LuAlertTriangle
}
