import type { Metadata } from "next"
import InvitePageClient from "./invite-page-client"

export const metadata: Metadata = {
  title: "Accept Invitation | ASNPRVCTR",
  description: "Accept your invitation to join ASNPRVCTR.",
}

export default function InvitePage({ params }: { params: { token: string } }) {
  const { token } = params

  // This is a server component, so we need to pass the token to the client component
  return <InvitePageClient token={token} />
}

