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
  {/* Nav bar template from https://getbootstrap.com/docs/5.3/components/navbar/ */}
  {/* Nav bar that should be used across all pages */}
  <nav
    className="navbar navbar-expand-lg bg-dark"
    data-bs-theme="dark"
    id="globalnavbar"
  >
    <div className="container-fluid" id="navbar-container">
      <div className="navbar-collapse">
        <a
          className="navbar-brand nav-link"
          href="home_page.html"
          id="nav-brand"
        >
          easy chef<span id="slogan">cooking has never been easier</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbar-items">
          <li className="nav-item" id="fst-link-btn">
            <a
              id="navlink"
              className="nav-link active"
              aria-current="page"
              href="home_page.html"
            >
              Home
            </a>
          </li>
          <li className="nav-item" id="nav-link-btn">
            <a id="navlink" className="nav-link" href="addrecipe.html">
              Create Recipes
            </a>
          </li>
          {/* Future phases: Should dynamically change, depending on if the user is signed in or not */}
          <li className="nav-item" id="nav-link-btn">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle nav-link"
                id="myprofiledrop"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Profile
              </button>
              <ul className="dropdown-menu" id="profiledropmenu">
                <li>
                  <a className="dropdown-item" href="#" id="fstprofileitem">
                    <div id="profiledrop_wrap">
                      <img
                        src="https://media.tenor.com/YvQjG-6UJ5YAAAAC/hour-glass-dog-dog-spin.gif"
                        alt="dog"
                        id="profilepic"
                      />
                    </div>
                    gusteau lol
                    <br />
                    fat_albert@gmail.com
                    <br />
                    855-444-8888
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="EditProfile.html">
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="MyRecipes.html">
                    My Recipes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="shop_page.html">
                    My Shopping List
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="SignUp.html"
                    id="lastprofileitem"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* Search bar */}
        <form
          className="d-flex"
          role="search"
          id="globnavsearc"
          action="SearchPage.html"
        >
          <div className="dropdown">
            <button
              className="btn btn-outline-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </button>
            <div className="dropdown-menu" id="filter">
              <div className="row">
                <h6 className="text-center">Cuisine:</h6>
              </div>
              <div className="searchcategory">
                <div className="col leftcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Dutch
                    </label>
                  </div>
                </div>
                <div className="col rightcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Thai
                    </label>
                  </div>
                </div>
                <div className="col leftcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Welsh
                    </label>
                  </div>
                </div>
                <div className="col rightcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Arab
                    </label>
                  </div>
                </div>
              </div>{" "}
              {/* End of cuisine category */}
              <div className="row">
                <h6 className="text-center">Cooking Time:</h6>
              </div>
              <div className="searchcategory">
                <div className="col leftcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      &lt;1hr
                    </label>
                  </div>
                </div>
                <div className="col leftcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      ~1hr
                    </label>
                  </div>
                </div>
                <div className="col rightcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      ~2hr
                    </label>
                  </div>
                </div>
                <div className="col rightcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      ~3hr
                    </label>
                  </div>
                </div>
              </div>{" "}
              {/* End of cooking time category */}
              <div className="row">
                <h6 className="text-center">Diet:</h6>
              </div>
              <div className="searchcategory diet">
                <div className="col leftcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Halal
                    </label>
                  </div>
                </div>
                <div className="col rightcol">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="flexCheckDefault"
                      id="flexCheckDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Vegan
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* End of diet category */}
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit" id="navbtn">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
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
