import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import JobDetail from './routes/JobDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <h1>Hello</h1>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
