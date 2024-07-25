import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 
import { UserRoundPlus,UserRoundMinus,
  CalendarPlus,
  CalendarCheck2 } from 'lucide-react'

 const iconMap={
  UserRoundPlus,
  UserRoundMinus,
  CalendarPlus,
  CalendarCheck2
 }


const DashboardCard = ({cardData=[]}) => {
  
 
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 ">
    {cardData.map((item, index) => {
      const IconComponent = iconMap[item.icon];
        return (
          <Card key={index} className={`shadow-sm ${item.bgColor} ${item.textColor} `} x-chunk="dashboard-01-chunk-0" >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#E5E7EB]">
                {item.Cardtitile}
              </CardTitle>
              {IconComponent && <IconComponent className="h-8 w-8 text-muted-foreground " color="#FBF6FE"/>}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold  `}>{item.Cardcontent}</div>
              <p className="text-xs  before:text-white text-[#E5E7EB]">
                {item.Cardsubtext}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardCard;
