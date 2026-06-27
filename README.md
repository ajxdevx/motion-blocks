# MotionBlocks

**Animated React components for modern websites.**

[motionblocks.dev](https://motionblocks.dev)

A comprehensive motion component library for React, Next.js, Vite, and modern frontend projects. Built with Framer Motion, optional GSAP scroll support, TypeScript, and Tailwind-friendly customization.

**v1.0** includes **88 components**, **15 hooks**, and **12 utility modules**.

## Installation

```bash
npm install motion-blocks framer-motion
```

Optional (for advanced scroll animations):

```bash
npm install gsap
```

## Quick Start

```tsx
"use client";

import {
  HeroReveal,
  RevealText,
  MagneticButton,
  ScrollReveal,
  AnimatedCard,
} from "motion-blocks";
import "motion-blocks/styles.css";

export function LandingPage() {
  return (
    <main>
      <HeroReveal
        title="Build interfaces that feel alive"
        subtitle="88 animated components ready to ship."
        actions={<MagneticButton>Get Started</MagneticButton>}
      />

      <ScrollReveal animation="slide-up">
        <AnimatedCard>
          <h3>Feature title</h3>
          <p>Feature description</p>
        </AnimatedCard>
      </ScrollReveal>

      <RevealText direction="up">
        <h2>Animated heading</h2>
      </RevealText>
    </main>
  );
}
```

## Next.js

Components use client-side animation. Wrap usage in a Client Component:

```tsx
"use client";
```

Import styles in your root layout:

```tsx
import "motion-blocks/styles.css";
```

## Component Categories

### Text Animations (10)

| Component | Description |
|-----------|-------------|
| `RevealText` | Viewport text reveal |
| `SplitText` | Word/character stagger |
| `TypewriterText` | Character-by-character typing |
| `ScrambleText` | Scramble-to-resolve effect |
| `GradientText` | Animated gradient text |
| `BlurTextReveal` | Blur-in text reveal |
| `RotatingWords` | Cycling word rotation |
| `CountUp` | Animated number counter |
| `NumberTicker` | Digit ticker animation |
| `HighlightText` | Highlight on reveal |

```tsx
<SplitText text="Build interfaces that feel alive." type="words" stagger={0.05} />
<TypewriterText text="Hello, world." speed={50} loop />
<CountUp value={1284} prefix="+" duration={2} />
<RotatingWords words={["Fast.", "Smooth.", "Beautiful."]} interval={2500} />
```

### Buttons (8)

| Component | Description |
|-----------|-------------|
| `MagneticButton` | Cursor-following magnetic effect |
| `ShineButton` | Shine sweep on hover |
| `GlowButton` | Glow on hover |
| `RippleButton` | Material ripple on click |
| `PulseButton` | Subtle pulse animation |
| `LiquidButton` | Morphing border radius |
| `GradientBorderButton` | Animated gradient border |
| `MorphButton` | Shape morph on hover |

```tsx
<MagneticButton strength={0.35}>Get Started</MagneticButton>
<ShineButton className="px-6 py-3">Learn More</ShineButton>
<GlowButton>Glow Effect</GlowButton>
```

### Cards (8)

| Component | Description |
|-----------|-------------|
| `AnimatedCard` | Hover lift and shadow |
| `TiltCard` | 3D mouse tilt |
| `SpotlightCard` | Cursor spotlight |
| `GlassCard` | Glassmorphism |
| `HoverBorderCard` | Animated border |
| `ExpandCard` | Expand on hover |
| `StackCard` | Stacked card effect |
| `FloatingCard` | Float + hover |

### Scroll (8)

| Component | Description |
|-----------|-------------|
| `ScrollReveal` | Viewport reveal wrapper |
| `StickySection` | Sticky scroll section |
| `ScrollProgressBar` | Page scroll progress |
| `HorizontalScroll` | Horizontal scroll container |
| `ScrollFade` | Fade on scroll |
| `ScrollParallax` | Parallax on scroll |
| `ScrollScale` | Scale on scroll |
| `PinnedSection` | Pin section during scroll |

```tsx
<ScrollProgressBar color="bg-violet-500" />
<ScrollReveal animation="blur" delay={0.2}>{children}</ScrollReveal>
<ScrollParallax speed={0.5}>{children}</ScrollParallax>
```

### Backgrounds (10)

Decorative, `pointer-events-none`, `aria-hidden`. Customizable via `className`.

`FloatingParticles` · `AuroraBackground` · `AnimatedGrid` · `DotPattern` · `MeshGradient` · `NoiseBackground` · `SpotlightBackground` · `AnimatedGradient` · `BlobBackground` · `StarsBackground`

```tsx
<AuroraBackground className="absolute inset-0 opacity-40" />
<DotPattern className="fixed inset-0 opacity-20" />
```

### Loaders (8)

All include `role="status"` and `aria-label="Loading"`.

`Spinner` · `PulseLoader` · `OrbitLoader` · `DotsLoader` · `CubeLoader` · `RingLoader` · `Skeleton` · `WaveLoader`

```tsx
<Spinner size="md" />
<Skeleton width={200} height={20} />
```

### Hero (8)

`HeroReveal` · `HeroImage` · `HeroBackground` · `HeroCTA` · `HeroCards` · `HeroSplit` · `HeroVideo` · `HeroMarquee`

### Cursor (6)

Disabled on touch devices. `pointer-events-none`.

`CursorFollower` · `CursorGlow` · `MagneticCursor` · `CursorTrail` · `CursorSpotlight` · `CursorText`

### Mouse (6)

`FloatingElement` · `MouseParallax` · `MouseTilt` · `MouseGlow` · `HoverReveal` · `ImageFollowCursor`

### Navigation (6)

`AnimatedNavbar` · `MobileMenu` · `Dock` · `CommandMenu` · `FloatingNav` · `Sidebar`

### Sections (10)

Data-driven, composable section components:

`FAQ` · `Pricing` · `Testimonials` · `Features` · `Team` · `Contact` · `Stats` · `Timeline` · `BentoGrid` · `LogoCloud`

```tsx
<FAQ items={[{ question: "...", answer: "..." }]} title="FAQ" />
<Pricing plans={[{ name: "Pro", price: "$29", features: [...], cta: "Buy" }]} />
<Features items={[{ title: "...", description: "..." }]} />
<Stats stats={[{ label: "Users", value: "10k+" }]} />
```

## Hooks (15)

| Hook | Description |
|------|-------------|
| `useMousePosition` | `{ x, y }` mouse coordinates |
| `useScrollProgress` | Scroll progress `0–1` |
| `useMediaQuery` | SSR-safe media query |
| `useIsomorphicLayoutEffect` | SSR-safe layout effect |
| `useWindowSize` | `{ width, height }` |
| `useIntersectionObserver` | Element visibility |
| `usePrevious` | Previous value |
| `useClipboard` | Copy to clipboard |
| `useDebounce` | Debounced value |
| `useThrottle` | Throttled value |
| `useHover` | Hover state + ref |
| `useClickOutside` | Outside click handler |
| `useKeyPress` | Key press state |
| `useParallax` | Scroll parallax offset |
| `useElementSize` | Element dimensions |

```tsx
const { x, y } = useMousePosition();
const progress = useScrollProgress();
const isMobile = useMediaQuery("(max-width: 768px)");
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
const { copy, copied } = useClipboard();
```

## Utilities (12)

| Utility | Description |
|---------|-------------|
| `cn` | clsx + tailwind-merge |
| `motionPresets` | fadeIn, slideUp, slideDown, scaleIn, blurIn, staggerContainer |
| `clamp` | Clamp number to range |
| `lerp` | Linear interpolation |
| `splitWords` / `splitCharacters` | Text splitting |
| `random` / `randomInt` / `randomItem` | Random helpers |
| `easing` / `cubicBezier` | Easing curves |
| `springConfigs` | Framer spring presets |
| `viewportHelpers` | isBrowser, isTouchDevice, getViewportOptions |

## Project Structure

```
src/
  components/
    text/ buttons/ cards/ scroll/
    backgrounds/ loaders/ hero/
    cursor/ mouse/ navigation/ sections/
  hooks/
  utils/
  styles/
  index.ts
```

## Local Development

```bash
git clone https://github.com/ajxdevx/motion-blocks.git
cd motion-blocks
npm install
npm run dev
```

Open `http://localhost:5173` for the demo playground.

## Build

```bash
npm run typecheck
npm run build
npm run lint
```

Outputs:

- `dist/index.js` — ESM
- `dist/index.cjs` — CJS
- `dist/index.d.ts` — Types
- `dist/style.css` — Optional base styles

## Publishing

```bash
npm login
npm publish --access public
```

## Requirements

- React 18+
- framer-motion 11+
- TypeScript (recommended)

## License

MIT
