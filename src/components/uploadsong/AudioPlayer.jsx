import React, { useState, useRef, useEffect } from "react";
import audioplayerstyle from "./AudioPlayer.module.css";

function AudioPlayer() {
  const initialValue = [
    {
      songname: "Start Adding Songs to Play",
      url: "",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [songs, setsongs] = useState(initialValue);
  const [name, setname] = useState(null);
  const [currentsongindex, setcurrentsongindex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedcurrentsongindex = parseInt(
      localStorage.getItem("currentsongindex"),
      10
    );
    const storedsongs = JSON.parse(localStorage.getItem("songs"));
    console.log(storedcurrentsongindex, storedsongs);

    if (storedcurrentsongindex || storedsongs) {
      setcurrentsongindex(storedcurrentsongindex);
      setsongs(storedsongs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentsongindex", currentsongindex.toString());
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [currentsongindex, songs]);

  const saveAudio = (event) => {
    const files = event.target.files;
    setsongs([
      ...songs,
      {
        songname: files[0].name,
        url: URL.createObjectURL(files[0]),
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ]);

    if (currentsongindex === null) {
      setcurrentsongindex(songs.length);
    }
  };

  const playNextSong = () => {
    setcurrentsongindex((prevIndex) => (prevIndex + 1) % songs.length);
    playaudio(currentsongindex + 1);
  };

  const playaudio = (index) => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.src = songs[index]?.url;
      audioElement.load();
      setname(songs[index]?.songname);
      setcurrentsongindex(index);
    }
  };

  return (
    <>
      <div className={audioplayerstyle.container}>
        <div className={audioplayerstyle.main}>
          <div>
            {songs.length !== 0 &&
              songs.map((song, index) => {
                const { songname } = song;
                return (
                  <div key={index} className={audioplayerstyle.list}>
                    <div style={{ padding: "0.5rem" }}>{songname}</div>
                    <button
                      onClick={() => playaudio(index)}
                      className={audioplayerstyle.button}
                    >
                      Play
                    </button>
                  </div>
                );
              })}
          </div>
          <div className={audioplayerstyle.addsong}>
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={name}
              className={audioplayerstyle.image1}
            />
            <input
              type="file"
              id="upload"
              name="avatar"
              onChange={saveAudio}
              style={{ padding: "2rem", paddingLeft: "25%" }}
            />
            <audio
              ref={audioRef}
              controls
              autoPlay
              onEnded={playNextSong}
              style={{ padding: "1rem" }}
            >
              <source src={songs[currentsongindex]?.url} id="src" />
            </audio>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Music"
          className={audioplayerstyle.image}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
