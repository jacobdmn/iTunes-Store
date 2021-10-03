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
    favoriteList
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
              label: artistName,
              title: artistName,
              fixed: true,
              font: { size: 30 },
            },
          ];
          albums = [
            ...albums,
            {
              id: albumId,
              label: albumName,
              title: albumName,
              from: albumId, /// just to be more readile
              to: artistId,
              font: { size: 20 },
            },
          ];
          songs = [
            ...songs,
            {
              id: trackId,
              label: trackName,
              title: trackName,
              from: trackId,
              to: albumId,
              shape: "circularImage",
              image: trackImage,
              font: { size: 20 },
            },
          ];
        }
      );

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
        margin: 20,
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
          // direction: "UD", // UD, DU, LR, RL
          // sortMethod: "hubsize", // hubsize, directed
          // levelSeparation: 250,
          // nodeSpacing: 600,
          // treeSpacing: 600,
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
