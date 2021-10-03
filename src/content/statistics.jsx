import React, { useEffect, useRef, useContext } from "react";
import { UserContext } from "../data";
import { Network } from "vis-network";

const Statistics = () => {
  const { favoriteList } = useContext(UserContext);

  const mynetwork = useRef(null);
  // create an array with nodes

  useEffect(() => {
    let artists = [],
      albums = [],
      songs = [];
    let edgesValueWithoutLabel = [];

    /// get needed data and set it into arrays
    let data_STAT = favoriteList
      .slice(0, 6)
      .forEach(
        (
          {
            trackId,
            trackName,
            trackImage,
            albumId,
            albumName,
            artistId,
            artistName,
          },
          index
        ) => {
          artists = [
            ...artists,
            {
              id: artistId,
              label: artistName.slice(0, 20),
              title: artistName.slice(0, 20),
              fixed: true,
              font: { size: 23 },
            },
          ];
          albums = [
            ...albums,
            {
              id: albumId,
              label: albumName.slice(0, 20),
              title: albumName.slice(0, 20),
              from: albumId, /// just to be more readile
              to: artistId,
              font: { size: 18 },
              widthConstraint: 150,
            },
          ];
          songs = [
            ...songs,
            {
              id: trackId,
              label: trackName.slice(0, 20),
              title: trackName.slice(0, 20),
              from: trackId,
              to: albumId,
              shape: "circularImage",
              image: trackImage,
              font: { size: 15 },
            },
          ];
        }
      );

    ///// GET THE 5 MOST FAVORITE ARTISTS
    function mode(arr = [{}]) {
      return arr
        .sort(
          (a, b) =>
            arr.filter((v) => v === a).length -
            arr.filter((v) => v === b).length
        )
        .pop();
    }

    data_STAT = mode(data_STAT);
    console.log(data_STAT);
    const unique = (ARR = [], KEY) => [
      ...new Map(ARR.map((item) => [item[KEY], item])).values(),
    ];

    //// returns unique elements in the arrays
    artists = unique(artists, "id");
    albums = unique(albums, "id");

    /// deleting the label value to avoid repeating

    [albums, songs].forEach((node) => {
      node.forEach((el) => {
        let { from, to } = el;
        edgesValueWithoutLabel = [...edgesValueWithoutLabel, { from, to }];
      });
    });
    /// initialize nodes and edges for network
    let nodes = [...artists, ...albums, ...songs];
    let edges = edgesValueWithoutLabel;
    let options = {
      physics: {
        hierarchicalRepulsion: {
          centralGravity: 0,
          avoidOverlap: 0,
        },
        minVelocity: 0.75,
        solver: "hierarchicalRepulsion",
      },
      nodes: {
        borderWidth: 0,
        borderWidthSelected: 0,
        margin: 1,
        shape: "box",
        color: {
          border: "#000000e8",
          background: "#000000e8",
        },

        shadow: true,
        font: {
          color: "#fefefe",
        },
      },

      edges: {
        smooth: {
          forceDirection: "none",
        },
        color: "lightgray",
      },
      layout: {
        hierarchical: {
          enabled: true,
          sortMethod: "directed",
        },
      },
    };
    // create a network
    let dataForNetwork = {
      nodes: nodes,
      edges: edges,
    };
    mynetwork && new Network(mynetwork.current, dataForNetwork, options);
  }, [favoriteList]);

  return <div id='mynetwork' ref={mynetwork}></div>;
};

export default Statistics;
