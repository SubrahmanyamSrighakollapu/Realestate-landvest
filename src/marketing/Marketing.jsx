import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import GetInTouch from './GetInTouch';
import ProjectsCompleted from './pages/projects/ProjectsCompleted';
import OngoingProjects from './pages/projects/OngoingProjects';
import UpcomingProjects from './pages/projects/UpcomingProjects';
import ProjectDetails from './pages/projects/ProjectDetails';

const Marketing = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden', margin: 0, padding: 0 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects/completed" element={<ProjectsCompleted />} />
        <Route path="/projects/completed/:id" element={<ProjectDetails />} />
        <Route path="/projects/ongoing" element={<OngoingProjects />} />
        <Route path="/projects/ongoing/:id" element={<ProjectDetails />} />
        <Route path="/projects/upcoming" element={<UpcomingProjects />} />
        <Route path="/projects/upcoming/:id" element={<ProjectDetails />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<GetInTouch />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Marketing;