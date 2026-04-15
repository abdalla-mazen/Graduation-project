import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  image: string;
  href?: string;
};

export default function DashboardCard({ title, image, href = "/" }: DashboardCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <CardContent className="p-3">
          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          <h3 className="text-center text-lg font-semibold leading-snug">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
