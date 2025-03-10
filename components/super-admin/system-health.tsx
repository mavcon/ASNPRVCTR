"use client"

export function SystemHealth() {
  return (
    <div className="space-y-8">
      {/* Server Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Server Resources</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm font-medium">38%</span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <div className="h-full bg-primary w-[38%] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm font-medium">64%</span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <div className="h-full bg-yellow-500 w-[64%] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disk Space</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <div className="h-full bg-primary w-[42%] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network Load</span>
              <span className="text-sm font-medium">27%</span>
            </div>
            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
              <div className="h-full bg-primary w-[27%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Service Status</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Main Database</p>
                <p className="text-xs text-muted-foreground">PostgreSQL Primary</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs font-medium">Healthy</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Response Time</span>
                <span>24ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Connections</span>
                <span>145/500</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Redis Cache</p>
                <p className="text-xs text-muted-foreground">In-Memory Data Store</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs font-medium">Healthy</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Memory Usage</span>
                <span>2.3GB/4GB</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Keys</span>
                <span>1.2M</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">API Gateway</p>
                <p className="text-xs text-muted-foreground">Load Balancer</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs font-medium">Healthy</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Request Rate</span>
                <span>2.4K/sec</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Error Rate</span>
                <span>0.02%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Elasticsearch</p>
                <p className="text-xs text-muted-foreground">Search Engine</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs font-medium">Degraded</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Cluster Health</span>
                <span>Yellow</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Indices</span>
                <span>42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

