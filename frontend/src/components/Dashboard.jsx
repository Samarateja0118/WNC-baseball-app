import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PitcherSelector from './PitcherSelector';
import PitchSummaryTable from './PitchSummaryTable';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Dashboard = () => {
  const [pitchers, setPitchers] = useState([]);
  const [selectedPitcher, setSelectedPitcher] = useState(null);
  const [pitchData, setPitchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingPitchers, setLoadingPitchers] = useState(true);

  // Fetch available pitchers on component mount
  useEffect(() => {
    fetchPitchers();
  }, []);

  // Fetch pitch data when a pitcher is selected
  useEffect(() => {
    if (selectedPitcher) {
      fetchPitchData(selectedPitcher.id || selectedPitcher.name);
    }
  }, [selectedPitcher]);

  const fetchPitchers = async () => {
    try {
      setLoadingPitchers(true);
      const response = await axios.get('http://localhost:5001/api/pitchers');
      setPitchers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pitchers:', err);
      // Use fallback pitcher list if API fails
      const fallbackPitchers = [
        { id: 'pitcher_1', name: 'Logan Webb' },
        { id: 'pitcher_2', name: 'Carlos Rodón' },
        { id: 'pitcher_3', name: 'Garrett Crochet' },
        { id: 'pitcher_4', name: 'Zac Gallen' },
        { id: 'pitcher_5', name: 'Max Fried' },
        { id: 'pitcher_6', name: 'Jake Irvin' },
        { id: 'pitcher_7', name: 'MacKenzie Gore' },
        { id: 'pitcher_8', name: 'Brad Lord' },
        { id: 'pitcher_9', name: 'Jose A. Ferrer' },
        { id: 'pitcher_10', name: 'Matt Waldron' }
      ];
      setPitchers(fallbackPitchers);
      setError('Using demo data - Database connection pending');
    } finally {
      setLoadingPitchers(false);
    }
  };

  const fetchPitchData = async (pitcherId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5001/api/pitcher/${pitcherId}/summary`);
      setPitchData(response.data);
    } catch (err) {
      console.error('Error fetching pitch data:', err);
      // Use demo data if API fails
      const demoData = generateDemoData(selectedPitcher.name);
      setPitchData(demoData);
      setError('Using demo data - Database connection pending');
    } finally {
      setLoading(false);
    }
  };

  // Generate realistic demo data for demonstration
  const generateDemoData = (pitcherName) => {
    const pitchTypes = ['4-Seam Fastball', 'Slider', 'Changeup', 'Curveball', 'Sinker'];
    const data = [];
    let remainingPercentage = 100;

    pitchTypes.forEach((type, index) => {
      const isLast = index === pitchTypes.length - 1;
      const usage = isLast ? remainingPercentage : Math.random() * 30 + 10;
      remainingPercentage -= usage;

      data.push({
        pitch_type: type,
        pitch_count: Math.floor(Math.random() * 500 + 100),
        usage_percentage: parseFloat(usage.toFixed(2)),
        avg_speed: parseFloat((Math.random() * 10 + 85).toFixed(2)),
        avg_horizontal_break: parseFloat((Math.random() * 20 - 10).toFixed(2)),
        avg_induced_vertical_break: parseFloat((Math.random() * 20 - 10).toFixed(2)),
        avg_spin_rate: Math.floor(Math.random() * 500 + 2000),
        avg_exit_speed: parseFloat((Math.random() * 15 + 82).toFixed(2)),
        avg_launch_angle: parseFloat((Math.random() * 30 + 5).toFixed(2))
      });
    });

    return data.filter(d => d.usage_percentage > 0);
  };

  const handlePitcherSelect = (pitcher) => {
    setSelectedPitcher(pitcher);
    setPitchData([]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8 fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          2025 Season Pitch Analysis Dashboard
        </h1>
        <p className="text-gray-600">
          Select a pitcher to view their comprehensive pitch statistics and metrics
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select a Pitcher
            </h2>
            {loadingPitchers ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <PitcherSelector
                pitchers={pitchers}
                selectedPitcher={selectedPitcher}
                onSelectPitcher={handlePitcherSelect}
              />
            )}
          </div>

          {selectedPitcher && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6 fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Pitcher Info
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Name:</span> {selectedPitcher.name}
                </p>
                {pitchData.length > 0 && (
                  <>
                    <p className="text-gray-600">
                      <span className="font-medium">Total Pitches:</span>{' '}
                      {pitchData.reduce((sum, p) => sum + p.pitch_count, 0)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Pitch Types:</span> {pitchData.length}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {!selectedPitcher ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                No Pitcher Selected
              </h3>
              <p className="text-gray-400">
                Select a pitcher from the list to view their pitch statistics
              </p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow-lg p-12">
              <div className="flex flex-col items-center justify-center">
                <LoadingSpinner />
                <p className="text-gray-500 mt-4">Loading pitch data...</p>
              </div>
            </div>
          ) : pitchData.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pitch Summary - {selectedPitcher.name}
              </h2>
              <PitchSummaryTable data={pitchData} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500">No pitch data available for this pitcher</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Statistics Cards */}
      {selectedPitcher && pitchData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 fade-in">
          <div className="stat-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Primary Pitch</h4>
            <p className="text-2xl font-bold text-baseball-green">
              {pitchData[0]?.pitch_type || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {pitchData[0]?.usage_percentage}% usage
            </p>
          </div>

          <div className="stat-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Average Velocity</h4>
            <p className="text-2xl font-bold text-baseball-green">
              {(pitchData.reduce((sum, p) => sum + p.avg_speed * p.pitch_count, 0) /
                pitchData.reduce((sum, p) => sum + p.pitch_count, 0)).toFixed(1)} mph
            </p>
            <p className="text-sm text-gray-600 mt-1">Across all pitches</p>
          </div>

          <div className="stat-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Average Spin Rate</h4>
            <p className="text-2xl font-bold text-baseball-green">
              {Math.round(pitchData.reduce((sum, p) => sum + p.avg_spin_rate * p.pitch_count, 0) /
                pitchData.reduce((sum, p) => sum + p.pitch_count, 0))} rpm
            </p>
            <p className="text-sm text-gray-600 mt-1">Weighted average</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
