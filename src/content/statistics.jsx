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
    favoriteList.forEach(
      (
        {
          trackId,
          trackName,
          trackImage,
          trackImageIcon,
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
            label: `Artist: ${artistName.slice(0, 20)}`,
            title: `Artist: ${artistName.slice(0, 20)}`,
            fixed: true,
            font: { size: 23 },
            color: { background: "#7f1734" },
          },
        ];
        artists.forEach((artist) => {
          artists.forEach((artist2) => {
            if (artist.label === artist2.label && artist2.id !== artist.id) {
              artist2.id = artist.id;
              artist2.label = artist.label;
            }
          });
        });

        albums = [
          ...albums,
          {
            id: albumId,
            label: `Album: ${albumName.slice(0, 20)}`,
            title: `Album: ${albumName.slice(0, 20)}`,
            from: albumId, /// just to be more readile
            to: artists[index].id,
            font: { size: 18 },
            widthConstraint: 150,
            hidden: false,
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
            artistID: artists[index].id,
            shape: "circularImage",
            image: trackImageIcon,
            font: { size: 15 },
          },
        ];
      }
    );

    //// GET TOP 5 FAVORITE ARTISTS
    let mostFive = [];
    let toArtists = [];
    albums.forEach((album) => (toArtists = [...toArtists, album.to]));
    // toArtists = [...new Set(toArtists)];
    let lengthOne = false;
    while (toArtists.length && !lengthOne) {
      let node = toArtists[0];
      let howFrequant = 1;

      for (let i = 1; i < toArtists.length; i++)
        if (toArtists[i] === node) howFrequant++;

      mostFive = [...mostFive, [node, howFrequant]];
      toArtists = toArtists.filter((toArtist) => node !== toArtist);

      if (toArtists.length === 1) {
        lengthOne = true;
        mostFive = [...mostFive, [toArtists[0], 1]];
      }
    }
    // alert(mostFive);
    mostFive = mostFive
      .sort((a, b) => a[1] < b[1])
      .splice(0, 5)
      .map((a) => a[0]);

    /// get unique values function, WORKS ONLY FOR ARRAY OF OBJECTS
    const unique = (ARR = [], KEY) => [
      ...new Map(ARR.map((item) => [item[KEY], item])).values(),
    ];

    // returns unique elements in the arrays
    artists = unique(artists, "id");
    artists = artists.filter((artist) => mostFive.includes(artist.id));
    albums = unique(albums, "id");
    /// SONGS IN ALBUM > 1 ? SONG.TO = ALBUM.ID : SONG.TO = ALBUM.TO (== ARTIST.ID)
    let TOs = [];
    songs.forEach((song) => (TOs = [...TOs, song.to]));
    TOs.forEach((to, idx) => {
      delete TOs[idx];
      if (!TOs.includes(to)) {
        albums.forEach((album) => {
          if (to === album.from) {
            songs[idx].to = album.to;
            delete album.from;
            album.widthConstraint = 0;
            album.hidden = true;

            delete album.to;
            delete album.label;
          }
        });
        return;
      }
      TOs[idx] = to;
    });

    songs = songs.filter(
      (song) => mostFive.includes(song.to) || mostFive.includes(song.artistID)
    );

    /// wrap all edges in an array
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
        heightConstraint: true,
        margin: 10,
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
          // sortMethod: "directed",
          direction: "DU",
          // blockShifting: false,
          // edgeMinimization: false,
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
