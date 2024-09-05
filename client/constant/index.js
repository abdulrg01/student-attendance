import { GraduationCap, Hand, HomeIcon } from "lucide-react";

export const navLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: HomeIcon,
  },
  {
    label: "Students",
    route: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    label: "Attendance",
    route: "/dashboard/attendance",
    icon: Hand,
  },
];
