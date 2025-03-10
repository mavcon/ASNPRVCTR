"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PriceRangeSelectorProps {
  minPrice?: number
  maxPrice?: number
  defaultMin?: number
  defaultMax?: number
  onChange?: (values: [number, number]) => void
  step?: number
}

export function PriceRangeSelector({
  minPrice = 0,
  maxPrice = 1000,
  defaultMin = 0,
  defaultMax = 1000,
  onChange,
  step = 10,
}: PriceRangeSelectorProps) {
  const [range, setRange] = useState<[number, number]>([
    Math.max(minPrice, Math.min(defaultMin, maxPrice)),
    Math.min(maxPrice, Math.max(defaultMax, minPrice)),
  ])

  useEffect(() => {
    onChange?.(range)
  }, [range, onChange])

  const handleSliderChange = (values: number[]) => {
    setRange([values[0], values[1]])
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (isNaN(value)) {
      setRange([minPrice, range[1]])
    } else {
      setRange([Math.max(minPrice, Math.min(value, range[1])), range[1]])
    }
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (isNaN(value)) {
      setRange([range[0], maxPrice])
    } else {
      setRange([range[0], Math.min(maxPrice, Math.max(value, range[0]))])
    }
  }

  return (
    <div className="space-y-4">
      <Slider
        defaultValue={range}
        min={minPrice}
        max={maxPrice}
        step={step}
        value={range}
        onValueChange={handleSliderChange}
        className="my-6"
      />

      <div className="flex items-center space-x-4">
        <div className="grid gap-2 flex-1">
          <Label htmlFor="min-price">Min</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="min-price"
              type="number"
              min={minPrice}
              max={range[1]}
              value={range[0]}
              onChange={handleMinInputChange}
              className="pl-7"
            />
          </div>
        </div>

        <div className="grid gap-2 flex-1">
          <Label htmlFor="max-price">Max</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="max-price"
              type="number"
              min={range[0]}
              max={maxPrice}
              value={range[1]}
              onChange={handleMaxInputChange}
              className="pl-7"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

