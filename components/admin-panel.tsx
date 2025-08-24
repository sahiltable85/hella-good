"use client"

import { useState } from "react"
import { VideoUpload } from "./video-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminPanelProps {
  currentVideoUrl?: string
  onVideoChange: (url: string) => void
}

export function AdminPanel({ currentVideoUrl, onVideoChange }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-sm border border-white/20 text-white hover:bg-black/30"
        size="sm"
      >
        Admin
      </Button>
    )
  }

  return (
    <Card className="fixed top-4 right-4 z-50 w-80 bg-black/80 backdrop-blur-sm border-white/20 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Video Management</CardTitle>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-white/70 mb-2 block">Current Video</label>
          <div className="text-xs text-white/90 break-all bg-white/5 p-2 rounded">
            {currentVideoUrl || "No video uploaded"}
          </div>
        </div>

        <div>
          <label className="text-xs text-white/70 mb-2 block">Upload New Video</label>
          <VideoUpload onVideoUploaded={onVideoChange} />
        </div>
      </CardContent>
    </Card>
  )
}
