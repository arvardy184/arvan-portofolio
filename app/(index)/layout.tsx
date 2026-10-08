import { Collection } from "@/components/collection/collection";
import { employment, profile } from "@/data/collection";
import { getCollection } from "@/lib/get-collection";
import { getContactLinks } from "@/lib/contact";

// Index, Work, Frames, Notes and Info share this layout. The sheet stays
// mounted while the route changes, which is what lets objects reflow between
// views; each page below it only contributes its metadata.
export default function IndexLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Collection
        data={getCollection()}
        profile={profile}
        employment={employment}
        links={getContactLinks()}
      />
      {children}
    </>
  );
}
