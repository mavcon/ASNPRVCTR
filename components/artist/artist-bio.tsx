"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function ArtistBio() {
  const [isLoading, setIsLoading] = useState(false)
  const [bio, setBio] = useState(
    "I am a contemporary artist based in Toronto, specializing in digital art and mixed media. My work explores the intersection of technology and traditional artistic practices, creating pieces that bridge the gap between the digital and physical worlds.\n\nWith over 10 years of experience, I've developed a unique style that combines vibrant colors with abstract forms, often incorporating elements from nature and urban environments. My artistic journey began with traditional painting but evolved as I discovered the possibilities of digital tools and mixed media approaches.\n\nI draw inspiration from my travels, urban landscapes, and the natural world. Each piece tells a story of transformation and connection, inviting viewers to find their own meaning within the layers of color and texture.",
  )
  const [artistStatement, setArtistStatement] = useState(
    "My work investigates the dialogue between digital and analog, exploring how technology shapes our perception of reality and art itself. Through a process of layering, deconstruction, and reconstruction, I create pieces that exist in the liminal space between the physical and virtual worlds.\n\nI believe art should challenge viewers while remaining accessible, creating moments of reflection and connection in our increasingly fragmented world. My artistic practice is both a personal meditation and a social commentary, examining how we relate to each other and our environment in the digital age.",
  )
  const [education, setEducation] = useState([
    "MFA in Digital Arts, University of Toronto, 2015",
    "BFA in Studio Art, Emily Carr University, 2012",
    "Certificate in Advanced Digital Imaging, School of Visual Arts, 2013",
  ])
  const [exhibitions, setExhibitions] = useState([
    "Solo Exhibition: 'Digital Landscapes', Gallery 401, Toronto, 2022",
    "Group Show: 'New Perspectives', Contemporary Arts Center, Vancouver, 2021",
    "Biennale of Digital Art, Montreal, 2020",
    "Emerging Artists Showcase, Art Gallery of Ontario, 2019",
  ])

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Bio updated",
        description: "Your artist bio has been updated successfully.",
      })
    }, 1000)
  }

  const handleAddEducation = () => {
    setEducation([...education, ""])
  }

  const handleUpdateEducation = (index: number, value: string) => {
    const newEducation = [...education]
    newEducation[index] = value
    setEducation(newEducation)
  }

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleAddExhibition = () => {
    setExhibitions([...exhibitions, ""])
  }

  const handleUpdateExhibition = (index: number, value: string) => {
    const newExhibitions = [...exhibitions]
    newExhibitions[index] = value
    setExhibitions(newExhibitions)
  }

  const handleRemoveExhibition = (index: number) => {
    setExhibitions(exhibitions.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="bio">Artist Bio</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Tell your story and background as an artist (500-1000 characters recommended)
          </p>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-[200px]" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="artist-statement">Artist Statement</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Describe your artistic philosophy and approach (300-600 characters recommended)
          </p>
          <Textarea
            id="artist-statement"
            value={artistStatement}
            onChange={(e) => setArtistStatement(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Education & Training</h3>
            <p className="text-sm text-muted-foreground">List your educational background and artistic training</p>
          </div>
          <Button type="button" variant="outline" onClick={handleAddEducation}>
            Add Education
          </Button>
        </div>

        <div className="space-y-2">
          {education.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => handleUpdateEducation(index, e.target.value)}
                placeholder="Degree, Institution, Year"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveEducation(index)}>
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Exhibitions & Shows</h3>
            <p className="text-sm text-muted-foreground">List your notable exhibitions and shows</p>
          </div>
          <Button type="button" variant="outline" onClick={handleAddExhibition}>
            Add Exhibition
          </Button>
        </div>

        <div className="space-y-2">
          {exhibitions.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => handleUpdateExhibition(index, e.target.value)}
                placeholder="Exhibition Name, Gallery, Location, Year"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveExhibition(index)}>
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}

