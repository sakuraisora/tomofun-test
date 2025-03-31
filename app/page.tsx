import BreedList from "@/components/breed-list/breed-list";
import Decoration from "@/components/layout/decoration";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pt-6 pb-12">
      <Header />
      <Decoration />
      <BreedList />
      <Footer />
    </main>
  );
}
