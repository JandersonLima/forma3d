export type Href = string;

export interface NavLink {
  label: string;
  href: Href;
  external?: boolean;
}

export interface ShowcaseItem {
  label: string;
  imageBefore: string;
  imageAfter: string;
  alt: string;
}

export interface Logo {
  name: string;
  src: string;
}

export interface GenerationMode {
  id: "detail" | "mesh";
  name: string;
  image: string;
  alt: string;
  bullets: string[];
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: Href;
}

export interface GameFeature {
  image: string;
  alt: string;
  title: string;
  body: string;
  href: Href;
}

export interface Industry {
  image: string;
  alt: string;
  title: string;
  body: string;
  href: Href;
}

export interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

export interface GalleryModel {
  thumb: string;
  name: string;
  href: Href;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Feature {
  image: string;
  alt: string;
  title: string;
  body: string;
  href: Href;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Brand {
  name: string;
  href: Href;
}

export interface Announcement {
  text: string;
  linkLabel: string;
  href: Href;
}

export interface NavItem {
  label: string;
  href: Href;
  /** Rótulo do link "ver tudo" dentro do painel — obrigatório sempre que `children` for definido. */
  overviewLabel?: string;
  children?: NavLink[];
}

export interface NavigationContent {
  brand: Brand;
  announcement: Announcement | null;
  headerNav: NavItem[];
  headerCta: { label: string; href: Href };
  skipLinkLabel: string;
  mobileMenuLabel: string;
  mobileMenuCloseLabel: string;
  /** Título/aria-label do painel da gaveta mobile quando aberta. */
  mobileMenuTitle: string;
  /** Texto do copyright sem o ano — o componente prefixa "© {ano atual} ". */
  copyright: string;
}

export interface SandboxContent {
  buttonLabels: { primary: string; ghost: string };
  headings: {
    center: { eyebrow: string; title: string; description: string };
    left: { eyebrow: string; title: string; description: string };
  };
  marqueeTest: {
    eyebrow: string;
    title: string;
    description: string;
    few: string[];
    many: string[];
    cards: string[];
  };
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    dropzoneLabel: string;
    dropzoneHint: string;
    ctaLabel: string;
    ctaHref: Href;
  };
  showcase: ShowcaseItem[];
  partners: Logo[];
  modes: { eyebrow: string; title: string; subtitle: string; items: GenerationMode[] };
  printing: {
    title: string;
    subtitle: string;
    steps: string[];
    highlightTitle: string;
    highlightBody: string;
    image: string;
    alt: string;
    ctaLabel: string;
    ctaHref: Href;
    compatible: Logo[];
  };
  games: {
    title: string;
    subtitle: string;
    features: GameFeature[];
    engines: Logo[];
    ctaLabel: string;
    ctaHref: Href;
  };
  industries: { title: string; subtitle: string; items: Industry[] };
  social: { title: string; reviewLabel: string; reviewHref: Href; testimonials: Testimonial[] };
  gallery: { title: string; models: GalleryModel[] };
  faq: { title: string; items: FaqItem[] };
  features: { title: string; items: Feature[] };
  finalCta: { title: string; body: string; ctaLabel: string; ctaHref: Href };
}
