import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../src/index.ts'

const client = hc<AppType>('/')

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { data } = useQuery({
    queryKey: ['peoples'],
    queryFn: async () => {
      const res = await client.api.people.$get()
      if (!res.ok) throw new Error('failed to fetch people')
      return res.json()
    },
    initialData: [],
  })

  return (
    <div>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((orang, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {orang.id}
              </h3>
              <p className="text-gray-400 leading-relaxed">{orang.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
