import './home.css';
import '../Globals/globals.css';
import NavBar from '../Globals/NavBar';
import AboutUs from './AboutUs';
import HomeCarousel from './HomeCarousel';

function Home() {
  return (
    <>
  <title>Home Page</title>
  {/* Link from https://getbootstrap.com/ */}
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossOrigin="anonymous"
  />
  <meta charSet="utf-8" />
  <NavBar></NavBar>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <div className="navbar-collapse" id="featuredtitle">
        <h1>Featured</h1>
        <h5 id="featuredsubtitle">Some of our favourites</h5>
      </div>
    </div>
  </nav>
  <HomeCarousel></HomeCarousel>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <br />
    </div>
  </nav>
  <AboutUs></AboutUs>
</>
  );
}

export default Home;
