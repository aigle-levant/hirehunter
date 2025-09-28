import Hero from "@/components/main/Hero";
import ProblemStatement from "@/components/main/Problem";
import Solutions from "@/components/main/Solution";
import CTASection from "@/components/main/CTA";

export default function HomePage() {
  return (
    <div id="home-wrapper">
      <Hero />
      <ProblemStatement />
      <Solutions />
      <CTASection />
    </div>
  );
}
