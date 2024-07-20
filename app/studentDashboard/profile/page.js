import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ArrowUpRight,
  
} from "lucide-react"
import Link from "next/link"

import Userprofile from '@/components/userProfileCard/userprofile';
import UserDetails from "@/components/userProfileCard/userDetails";
import Profile from "@/components/profile/profile";






const StdProfilePage = () => {
  

    return (
    <div className='flex min-h-screen w-full border-none '>
    <main className="flex flex-1  flex-wrap gap-10  md:gap-8 md:p-8 justify-center align-middle">
  
  
     <Profile />

    
        
        </main>
    </div>
    );
  };
  
  export default StdProfilePage;
  

  // <Card className="max-w-[620px]">
  //   // <CardHeader className="flex flex-row items-center">
  //   //         <div className="grid gap-4">
  //   //           <CardTitle>Edit your profile</CardTitle>
  //   //           <CardDescription>
  //   //            You can update  your  profile.
  //   //           </CardDescription>
  //   //         </div>
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //       <Userprofile />
  //   //       </CardContent>
  //   //     </Card>