import React, { useState } from "react";
import axios from "axios";
import { Input, Icon } from "react-atomize";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
export default function YT_Thumbnail() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [dataURL, setDataURL] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const ytdl_fetch = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.get(`https://apiytdl.herokuapp.com/v?input=${input}`).then((res) => {
      console.log(res);
      console.log(res.data);
      setData(res.data);
      setLoading(false);

      let len = res.data[0].thumbnail_urls.thumbnails.length - 1;
      axios
        .get(
          `https://apiytdl.herokuapp.com/q?dataUrl=${res.data[0].thumbnail_urls.thumbnails[len].url}`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setDataURL(res.data);
        });
    });
  };

  const onChange = (e) => {
    setInput(e.target.value);
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
          <Input
            placeholder="E.g: https://www.youtube.com/watch?v=WNWZNyXSvW0"
            onChange={onChange}
            suffix={
              <Icon
                name="Search"
                size="20px"
                cursor="pointer"
                onClick={ytdl_fetch}
                pos="absolute"
                top="50%"
                right="1rem"
                transform="translateY(-50%)"
              />
            }
          />
        </div>
      </form>
      <div className="container">
        {isLoading && (
          <center>
            <Icon name="Loading3" size="100px" />
          </center>
        )}
        {data.map((item, index) => {
          const url = item.thumbnail_urls.thumbnails.length - 1;
          return (
            <center key={index}>
              {" "}
              <br />
              <div className="card shadow" style={{ maxWidth: "55rem" }}>
                <img
                  src={item.thumbnail_urls.thumbnails[url].url}
                  id="img"
                  className="img-fluid"
                  alt="..."
                />
                <a
                  href={dataURL.dataURL}
                  download="thumbnail.jpeg"
                  className="download"
                >
                  {" "}
                  Download{" "}
                  <Icon
                    name="Download"
                    size="16px"
                    m={{ b: "5px" }}
                    color="white"
                  />
                </a>
              </div>
            </center>
          );
        })}
      </div>
    </div>
  );
}
