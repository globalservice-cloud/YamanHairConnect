import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StylistCardProps {
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

export default function StylistCard({ name, specialty, experience, image }: StylistCardProps) {
  return (
    <Card className="text-center hover-elevate">
      <CardContent className="p-6">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={image} alt={name} className="object-cover" />
          <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-serif font-semibold mb-2">{name}</h3>
        <p className="text-primary text-sm font-medium mb-2">{specialty}</p>
        <p className="text-muted-foreground text-sm">{experience}</p>
      </CardContent>
    </Card>
  );
}
