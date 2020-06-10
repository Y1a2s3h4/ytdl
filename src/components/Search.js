import React, { Component } from "react";
import axios from "axios";
// import rightArrow from "../right-up-arrow.svg";
import { Input, Icon, Div, Text } from "react-atomize";
export default class Search extends Component {
  state = {
    input: "",
    data: [],
    isLoading: false,
  };
  search = (e) => {
    e.preventDefault();
    const { input } = this.state;
    this.setState({ isLoading: true });
    axios.get(`https://apiytdl.herokuapp.com/v?input=${input}`).then((res) => {
      this.setState({ data: res.data, isLoading: false });
      console.log(res.data);
    });
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    const preciseCount = (val) => {
      let s = ["", "K", "M", "B", "T"];
      let sNum = Math.floor(("" + val).length / 3);
      let sVal = parseFloat(
        (sNum != 0 ? val / Math.pow(1000, sNum) : val).toPrecision(3)
      );
      if (sVal % 1 != 0) {
        sVal = sVal.toFixed(1);
      }
      return sVal + s[sNum];
    };
    return (
      <div className="container">
        <h1 className="my-5 heading text-center text-uppercase">
          Search For YouTube Video
        </h1>
        <form onSubmit={this.search}>
          <div className="form-group">
            <label htmlFor="input" className="text-white">
              Enter YouTube Video Link
            </label>
            <Input
              placeholder="E.g: https://www.youtube.com/watch?v=WNWZNyXSvW0"
              onChange={this.onChange}
              suffix={
                <Icon
                  name="Search"
                  size="20px"
                  cursor="pointer"
                  onClick={this.search}
                  pos="absolute"
                  top="50%"
                  right="1rem"
                  transform="translateY(-50%)"
                />
              }
            />
          </div>
        </form>
        {this.state.isLoading && (
          <center>
            <Icon name="Loading3" size="100px" />
          </center>
        )}
        {this.state.data.map((item) => {
          const url = item.thumbnail_urls.thumbnails.length - 1;
          return (
            <div className="c-background mt-4">
              <Div
                d="flex"
                bg="gray300"
                w="100%"
                bgPos="center"
                rounded="md"
                p="7px"
                m={{ b: "1rem" }}
              >
                <img src={item.avatar_url} className="avatar" alt="avatar" />
                <h6 className="title">
                  <a href={item.channel_url} className="t-hover">
                    {item.title}
                  </a>
                </h6>
              </Div>
              <h6 className="subscribers_count">
                Total Subscribers: {preciseCount(item.subscribers_count)}
              </h6>
              <h6 className="total_views">
                Total Views: {preciseCount(item.view_count)}
              </h6>
              <h6 className="video_quality">Video Quality: {item.quality}</h6>
              <h6 className="tags">
                Tags Used for Video: {item.keywords.join(",")}
              </h6>
              <Div
                bg="info600"
                d="flex"
                color="white"
                p="1rem"
                rounded="md"
                textColor="white"
                className="infoIcon"
                m={{ t: "1.5rem" }}
              >
                <Icon name="Info" size="25px" m={{ r: "1rem" }} color="white" />
                <Text tag="h6" textColor="white" className="infoHead">
                  How To Download Video & Audio File
                  <ol type="1" className="tooltip">
                    <li>
                      To download Video Tap Three Dots in Bottom Right Corner &
                      Click on Download
                    </li>{" "}
                    <li>
                      To download Audio Tap Three Dots in Right Side & Click on
                      Download
                    </li>{" "}
                  </ol>
                </Text>
              </Div>
              <br />
              <video
                controls
                poster={item.thumbnail_urls.thumbnails[url].url}
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                <source
                  src={`${item.video_url}`}
                  type={`video/${item.video_extension}`}
                />
              </video>{" "}
              <audio controls>
                <source
                  src={`${item.audio_url}`}
                  type={`audio/${item.audio_extension}`}
                />
              </audio>{" "}
              <br />
              <p>
                Icons made by{" "}
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  title="Freepik"
                >
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  {" "}
                  www.flaticon.com
                </a>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
