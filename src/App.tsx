import 'react-toastify/dist/ReactToastify.css';
import { DebtContent } from './components/DebtContent';
import { ToastContainer } from 'react-toastify';

import './global.scss'

function App() {

  return (
    <div className="content">      
      <DebtContent />       
      <ToastContainer autoClose={3000} position="bottom-right"/>
    </div>
  );
}

export default App;
