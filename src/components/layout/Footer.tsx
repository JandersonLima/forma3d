import Container from "@/components/ui/Container";
import { getLocaleContent } from "@/content";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const { footer, navigation } = await getLocaleContent();
  const { columns: footerColumns, socialLinks } = footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-10 py-[calc(var(--spacing-section)/2)]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-[length:var(--text-sm)] text-ink">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-[length:var(--text-sm)] text-ink-muted hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : link.localized === false ? (
                      <a href={link.href} className="text-[length:var(--text-sm)] text-ink-muted hover:text-ink">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-[length:var(--text-sm)] text-ink-muted hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[length:var(--text-sm)] text-ink-muted">
            © {year} {navigation.copyright}
          </p>
          <ul className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[length:var(--text-sm)] text-ink-muted hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
