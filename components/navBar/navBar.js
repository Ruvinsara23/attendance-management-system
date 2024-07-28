import Link from 'next/link';

import {
    Package2,
  } from "lucide-react"

// const NavBar = () => {
//     const navItems = [
//       { href: '/studentDashboard', label: 'Dashboard' },
//       { href: '/studentDashboard/qrcode', label: 'QRCode' },
//       { href: '/studentDashboard/appointment', label: 'Appointment' },
//       { href: '/studentDashboard/courses', label: 'Courses' },
//       { href: '/studentDashboard/profile', label: 'Profile' },
//     ];
  
//     return (
//       <nav className="flex-col flex  md:flex-row md:items-center md:gap-5 lg:gap-6 text-lg font-medium">
//         <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
//           <Package2 className="h-6 w-6" />
//           <span className="sr-only">Acme Inc</span>
//         </Link>
//         {navItems.map((item, index) => (
//           <Link key={index} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//     );
//   };
  
//   export default NavBar;

// const navLinks = [
//     { href: '/studentDashboard', text: 'Dashboard', className: '' },
//     { href: '/studentDashboard/qrcode', text: 'QRcode', className: 'text-muted-foreground' },
//     { href: '/studentDashboard/appointment', text: 'Appointment', className: 'text-muted-foreground' },
//     { href: '/studentDashboard/courses', text: 'Courses', className: 'text-muted-foreground' },
//     { href: '/studentDashboard/profile', text: 'Profile', className: 'text-muted-foreground' },
//   ];
  
  const NavBar = ({data}) => {
    
    return (
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {data.map((link, index) => {
          const IconComponent = link.icon;
            return(
          
          <Link
            key={index}
            href={link.href}
            className={`transition-colors hover:text-foreground ${link.className}`}
          ><div className='flex items-center m-4'>
          {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground mr-2" />}
            {link.text}
            </div>
            </Link>
          
    )})}
      </nav>
    );
  };
  
  export default NavBar;