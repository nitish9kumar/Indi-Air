import { useEffect } from 'react';
import SeatSelection from '../components/SeatSelection';

const SeatSelectionPage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('pageName', 'Seat Selection Page');
  }, []);
  return (
    <div className="seat-selection-page">
      <SeatSelection />
    </div>
  );
};

export default SeatSelectionPage;