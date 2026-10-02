import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import type { Announcement } from "@/content/types";

interface Props {
  announcement: Announcement | null;
  /** `navigation.externalLinkHint`, para o link externo. */
  externalHint: string;
}

export default function AnnouncementBar({ announcement, externalHint }: Props) {
  if (!announcement) return null;

  const { text, linkLabel, href } = announcement;
  const external = href.startsWith("http");

  return (
    <div className="border-b border-line bg-surface-2">
      <Container className="flex flex-wrap items-center justify-center gap-2 py-2 text-center text-[length:var(--text-sm)]">
        <span className="text-ink-muted">{text}</span>
        {external ? (
          <ExternalLink className="font-medium text-accent-strong hover:text-ink" href={href} hint={externalHint}>
            {linkLabel}
          </ExternalLink>
        ) : (
          <Link className="font-medium text-accent-strong hover:text-ink" href={href}>
            {linkLabel}
          </Link>
        )}
      </Container>
    </div>
  );
}
