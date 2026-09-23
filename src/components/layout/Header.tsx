import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeaderScrollShell from "@/components/layout/HeaderScrollShell";
import NavDropdown from "@/components/layout/NavDropdown";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { navigation } from "@/content/navigation";

export default function Header() {
  const { brand, headerNav, headerCta, mobileMenuLabel, mobileMenuCloseLabel, mobileMenuTitle } = navigation;

  return (
    <HeaderScrollShell>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href={brand.href} className="text-[length:var(--text-h3)] text-ink">
          {brand.name}
        </Link>

        <nav className="hidden items-center md:flex">
          {headerNav.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                overviewLabel={item.overviewLabel ?? item.label}
                items={item.children}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[length:var(--text-sm)] text-ink transition-colors duration-150 hover:text-accent"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button href={headerCta.href} size="md" className="hidden md:inline-flex">
            {headerCta.label}
          </Button>
          <MobileDrawer
            nav={headerNav}
            cta={headerCta}
            brand={brand}
            openLabel={mobileMenuLabel}
            closeLabel={mobileMenuCloseLabel}
            title={mobileMenuTitle}
          />
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
