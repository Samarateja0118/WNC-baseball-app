import React, { useState } from 'react';

const PitchSummaryTable = ({ data }) => {
  const [sortField, setSortField] = useState('pitch_count');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const formatValue = (value, type) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    switch (type) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'speed':
        return `${value.toFixed(1)} mph`;
      case 'break':
        return `${value.toFixed(1)} in`;
      case 'spin':
        return `${Math.round(value)} rpm`;
      case 'angle':
        return `${value.toFixed(1)}°`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="pitch-table min-w-[1200px]">
        <thead>
          <tr>
            <th className="rounded-tl-lg">
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('pitch_type')}
              >
                <span>Pitch Type</span>
                <SortIcon field="pitch_type" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('pitch_count')}
              >
                <span>Count</span>
                <SortIcon field="pitch_count" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('usage_percentage')}
              >
                <span>Usage %</span>
                <SortIcon field="usage_percentage" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_speed')}
              >
                <span>Avg Speed</span>
                <SortIcon field="avg_speed" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_horizontal_break')}
              >
                <span>H-Break</span>
                <SortIcon field="avg_horizontal_break" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_induced_vertical_break')}
              >
                <span>V-Break</span>
                <SortIcon field="avg_induced_vertical_break" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_spin_rate')}
              >
                <span>Spin Rate</span>
                <SortIcon field="avg_spin_rate" />
              </button>
            </th>
            <th>
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_exit_speed')}
              >
                <span>Exit Velo</span>
                <SortIcon field="avg_exit_speed" />
              </button>
            </th>
            <th className="rounded-tr-lg">
              <button
                className="flex items-center space-x-1 hover:opacity-80"
                onClick={() => handleSort('avg_launch_angle')}
              >
                <span>Launch Angle</span>
                <SortIcon field="avg_launch_angle" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((pitch, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="font-medium text-gray-800">{pitch.pitch_type}</td>
              <td className="text-center">{formatValue(pitch.pitch_count)}</td>
              <td className="text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {formatValue(pitch.usage_percentage, 'percentage')}
                </span>
              </td>
              <td className="text-center">{formatValue(pitch.avg_speed, 'speed')}</td>
              <td className="text-center">{formatValue(pitch.avg_horizontal_break, 'break')}</td>
              <td className="text-center">{formatValue(pitch.avg_induced_vertical_break, 'break')}</td>
              <td className="text-center">{formatValue(pitch.avg_spin_rate, 'spin')}</td>
              <td className="text-center">{formatValue(pitch.avg_exit_speed, 'speed')}</td>
              <td className="text-center">{formatValue(pitch.avg_launch_angle, 'angle')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-500">
        <p>* H-Break: Horizontal Break | V-Break: Induced Vertical Break</p>
        <p>* Click column headers to sort data</p>
      </div>
    </div>
  );
};

export default PitchSummaryTable;
