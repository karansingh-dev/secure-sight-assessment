import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav
      id="navigation"
      className="flex  justify-between items-center border-b border-[#181817] px-[24px] pt-[12px] pb-[16px] h-[76px] "
    >
      {/* Logo Section */}
      <div id="logoContainer" className="flex gap-2 items-center">
        <div id="iconContainer">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3.8147e-06V17.0354L3.39379 20.6916V6.44583L10.0998 10.6709L16.9688 6.44583V20.6916L20.3897 17.0354V3.8147e-06L10.0998 6.44583L0 3.8147e-06Z"
              fill="white"
            />
          </svg>
          <div className="absolute left-[29px] top-[34px]">
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.293922 0.0750275V12.75L3.30761 16L3.47052 5.73538L5.15384 6.79168L6.91859 5.73538V16L10.0137 12.75V0.0750275L5.15384 3.13539L0.293922 0.0750275Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <span className="font-normal text-[16px] text-white font-['Plus Jakarta Sans']">
          MANDLACX
        </span>
      </div>

      {/* Menu Buttons */}
      <div id="buttonGroup" className="z-10   flex gap-8 ">
        <div
          className="
    relative
    w-[108px] 
    h-[725px] 
     left-[50%] 
    top-[-68px]
    bg-[rgba(208,167,4,0.35)]
    blur-[100px]
    [transform:matrix(0,-1,-1,0,0,0)]
    pointer-events-none
    -z-10

  "
        ></div>
        <Link href="/dashboard" className="flex items-center gap-1">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.86152 0V4H12.1949V0M6.86152 12H12.1949V5.33333H6.86152M0.194855 12H5.52819V8H0.194855M0.194855 6.66667H5.52819V0H0.194855V6.66667Z"
              fill="#FFCC00"
            />
          </svg>
          <span className="text-white text-[16px] font-medium">Dashboard</span>
        </Link>
        <Link href="/cameras" className="flex items-center gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6068 3.97467L3.46347 0.39C3.38286 0.35438 3.29598 0.335097 3.20787 0.333266C3.11976 0.331435 3.03216 0.347093 2.95014 0.379334C2.86818 0.411723 2.79346 0.460039 2.73029 0.521488C2.66713 0.582937 2.61677 0.6563 2.58214 0.737334L0.582137 5.404C0.512492 5.56649 0.51024 5.74999 0.575876 5.91414C0.641511 6.0783 0.76966 6.20966 0.932137 6.27933L5.57014 8.26667L4.74347 10.3333H1.86147V8.33333H0.528137V13.6667H1.86147V11.6667H4.74347C5.29214 11.6667 5.77814 11.3373 5.9808 10.828L6.79547 8.792L9.0748 9.76867C9.23656 9.83818 9.41925 9.84088 9.583 9.77618C9.74674 9.71148 9.87825 9.58464 9.9488 9.42333L11.9488 4.852C12.0196 4.69028 12.0233 4.5071 11.9592 4.34263C11.8951 4.17816 11.7683 4.04583 11.6068 3.97467ZM12.4815 9.91467L11.2428 9.42L12.5748 6.08667L13.8135 6.58067L12.4815 9.91467Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-[16px] font-medium">Cameras</span>
        </Link>
        <Link href="/scenes" className="flex items-center gap-1">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.52816 9.33333H6.86149L7.06149 8.33333C7.19482 8.27778 7.31994 8.21956 7.43682 8.15867C7.55371 8.09778 7.67305 8.02267 7.79482 7.93333L8.76149 8.23333L9.42816 7.1L8.66149 6.43333C8.68371 6.27778 8.69482 6.13333 8.69482 6C8.69482 5.86667 8.68371 5.72222 8.66149 5.56667L9.42816 4.9L8.76149 3.76667L7.79482 4.06667C7.6726 3.97778 7.55327 3.90267 7.43682 3.84133C7.32038 3.78 7.19527 3.72178 7.06149 3.66667L6.86149 2.66667H5.52816L5.32816 3.66667C5.19482 3.72222 5.06994 3.78067 4.95349 3.842C4.83705 3.90333 4.71749 3.97822 4.59482 4.06667L3.62816 3.76667L2.96149 4.9L3.72816 5.56667C3.70594 5.72222 3.69482 5.86667 3.69482 6C3.69482 6.13333 3.70594 6.27778 3.72816 6.43333L2.96149 7.1L3.62816 8.23333L4.59482 7.93333C4.71705 8.02222 4.8366 8.09733 4.95349 8.15867C5.07038 8.22 5.19527 8.27822 5.32816 8.33333L5.52816 9.33333ZM6.19482 7.33333C5.82816 7.33333 5.51438 7.20289 5.25349 6.942C4.9926 6.68111 4.86194 6.36711 4.86149 6C4.86105 5.63289 4.99171 5.31911 5.25349 5.05867C5.51527 4.79822 5.82905 4.66756 6.19482 4.66667C6.5606 4.66578 6.8746 4.79644 7.13682 5.05867C7.39905 5.32089 7.52949 5.63467 7.52816 6C7.52682 6.36533 7.39638 6.67933 7.13682 6.942C6.87727 7.20467 6.56327 7.33511 6.19482 7.33333ZM1.52816 12C1.16149 12 0.847713 11.8696 0.586824 11.6087C0.325935 11.3478 0.195269 11.0338 0.194824 10.6667V1.33333C0.194824 0.966667 0.325491 0.652889 0.586824 0.392C0.848158 0.131111 1.16194 0.000444444 1.52816 0H10.8615C11.2282 0 11.5422 0.130667 11.8035 0.392C12.0648 0.653333 12.1953 0.967111 12.1948 1.33333V10.6667C12.1948 11.0333 12.0644 11.3473 11.8035 11.6087C11.5426 11.87 11.2286 12.0004 10.8615 12H1.52816Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-[16px] font-medium">Scenes</span>
        </Link>
        <Link href="/incidents" className="flex items-center gap-1">
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.77214 0.999999L14.1228 12C14.1813 12.1013 14.2121 12.2163 14.2121 12.3333C14.2121 12.4504 14.1813 12.5653 14.1228 12.6667C14.0643 12.768 13.9801 12.8522 13.8788 12.9107C13.7775 12.9692 13.6625 13 13.5455 13H0.84414C0.727117 13 0.612156 12.9692 0.510813 12.9107C0.409469 12.8522 0.325313 12.768 0.266802 12.6667C0.208292 12.5653 0.177489 12.4504 0.17749 12.3333C0.177491 12.2163 0.208295 12.1013 0.266807 12L6.61747 0.999999C6.67599 0.89866 6.76015 0.814509 6.86149 0.756002C6.96283 0.697496 7.07779 0.666695 7.19481 0.666695C7.31183 0.666695 7.42678 0.697496 7.52813 0.756002C7.62947 0.814509 7.71363 0.89866 7.77214 0.999999ZM6.52814 9.66667V11H7.86147V9.66667H6.52814ZM6.52814 5V8.33333H7.86147V5H6.52814Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-[16px] font-medium">Incidents</span>
        </Link>
        <Link href="/users" className="flex items-center gap-1">
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.86147 9.33333V10.6667H0.528137V9.33333C0.528137 9.33333 0.528137 6.66667 5.1948 6.66667C9.86147 6.66667 9.86147 9.33333 9.86147 9.33333ZM7.52814 3C7.52814 2.53851 7.39129 2.08738 7.1349 1.70367C6.87851 1.31995 6.51409 1.02088 6.08773 0.84428C5.66137 0.667676 5.19222 0.621468 4.73959 0.7115C4.28697 0.801532 3.87121 1.02376 3.54489 1.35008C3.21857 1.67641 2.99634 2.09217 2.90631 2.54479C2.81627 2.99741 2.86248 3.46657 3.03909 3.89293C3.21569 4.31929 3.51476 4.68371 3.89847 4.94009C4.28219 5.19649 4.73331 5.33333 5.1948 5.33333C5.81364 5.33333 6.40714 5.0875 6.84472 4.64991C7.2823 4.21233 7.52814 3.61884 7.52814 3ZM9.82147 6.66667C10.2313 6.98383 10.5667 7.38695 10.8039 7.84767C11.0412 8.30839 11.1746 8.8155 11.1948 9.33333V10.6667H13.8615V9.33333C13.8615 9.33333 13.8615 6.91333 9.82147 6.66667ZM9.1948 0.666666C8.73599 0.664532 8.28733 0.801687 7.90814 1.06C8.3131 1.62582 8.53084 2.30419 8.53084 3C8.53084 3.69581 8.3131 4.37417 7.90814 4.94C8.28733 5.19831 8.73599 5.33547 9.1948 5.33333C9.81364 5.33333 10.4071 5.0875 10.8447 4.64991C11.2823 4.21233 11.5281 3.61884 11.5281 3C11.5281 2.38116 11.2823 1.78767 10.8447 1.35008C10.4071 0.912499 9.81364 0.666666 9.1948 0.666666Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-[16px] font-medium">Users</span>
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="
      flex items-center gap-2
      border-none bg-[#151515] hover:bg-[#151515] focus:bg-[#151515]
      text-white hover:text-white focus:text-white
      px-2 py-0 transition-colors
    "
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/user/user.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col pl-1 text-left leading-tight">
                <span className="font-medium">Mohammed ahjas</span>
                <span className="text-[13px] text-white/70">
                  ahjas@mandlacx.com
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#151515] text-white">
            <DropdownMenuItem
              className="hover:bg-[#222222] 
  hover:text-[#FFCC00] 
  focus:bg-[#222222]
  focus:text-[#FFCC00]
  transition-colors"
            >
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-[#222222]
  hover:text-[#FFCC00] 
  focus:bg-[#222222]
  focus:text-[#FFCC00]
  transition-colors"
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-[#222222]  
  hover:text-[#FFCC00] 
  focus:bg-[#222222]
  focus:text-[#FFCC00]
  transition-colors"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
