import { getTrends } from '@/lib/apis/get-trends.api';
import { Trends } from '@/lib/types/industry-request';
import React from 'react';

export default async function Page() {

//   const STATIC_TRENDS = [
//   { name: 'AI Agents',        category: 'Artificial Intelligence', volume: '142,300', change: '+18.4%', region: 'Global' },
//   { name: 'Open Source LLMs', category: 'Developer Tools',         volume: '98,750',  change: '+11.2%', region: 'US, EU' },
//   { name: 'Edge Computing',   category: 'Infrastructure',          volume: '77,400',  change: '−3.1%',  region: 'APAC'   },
//   { name: 'Quantum ML',       category: 'Research',                volume: '51,200',  change: '+27.9%', region: 'Global' },
//   { name: 'RAG Systems',      category: 'Artificial Intelligence', volume: '44,880',  change: '+9.6%',  region: 'US'     },
//   { name: 'Voice AI',         category: 'Consumer Tech',           volume: '39,100',  change: '−1.4%',  region: 'Global' },
// ];

// const track_id = 7;
//   const trends = STATIC_TRENDS;
//   const count = trends.length;
  const payload: Trends = await getTrends();
  const { count, track_id, trends } = payload;

  return (
  <div className="min-h-screen bg-[#f8f8f6] dark:bg-zinc-950 px-6 py-12 font-sans">

    {/* Header */}
    <div className="text-center mb-14">
      <p className="text-[10px] tracking-[0.25em] uppercase text-mainColor font-semibold mb-4">
        Trending Now
      </p>
      <div className="flex items-center justify-center gap-2 mb-5">
        <span className="text-xs font-medium px-4 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-gray-100 tracking-wide">
          Track #{track_id}
        </span>
        <span className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-gray-400">
          {count} trends
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-[-0.025em] text-mainColor dark:text-white leading-[1.15] mb-2.5"
          style={{ fontFamily: "'Syne', sans-serif" }}>
        What's moving the market
      </h1>
      <p className="text-[12.5px] text-slate-500 dark:text-slate-400 tracking-wide">
        Live trends for this track — updated in real time
      </p>
      <div className="w-8 h-[1.5px] bg-slate-300 dark:bg-zinc-600 mx-auto mt-6 rounded-full" />
    </div>

    {/* Grid or Empty */}
    {trends.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trends.map((trend, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-100 dark:border-zinc-800 overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] cursor-default"
          >
            {/* Top row: index + dot */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] tracking-[0.1em] text-slate-300 dark:text-zinc-600 font-medium">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-700 group-hover:bg-mainColor transition-colors duration-200" />
            </div>

            {Object.entries(trend).map(([key, value], i) => (
              <div key={key} className="mb-3.5 last:mb-0">
                <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500 mb-1 font-medium">
                  {key}
                </p>
                <p className={[
                  i === 0
                    ? 'text-[18px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white leading-tight'
                    : 'text-[13px] text-slate-500 dark:text-slate-400 font-normal',
                  key === 'change' && String(value).startsWith('+')
                    ? '!text-green-600 dark:!text-green-400 !font-medium'
                    : '',
                  key === 'change' && String(value).startsWith('−')
                    ? '!text-red-500 dark:!text-red-400 !font-medium'
                    : '',
                ].filter(Boolean).join(' ')}>
                  {String(value)}
                </p>
              </div>
            ))}

            {/* Bottom line animation */}
            <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-0 group-hover:w-full bg-mainColor rounded-full transition-all duration-500 ease-out" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-700 flex items-center justify-center">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-mainColor dark:text-gray-100">No trends yet</h2>
        <p className="text-sm text-slate-500 font-normal">Check back later for new trends</p>
      </div>
    )}
  </div>
);
}