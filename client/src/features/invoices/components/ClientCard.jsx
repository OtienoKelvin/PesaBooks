import React from 'react'
import { Card, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const ClientCard = () => {
  return (
    <div>
      <Card className="pt-0 gap-3 rounded-sm">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className='font-semibold'>Client Details</h2>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon />
          </Button>  
        </div>
        <div className="flex items-center gap-4 px-4 pb-4">
          <Avatar size='lg'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        <Separator />
        <div className="p-4">
          <p className="text-sm text-muted-foreground font-semibold">
            31-40300, Nairobi, Kenya
          </p>
        </div>
        <CardFooter className="px-4">
          <Button variant="outline" className="w-full " size='lg'>Edit Client</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ClientCard
