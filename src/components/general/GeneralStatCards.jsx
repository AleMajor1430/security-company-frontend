import React from 'react'
import { TrendingUp } from 'lucide-react'

export default function GeneralStatCards({stats}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="card border rounded-lg overflow-hidden shadow-sm"
                >
                    <div className="card-header flex items-center justify-between">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                            {stat.icon}
                        </div>
                        <p className="card-title text-sm font-medium text-gray-500">{stat.title}</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950 p-4">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {stat.value.toLocaleString()} {/* Format numbers with commas */}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-blue-500 dark:text-blue-600">
                            <TrendingUp size={18} />
                            {stat.percentage}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
