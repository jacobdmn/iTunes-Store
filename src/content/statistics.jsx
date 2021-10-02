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
              // fixed: true,
              font: { size: 100 },
              // widthConstraint: 1000,
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
              font: { size: 100 },
              // widthConstraint: 700,
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
              font: { size: 100 },
              size: 200,
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
          avoidOverlap: null,
        },
        minVelocity: 0.75,
        solver: "hierarchicalRepulsion",
      },
      nodes: {
        borderWidth: null,
        borderWidthSelected: null,

        widthConstraint: 800,
        heightConstraint: 400,
        margin: 20,
        shape: "box",
        // levelSeparation: 300,
        //   fixed: true,
        //   physics: false,

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
        // randomSeed: undefined,
        // improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 1000,
          direction: "DU", // UD, DU, LR, RL
          sortMethod: "directed", // hubsize, directed
          nodeSpacing: 600,
          treeSpacing: 600,
          // blockShifting: false,
          // edgeMinimization: false,
          // parentCentralization: false,
          // shakeTowards: "leaves", // roots, leaves
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

  return (
    <div className='statistics'>
      <h2>Stats</h2>
      <div id='mynetwork' ref={mynetwork}></div>
    </div>
  );
};

export default Statistics;
