import BreedImages from "@/components/breed-image/breed-image";
import Decoration from "@/components/layout/decoration";
import Footer from "@/components/layout/footer";

interface BreedPageProps {
  params: Promise<{
    breed: string;
  }>;
}

export default async function BreedPage(props: BreedPageProps) {
  const params = await props.params;
  const { breed } = params;

  return (
    <main className="min-h-screen bg-cream pt-6 pb-12">
      <Decoration />
      <BreedImages breed={breed} />
      <Footer />
    </main>
  );
}
