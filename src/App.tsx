import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className='relative flex min-h-screen flex-col text-gray-200'>
      <div className='container mx-auto'>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
