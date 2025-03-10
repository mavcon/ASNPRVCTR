"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ActiveUsersChart() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="h-[350px] bg-muted/10 rounded-lg flex items-center justify-center">
            User activity chart would be displayed here
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">24,781</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">8,456</div>
                <p className="text-sm text-muted-foreground">Active Users (30d)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">34.1%</div>
                <p className="text-sm text-muted-foreground">Monthly Active Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border">
            <div className="p-4 font-medium">Top User Segments</div>
            <div className="p-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">Mobile Users</span>
                    <Badge variant="outline">65%</Badge>
                  </div>
                  <span>16,107</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">Desktop Users</span>
                    <Badge variant="outline">35%</Badge>
                  </div>
                  <span>8,674</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">Returning Users</span>
                    <Badge variant="outline">42%</Badge>
                  </div>
                  <span>10,408</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">New Users (30d)</span>
                    <Badge variant="outline">18%</Badge>
                  </div>
                  <span>4,461</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="daily">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Daily user activity chart would be displayed here
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Weekly user activity chart would be displayed here
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Monthly user activity chart would be displayed here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

