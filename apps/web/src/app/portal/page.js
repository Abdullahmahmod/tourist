import { PortalPreview } from "@/components/portal-preview";

export default function PortalPage() {
  return (
    <PortalPreview
      defaultLocale={process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "ar"}
    />
  );
}
