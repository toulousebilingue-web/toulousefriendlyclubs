
import Image from "next/image"
import Link from "next/link"
import { Users, Lock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Group } from "@/app/lib/mock-data"

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10 bg-card h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={group.photoURL}
            alt={group.title}
            fill
            className="object-cover"
            data-ai-hint="group community"
          />
          {group.isPrivate && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-black/60 text-white border-none backdrop-blur-sm gap-1">
                <Lock className="h-3 w-3" /> Privé
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-2">
          <h3 className="font-headline text-lg font-bold line-clamp-1 text-foreground">{group.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {group.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{group.memberCount} membres</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
            Voir le club
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
