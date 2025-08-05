import { ArrowRightIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>

          <CardDescription className="line-clamp-2 leading-relaxed"></CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>

          <span className="text-muted-foreground text-xs">
            Created by <span className="text-foreground font-medium"></span>
          </span>

          <Button variant="outline" size="xs" className="ml-auto">
            View <ArrowRightIcon className="ml-2 size-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
