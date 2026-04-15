import { getServerSession } from "next-auth/next";
import AddCard from "../_components/add-card";
import DashboardCard from "../_components/dashboard-card";
import { authOptions } from "@/auth";


const mainCards = [
  {
    title: "Past exams",
    image: "/images/past-exams.jpg",
    href: "/past-exams",
  }
];

const addCards = [
  {
    title: "Add new exam",
    href: "/add-new-exam",
  },
];

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Welcome back, <span className="text-blue-600 capitalize">{session?.user?.name}!</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Manage your exams and review submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mainCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              image={card.image}
              href={card.href}
            />
          ))}

          {addCards.map((card) => (
            <AddCard key={card.title} title={card.title} href={card.href} />
          ))}
        </div>
      </section>
    </main>
  );
}
