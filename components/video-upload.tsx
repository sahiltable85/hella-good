"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface VideoUploadProps {
  onVideoUploaded: (url: string) => void
}

export function VideoUpload({ onVideoUploaded }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if it's a video file
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      onVideoUploaded(result.url)
      setUploadProgress(100)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} className="cursor-pointer" />
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Uploading video to Vercel Blob...</div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
