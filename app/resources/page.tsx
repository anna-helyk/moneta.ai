import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-purple-800">Learning Resources</h1>

      <Card className="shadow-sm border-0 bg-purple-50">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-xl font-medium text-purple-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600">
            Explore helpful articles, guides, and more. Our knowledge base is currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
