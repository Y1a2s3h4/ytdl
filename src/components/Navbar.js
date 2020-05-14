import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
      <div className="container">
        <Link to="/" class="navbar-brand" href="#">
          YT Downloader
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="basicExampleNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link to="/ytdl_thumbnail" class="nav-link" href="#">
                Download YT Thumbnail
                <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
