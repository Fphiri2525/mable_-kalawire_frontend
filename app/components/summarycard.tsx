// components/dashboard/cards/SummaryCard.tsx
'use client';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color: 'indigo' | 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'pink';
  isCurrency?: boolean;
}

const colorVariants = {
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-500/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-500/10',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-500/30',
    iconBg: 'bg-green-100 dark:bg-green-500/20'
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-500/30',
    iconBg: 'bg-blue-100 dark:bg-blue-500/20'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-500/30',
    iconBg: 'bg-purple-100 dark:bg-purple-500/20'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-500/30',
    iconBg: 'bg-orange-100 dark:bg-orange-500/20'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-500/30',
    iconBg: 'bg-red-100 dark:bg-red-500/20'
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-500/10',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-500/30',
    iconBg: 'bg-pink-100 dark:bg-pink-500/20'
  }
};

export default function SummaryCard({ title, value, icon, trend, color, isCurrency = false }: SummaryCardProps) {
  const colors = colorVariants[color];

  const formatValue = (val: string | number) => {
    if (isCurrency && typeof val === 'number') {
      return `$${val.toLocaleString()}`;
    }
    if (isCurrency && typeof val === 'string' && !isNaN(Number(val))) {
      return `$${Number(val).toLocaleString()}`;
    }
    return val;
  };

  return (
    <div className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
      `${colors.bg} ${colors.border} dark:bg-charcoal-800/50 dark:backdrop-blur-sm dark:hover:bg-charcoal-800 hover:shadow-xl`
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className={`text-2xl font-bold mt-2 ${colors.text}`}>
            {formatValue(value)}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <span className={`text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-xs ml-1 text-gray-400 dark:text-gray-500">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.iconBg}`}>
          <div className={`w-6 h-6 ${colors.text}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}