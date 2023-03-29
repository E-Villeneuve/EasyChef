/* All code below (w/ some modifications) from:
https://codesandbox.io/s/9m0l4?file=/src/styles.css */

import React, { useState } from "react";

import { Nav, Form } from "react-bootstrap";
import useOnclickOutside from "react-cool-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './searchstyle.css';

const Search = () => {
  const [search, setSearch] = useState()

  const toggle = () => setSearch(true)
  const closeSearch = () => (search === true ? setSearch(false) : null)
  const ref = useOnclickOutside(() => closeSearch())

  return (
    <Nav className="my-auto" ref={ref}>
      <Form
        className={
          search === false
            ? "navsearchbar fadeOutWidth"
            : search === true
            ? "navsearchbar fadeInWidth"
            : "navsearchbar"
        }
      >
        {search === true && (
          <input
            ref={ref}
            className={
              search === true
                ? "navsearch-input fadeIn"
                : search === false
                ? "navsearch-input fadeOut"
                : "navsearch-input"
            }
            type="text"
            name=""
            placeholder="Search..."
          />
        )}
        <div
            onClick={toggle}
          className={
            search === true
              ? "navsearchicon-bg fadeOut"
              : search === false
              ? "navsearchicon-bg fadeIn"
              : "navsearchicon-bg"
          }
        >
          {search !== true && (
            <FontAwesomeIcon
              onClick={toggle}
              className={
                search === true
                  ? "navsearch-icon fadeOut"
                  : search === false
                  ? "navsearch-icon fadeIn"
                  : "navsearch-icon"
              }
              icon={faSearch}
            />
          )}
        </div>
      </Form>
    </Nav>
  )
}

export default Search
