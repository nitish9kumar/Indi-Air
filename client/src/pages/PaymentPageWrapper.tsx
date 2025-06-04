import { useEffect } from 'react';
import PaymentPage from '../components/PaymentPage';

const PaymentPageWrapper: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('pageName', 'Payment Page');
  }, []);
  return (
    <div className="payment-page-wrapper">
      <PaymentPage 
        selectedSeats={[]} 
        totalAmount={0} 
        onBack={() => console.log('Back button clicked')} 
        onComplete={() => console.log('Complete button clicked')} 
      />
    </div>
  );
};

export default PaymentPageWrapper;