

import { ContactProfile } from "./_components/contact-profile";
import { ActivityPanel } from "./_components/activity-panel";

export default function OpportunityDetailPage({
  params,
}: {
  params: { opportunityId: string };
}) {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-2/5">
        <ContactProfile opportunityId={params.opportunityId} />
      </div>
      <div className="w-3/5">
        <ActivityPanel opportunityId={params.opportunityId} />
      </div>
    </div>
  );
}
