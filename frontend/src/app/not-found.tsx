import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="inline-block align-middle">
        <div className="text-8xl m-4">
          🐵🔎
        </div>

        <div className="text-lg text-center">
          <span className="block">
            This page isn&apos;t available. Sorry about that.
          </span>
          <span className="block">
            Try searching for something else.
          </span>
        </div>

        <Button asChild className="mt-4 text-lg">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}