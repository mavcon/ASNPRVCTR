import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserRole } from "./user-store"

export type InvitationStatus = "Pending" | "Accepted" | "Expired" | "Revoked"

export interface Invitation {
  id: string
  email: string
  role: UserRole
  status: InvitationStatus
  message?: string
  invitedBy: string
  invitedByName: string
  createdAt: string
  expiresAt: string
  acceptedAt?: string
  token: string
}

interface InvitationState {
  invitations: Invitation[]
  addInvitation: (invitation: Invitation) => void
  updateInvitation: (id: string, updates: Partial<Invitation>) => void
  deleteInvitation: (id: string) => void
  getInvitationByToken: (token: string) => Invitation | undefined
  getInvitationsByStatus: (status: InvitationStatus) => Invitation[]
  resendInvitation: (id: string) => void
  revokeInvitation: (id: string) => void
}

// Sample invitations for development
const sampleInvitations: Invitation[] = [
  {
    id: "inv-1",
    email: "artist@example.com",
    role: "Artist",
    status: "Pending",
    message: "We'd love to have you join our platform as an artist!",
    invitedBy: "6", // Sarah Thompson's ID
    invitedByName: "Sarah Thompson",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    token: "token-123456",
  },
  {
    id: "inv-2",
    email: "admin@example.com",
    role: "Admin",
    status: "Pending",
    invitedBy: "6", // Sarah Thompson's ID
    invitedByName: "Sarah Thompson",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    token: "token-789012",
  },
  {
    id: "inv-3",
    email: "expired@example.com",
    role: "Admin",
    status: "Expired",
    invitedBy: "6", // Sarah Thompson's ID
    invitedByName: "Sarah Thompson",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    expiresAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    token: "token-expired",
  },
]

export const useInvitationStore = create<InvitationState>()(
  persist(
    (set, get) => ({
      invitations: sampleInvitations,

      addInvitation: (invitation) =>
        set((state) => ({
          invitations: [invitation, ...state.invitations],
        })),

      updateInvitation: (id, updates) =>
        set((state) => ({
          invitations: state.invitations.map((invitation) =>
            invitation.id === id ? { ...invitation, ...updates } : invitation,
          ),
        })),

      deleteInvitation: (id) =>
        set((state) => ({
          invitations: state.invitations.filter((invitation) => invitation.id !== id),
        })),

      getInvitationByToken: (token) => {
        return get().invitations.find((invitation) => invitation.token === token)
      },

      getInvitationsByStatus: (status) => {
        return get().invitations.filter((invitation) => invitation.status === status)
      },

      resendInvitation: (id) =>
        set((state) => {
          const now = new Date()
          const expiresAt = new Date(now)
          expiresAt.setDate(expiresAt.getDate() + 7) // New expiration 7 days from now
          const newToken = `token-${Math.random().toString(36).substring(2, 15)}` // Generate new token

          return {
            invitations: state.invitations.map((invitation) =>
              invitation.id === id
                ? {
                    ...invitation,
                    status: "Pending",
                    createdAt: now.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                    token: newToken,
                  }
                : invitation,
            ),
          }
        }),

      revokeInvitation: (id) =>
        set((state) => ({
          invitations: state.invitations.map((invitation) =>
            invitation.id === id ? { ...invitation, status: "Revoked" } : invitation,
          ),
        })),
    }),
    {
      name: "asnprvctr-invitation-store",
    },
  ),
)

