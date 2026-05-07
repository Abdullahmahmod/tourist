import { PlatformShowcase } from "@/components/platform-showcase";
import { getSession } from "@/lib/auth/session";
import { getFeaturedPrograms } from "@/lib/marketplace-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getSession();
  const featuredPrograms = await getFeaturedPrograms(3);

  return (
    <PlatformShowcase
      defaultLocale={process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "ar"}
      featuredPrograms={featuredPrograms}
      session={session}
    />
  );
}
