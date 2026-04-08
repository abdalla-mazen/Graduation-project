import Main from "@/components/layout/header";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return <>
  <Main />
  { children };
  </>
}
