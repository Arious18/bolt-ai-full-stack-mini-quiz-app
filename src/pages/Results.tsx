import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import useStore from '../store/useStore';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  
  if (!currentUser || !currentUser.results.length) {
    return null;
  }

  const latestResult = currentUser.results[currentUser.results.length - 1];
  const percentage = (latestResult.score / latestResult.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Quiz Completed!
            </h1>
            <p className="mt-2 text-gray-600">
              Here's how you performed
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-lg bg-gray-50 p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Score</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {latestResult.score}/{latestResult.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Percentage</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Information
              </h2>
              <div className="rounded-lg border border-gray-200 p-4">
                <p><span className="font-medium">Name:</span> {currentUser.name}</p>
                <p><span className="font-medium">Email:</span> {currentUser.email}</p>
                <p><span className="font-medium">Date:</span> {new Date(latestResult.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start New Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;