import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArtistProfileForm } from "@/components/artist/artist-profile-form"
import { ArtistPortfolio } from "@/components/artist/artist-portfolio"
import { ArtistBio } from "@/components/artist/artist-bio"

export default function ArtistProfilePage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Artist Profile</h1>
        <p className="text-muted-foreground">Manage your public profile, portfolio, and bio.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="bio">Bio</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information visible to customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Showcase your best work and artistic style.</CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistPortfolio />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Artist Bio</CardTitle>
              <CardDescription>Tell your story and share your artistic journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistBio />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

