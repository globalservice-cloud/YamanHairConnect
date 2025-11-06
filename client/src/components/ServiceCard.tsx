import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ServiceCard({ title, description, price, image }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        <p className="text-primary font-semibold">{price}</p>
      </CardContent>
    </Card>
  );
}
