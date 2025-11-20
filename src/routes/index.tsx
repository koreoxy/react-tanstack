import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <section className="py-16 px-6 max-w-7xl mx-auto">Home</section>
    </div>
  )
}
