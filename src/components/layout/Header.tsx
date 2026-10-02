import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeaderScrollShell from "@/components/layout/HeaderScrollShell";
import NavDropdown from "@/components/layout/NavDropdown";
import MobileDrawer from "@/components/layout/MobileDrawer";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { getLocaleContent } from "@/content";
import { Link } from "@/i18n/navigation";

export default async function Header() {
  const { navigation } = await getLocaleContent();
  const {
    brand,
    headerNav,
    headerCta,
    mobileMenuLabel,
    mobileMenuCloseLabel,
    mobileMenuTitle,
    localeSwitcher,
    mainNavLabel,
  } = navigation;

  return (
    <HeaderScrollShell>
      <Container className="flex h-header items-center justify-between gap-6">
        <Link href={brand.href} className="text-[length:var(--text-h3)] text-ink">
          {brand.name}
        </Link>

        <nav aria-label={mainNavLabel} className="hidden items-center md:flex">
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
                className="px-3 py-2 text-[length:var(--text-sm)] text-ink transition-colors duration-150 hover:text-accent-strong"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher label={localeSwitcher.label} names={localeSwitcher.names} className="hidden md:flex" />
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
            navLabel={mainNavLabel}
            localeSwitcher={localeSwitcher}
          />
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
