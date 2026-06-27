import {
  AnimatedCard,
  AnimatedGradient,
  AnimatedNavbar,
  AuroraBackground,
  BlurTextReveal,
  BentoGrid,
  CountUp,
  CursorGlow,
  DotPattern,
  FAQ,
  Features,
  FloatingElement,
  GlassCard,
  GlowButton,
  GradientText,
  HeroReveal,
  LogoCloud,
  MagneticButton,
  MorphButton,
  OrbitLoader,
  Pricing,
  RevealText,
  RotatingWords,
  ScrollProgressBar,
  ScrollReveal,
  ShineButton,
  SplitText,
  SpotlightCard,
  Stats,
  Testimonials,
  TiltCard,
  TypewriterText,
} from "motion-blocks";

const navLinks = [
  { label: "Text", href: "#text" },
  { label: "Buttons", href: "#buttons" },
  { label: "Cards", href: "#cards" },
  { label: "Sections", href: "#sections" },
];

const faqItems = [
  {
    question: "Does it work with Next.js?",
    answer: "Yes. Add \"use client\" to components that use animation and import from the package.",
  },
  {
    question: "Is it tree-shakeable?",
    answer: "Yes. Import only the components you need for minimal bundle size.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    features: ["6 core components", "4 hooks", "MIT license"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    features: ["88 components", "15 hooks", "Priority support"],
    cta: "Buy now",
    highlighted: true,
  },
];

const featureItems = [
  { title: "Text animations", description: "Reveal, split, typewriter, scramble, and more." },
  { title: "Scroll effects", description: "Parallax, fade, scale, pin, and progress bars." },
  { title: "Cursor & mouse", description: "Magnetic, glow, trail, parallax, and tilt." },
];

const stats = [
  { label: "Components", value: "88" },
  { label: "Hooks", value: "15" },
  { label: "Utilities", value: "12" },
];

const testimonials = [
  { quote: "The fastest way to add motion to our landing pages.", author: "Alex M.", role: "Frontend Lead" },
  { quote: "Clean API, great TypeScript support.", author: "Sam K.", role: "Design Engineer" },
];

const logos = [
  { src: "https://placehold.co/120x40/1a1a2e/fff?text=Acme", alt: "Acme" },
  { src: "https://placehold.co/120x40/1a1a2e/fff?text=Globex", alt: "Globex" },
  { src: "https://placehold.co/120x40/1a1a2e/fff?text=Initech", alt: "Initech" },
];

function SectionHeading({ id, title, subtitle }: { id?: string; title: string; subtitle: string }) {
  return (
    <ScrollReveal animation="slide-up" className="mb-12 text-center">
      <h2 id={id} className="text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-neutral-400">{subtitle}</p>
    </ScrollReveal>
  );
}

