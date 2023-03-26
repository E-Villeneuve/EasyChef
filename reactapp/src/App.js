import logo from './logo.svg';
import './home.css';
import './globals.css';

function App() {
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
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <div className="navbar-collapse" id="featuredtitle">
        <h1>Featured</h1>
        <h5 id="featuredsubtitle">Some of our favourites</h5>
      </div>
    </div>
  </nav>
  {/* Carousel template from https://getbootstrap.com/docs/5.3/components/carousel/
    Note: Carousel buttons will not work w/o JS (which is for future phases) */}
  <div className="carousel slide">
    <div className="carousel-inner">
      <div className="carousel-item active">
        {/* Card template from https://getbootstrap.com/docs/5.3/components/card/ */}
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a
              href="recipe.html"
              className="btn btn-primary"
              action="recipe.html"
            >
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="card">
          <div className="img_wrap">
            <img
              src="https://cdn.cdkitchen.com/recipes/images/2017/09/92201-7644-mx.jpg"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Chocolate Spaghetti</h4>
            <h6>Cook Time: 1hr 15min</h6>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <a href="recipe.html" className="btn btn-primary">
              View
            </a>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <br />
    </div>
  </nav>
  <div className="about_us_wrap">
    <div className="about_us_title">
      <h3>About Us</h3>
    </div>
    <div className="container-lg about_us_text">
      <p>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
        type specimen book. It usually begins with:
        <br />
        <br />
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.”
        <br />
        <br />
        The purpose of lorem ipsum is to create a natural looking block of text
        (sentence, paragraph, page, etc.) that doesn't distract from the layout.
        A practice not without controversy, laying out pages with meaningless
        filler text can be very useful when the focus is meant to be on design,
        not content.
        <br />
        <br />
        The passage experienced a surge in popularity during the 1960s when
        Letraset used it on their dry-transfer sheets, and again during the 90s
        as desktop publishers bundled the text with their software. Today it's
        seen all around the web; on templates, websites, and stock designs. Use
        our generator to get your own, or read on for the authoritative history
        of lorem ipsum.
      </p>
    </div>
  </div>
</>
  );
}

export default App;
