import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className='relative flex flex-col min-h-screen text-gray-200'>
      <div className='container mx-auto px-4'>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
