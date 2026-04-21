// import { getTrends } from '@/lib/apis/get-trends.api'
// import { TrendsResponse } from '@/lib/types/industry-request'


// export default async function Page() {
//   const payload: TrendsResponse = await getTrends()

//   return (
//     <div className="min-h-screen py-8 ">

//       {/* Header */}
//       <div className="w-1/2 mx-auto mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Industry Trends 🚀
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Explore the most in-demand AI skills
//         </p>

//         <div className="mt-3 inline-block bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
//           {payload.count} Skills
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="flex flex-col items-center gap-6">
//         {payload.trends.map((trend) => (
//           <div
//             key={trend.id}
//             className="w-1/2 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100"
//           >
            
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">
//               {trend.skill_name}
//             </h2>

//             <p className="text-sm text-gray-500 line-clamp-4 mb-4">
//               {trend.description}
//             </p>

//             <div className="mb-4">
//               <div className="flex justify-between text-xs text-gray-400 mb-1">
//                 <span>Demand</span>
//                 <span>{trend.demand_score}/10</span>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="h-2 rounded-full bg-blue-500"
//                   style={{
//                     width: `${trend.demand_score * 10}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between items-center text-xs text-gray-400">
//               <span>ID: {trend.id}</span>
//               <span>
//                 {new Date(trend.created_at).toLocaleDateString()}
//               </span>
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

import { getTrends } from '@/lib/apis/get-trends.api'
import { TrendsResponse } from '@/lib/types/industry-request'

export default async function Page() {
const payload: TrendsResponse = await getTrends() ?? {
  count: 0,
  track_id: 0,
  trends: [],
}
  const isEmpty = !payload.trends || payload.trends.length === 0

  return (
    <div className="flex flex-col items-center gap-6 my-5">

      {isEmpty ? (

        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V8.625zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Trends Yet</h2>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            There are no industry trends available for this track right now. Check back soon.
          </p>
        </div>

      ) : (
        <>
          {/* Header */}
          <div className=" w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Industry Trends
            </h1>
            <p className="text-gray-500 mt-2">
              Number Of Skills : {payload.count} 
            </p>
          </div>

          {/* Cards */}
          {payload.trends.map((trend) => (
            <div
              key={trend.id}
              className="w-1/2 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {trend.skill_name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-4 mb-4">
                {trend.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Demand</span>
                  <span>{trend.demand_score}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-3">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${trend.demand_score * 10}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>ID: {trend.id}</span>
                <span>{new Date(trend.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  )
}