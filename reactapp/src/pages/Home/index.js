import './home.css';
import '../../components/globals.css';
import NavBar from '../../components/NavBar';
import AboutUs from '../../components/AboutUs';
import RecipeCarousel from '../../components/RecipeCarousel';

function Home() {
  return (
    <>
  <title>Home Page</title>
  <NavBar></NavBar>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <div className="navbar-collapse" id="featuredtitle">
        <h1>Featured</h1>
        <h5 id="featuredsubtitle">Some of our favourites</h5>
      </div>
    </div>
  </nav>
  <RecipeCarousel></RecipeCarousel>
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
