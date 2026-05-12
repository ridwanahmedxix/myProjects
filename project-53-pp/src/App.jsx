import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Technologies from './sections/Technologies';
import GitHubStats from './sections/GitHubStats';
import Achievements from './sections/Achievements';
import FeaturedProjects from './sections/FeaturedProjects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Technologies />
      <GitHubStats />
      <Achievements />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