export default function App() {
  return (
    <div className="motion-blocks-root relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <ScrollProgressBar className="bg-neutral-900" color="bg-violet-500" />
      <CursorGlow size={280} color="rgba(139,92,246,0.15)" />
      <DotPattern className="fixed inset-0 opacity-30" />

      <AnimatedNavbar
        logo={<span className="font-bold text-white">MotionBlocks</span>}
        links={navLinks}
        className="fixed top-0 z-40 w-full border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-md"
      />

      {/* Hero */}
      <section className="relative px-6 pb-24 pt-28">
        <AuroraBackground className="absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl">
          <HeroReveal
            badge={
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-sm text-violet-300">
                v1.0 — Production-ready
              </span>
            }
            title={
              <GradientText animated className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">
                Build interfaces that feel alive
              </GradientText>
            }
            subtitle="88 animated components, 15 hooks, and 12 utilities for React, Next.js, and Vite."
            actions={
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  strength={0.35}
                  className="bg-white px-8 py-3 font-semibold text-neutral-950"
                >
                  Get Started
                </MagneticButton>
                <ShineButton className="border border-neutral-700 bg-neutral-900 px-8 py-3">
                  View Docs
                </ShineButton>
              </div>
            }
          />
          <FloatingElement amplitude={12} className="mx-auto mt-16 block w-fit">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 backdrop-blur">
              <OrbitLoader size="md" />
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* Text animations */}
      <section id="text" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Text animations" subtitle="10 components for expressive typography" />
          <div className="grid gap-8 md:grid-cols-2">
            <RevealText direction="up">
              <p className="text-2xl font-semibold">RevealText on scroll</p>
            </RevealText>
            <SplitText text="Split word by word." type="words" className="text-2xl font-semibold" />
            <TypewriterText text="Typewriter effect..." speed={60} className="text-xl text-violet-300" />
            <RotatingWords words={["Fast.", "Smooth.", "Beautiful.", "Alive."]} className="text-2xl font-bold" />
            <BlurTextReveal>
              <p className="text-xl">Blur reveal animation</p>
            </BlurTextReveal>
            <CountUp value={1284} prefix="+" suffix=" users" className="text-4xl font-bold text-violet-400" />
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section id="buttons" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Buttons" subtitle="8 interactive button variants" />
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton className="bg-violet-600 px-6 py-3">Magnetic</MagneticButton>
            <ShineButton className="bg-neutral-800 px-6 py-3">Shine</ShineButton>
            <GlowButton className="bg-neutral-800 px-6 py-3">Glow</GlowButton>
            <MorphButton className="bg-neutral-800 px-6 py-3">Morph</MorphButton>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Cards" subtitle="Hover, tilt, spotlight, and glass effects" />
          <div className="grid gap-6 md:grid-cols-3">
            <AnimatedCard className="border-neutral-800 bg-neutral-900/60 text-neutral-100">
              <h3 className="font-semibold">AnimatedCard</h3>
              <p className="mt-2 text-sm text-neutral-400">Lift on hover</p>
            </AnimatedCard>
            <TiltCard className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <h3 className="font-semibold">TiltCard</h3>
              <p className="mt-2 text-sm text-neutral-400">3D mouse tilt</p>
            </TiltCard>
            <SpotlightCard className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <h3 className="font-semibold">SpotlightCard</h3>
              <p className="mt-2 text-sm text-neutral-400">Cursor spotlight</p>
            </SpotlightCard>
            <GlassCard className="p-6 md:col-span-3">
              <h3 className="font-semibold">GlassCard</h3>
              <p className="mt-2 text-sm text-neutral-400">Glassmorphism with minimal forced styling</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Scroll */}
      <section className="px-6 py-24">
        <AnimatedGradient className="absolute inset-0 -z-10 opacity-20" />
        <div className="mx-auto max-w-4xl">
          <SectionHeading title="Scroll effects" subtitle="Reveal, parallax, progress, and pin" />
          <ScrollReveal animation="scale">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-12 text-center">
              <p className="text-lg">This block scales into view on scroll.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sections */}
      <section id="sections" className="px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-24">
          <Features items={featureItems} title="Features" className="text-neutral-100" />
          <Stats stats={stats} className="text-neutral-100" />
          <Testimonials items={testimonials} title="Testimonials" />
          <Pricing plans={pricingPlans} title="Pricing" />
          <FAQ items={faqItems} title="FAQ" />
          <LogoCloud logos={logos} title="Trusted by teams" />
          <BentoGrid
            items={[
              { title: "Backgrounds", description: "10 decorative backgrounds", colSpan: 2 },
              { title: "Loaders", description: "8 loading indicators" },
              { title: "Hero", description: "8 hero layouts" },
              { title: "Navigation", description: "6 nav components", colSpan: 2 },
            ]}
          />
        </div>
      </section>

      <footer className="border-t border-neutral-800 px-6 py-12 text-center text-neutral-500">
        <p>motion-blocks v1.0 — Animated React components for modern websites</p>
        <p className="mt-2">
          <a href="https://motionblocks.dev" className="text-violet-400 hover:underline">
            motionblocks.dev
          </a>
        </p>
      </footer>
    </div>
  );
}
