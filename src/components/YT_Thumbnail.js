import React, { useState } from "react";
import axios from "axios";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
export default function YT_Thumbnail() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [dataURL, setDataURL] = useState([]);
  const ytdl_fetch = (event) => {
    event.preventDefault();
    axios.get(`https://apiytdl.herokuapp.com/v?input=${input}`).then((res) => {
      console.log(res);
      console.log(res.data);
      setData(res.data);
    });
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const dataUrl = (url) => {
    axios.get(`https://apiytdl.herokuapp.com/q?dataUrl=${url}`).then((res) => {
      console.log(res);
      console.log(res.data);
      setDataURL(res.data);
    });
  };

  return (
    <div className="container">
      <h1 className="my-5 heading text-center text-uppercase">
        Search For YouTube Thumbnail
      </h1>
      <form onSubmit={ytdl_fetch}>
        <div className="form-group">
          <label htmlFor="input" className="text-white">
            Enter YouTube Video Link
          </label>
          <input
            type="text"
            className="form-control"
            id="input"
            onChange={onChange}
            placeholder="E.g: https://www.youtube.com/watch?v=WNWZNyXSvW0"
          />
        </div>
      </form>
      <div className="container">
        {data.map((item, index) => {
          const url = item.thumbnail_urls.thumbnails.length - 1;
          return (
            <center key={index}>
              {" "}
              <br />
              <div className="card shadow" style={{ width: "55rem" }}>
                <img
                  src={item.thumbnail_urls.thumbnails[url].url}
                  id="img"
                  className="card-img-top"
                  alt="..."
                />
                <a
                  onClick={() => {
                    dataUrl(item.thumbnail_urls.thumbnails[url].url);
                  }}
                  href={dataURL.dataURL}
                  target="_blank"
                  download="thumbnail.jpeg"
                >
                  Download &darr;
                </a>
              </div>
            </center>
          );
        })}
      </div>
    </div>
  );
}
