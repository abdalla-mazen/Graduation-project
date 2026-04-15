import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AddCardProps = {
  title: string;
  href: string;
};

export default function AddCard({ title, href }: AddCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="h-full rounded-2xl flex flex-col border-2 border-blue-500 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <CardContent className="flex min-h-[220px] flex-1 flex-col items-center justify-center gap-5 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
            <Plus className="h-8 w-8" />
          </div>

          <p className="text-center text-lg font-semibold text-blue-600">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
