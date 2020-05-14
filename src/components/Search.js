import React from "react";

export default function search() {
  return (
    <div className="container">
      <h1 className="my-5 heading text-white text-center text-uppercase">
        Search For YouTube Video
      </h1>
      <form>
        <div class="form-group">
          <label for="input" className="text-white">
            Enter YouTube Video Link
          </label>
          <input
            type="email"
            class="form-control"
            id="input"
            placeholder="https://www.youtube.com/watch?v=WNWZNyXSvW0"
          />
        </div>
      </form>
    </div>
  );
}
