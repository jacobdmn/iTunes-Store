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
              x: 200 * index,
              y: 0,
              fixed: true,
              font: { size: 30 },
            },
          ];
          albums = [
            ...albums,
            {
              id: albumId,
              label: albumName,
              from: albumId, /// just to be more readile
              to: artistId,
              x: 300 * index,
              y: 100,
              font: { size: 20 },
            },
          ];
          songs = [
            ...songs,
            {
              id: trackId,
              label: trackName,
              from: trackId,
              to: albumId,
              shape: "circularImage",
              image: trackImage,
              x: 500 * index,
              y: 300,
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
        stabilization: true,
        minVelocity: 0.75,
      },
      nodes: {
        borderWidth: 0,
        size: 50,
        //   fixed: true,
        //   physics: false,
        color: {
          border: "#000000e8",
          background: "#000000e8",
        },

        shadow: true,
        font: {
          // size: 30,
          // size: "20",
          color: "#fefefe",
        },
      },

      edges: {
        smooth: {
          type: "diagonalCross",
          forceDirection: false, // do not allow
          roundness: 0.35,
        },
        color: "lightgray",
      },
      layout: {
        randomSeed: undefined,
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          // levelSeparation: 150,
          direction: "UD", // UD, DU, LR, RL
          sortMethod: "directed", // hubsize, directed
        },
      },
      interaction: {
        //   dragNodes: false, // do not allow dragging nodes
        zoomView: false, // do not allow zooming
        dragView: false, // do not allow dragging
      },
    };
    // create a network
    let dataForNetwork = {
      nodes: nodes,
      edges: edges,
    };
    let network =
      mynetwork && new Network(mynetwork.current, dataForNetwork, options);

    //// Canvas position
    let width = 600;
    let height = 600;
    network.moveTo({
      position: { x: 0, y: 0 },
      offset: { x: -width / 2, y: -height / 2 },
      scale: 1,
    });
  }, []);

  return (
    <div className='statistics'>
      <h2>Stats</h2>
      <div id='mynetwork' ref={mynetwork}></div>
    </div>
  );
};

export default Statistics;
