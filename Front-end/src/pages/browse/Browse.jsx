import React, { useCallback, useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import Banner from "./Banner/Banner";
import useHttp from "../../hooks/use-http";
import MovieList from "./MovieList/MovieList";
import styles from "./Browse.module.css";

function Browse() {
  console.log("Evaluating Browse");
  const url = `https://api.themoviedb.org/3`;
  const urlNode = "http://localhost:5000";
  const tokenNode = "8qlOkxz4wq";
  const API_KEY = `30f606cb5a3271b8e8a30c36c7ca5179`;
  const requests = {
    fetchTrending: `/api/movies/trending?token=${tokenNode}`,
    fetchTopRated: `/api/movies/top-rate?token=${tokenNode}`,
    fetchActionMovies: `/api/movies/discover/28?token=${tokenNode}`,
    fetchComedyMovies: `/api/movies/discover/35?token=${tokenNode}`,
    fetchHorrorMovies: `/api/movies/discover/27?token=${tokenNode}`,
    fetchRomanceMovies: `/api/movies/discover/10749?token=${tokenNode}`,
    fetchDocumentaries: `/api/movies/discover/99?token=${tokenNode}`,

    // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    // fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    // fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    // fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    // fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  const { sendRequest, error } = useHttp();
  const [bannerData, setBannerData] = useState();
  const [trendingList, setTrendingList] = useState();
  const [topRatedList, setTopRatedList] = useState();
  const [actionList, setActionList] = useState();
  const [comedyList, setComedyList] = useState();
  const [horrorList, setHorrorList] = useState();
  const [romanceList, setRomanceList] = useState();
  const [documentariesList, setDocumentariesList] = useState();
  // const fetchData = async (request, setData) => {
  //   const data = await sendRequest({
  //     url: url + request,
  //   });
  //   setData(data);
  // };
  // const fetchData = useCallback(
  //   async (request, setData) => {
  //     console.log(request);
  //     const data = await sendRequest({
  //       url: url + request,
  //     });
  //     setData(data);
  //   },
  //   [sendRequest]
  // );
  const fetchDataNode = useCallback(
    async (request, setData) => {
      console.log(request);
      const data = await sendRequest({
        url: urlNode + request,
      });
      setData(data);
    },
    [sendRequest]
  );

  useEffect(() => {
    fetchDataNode(requests.fetchTrending, setTrendingList);
    fetchDataNode(requests.fetchTopRated, setTopRatedList);
    fetchDataNode(requests.fetchActionMovies, setActionList);
    fetchDataNode(requests.fetchComedyMovies, setComedyList);
    fetchDataNode(requests.fetchHorrorMovies, setHorrorList);
    fetchDataNode(requests.fetchRomanceMovies, setRomanceList);
    fetchDataNode(requests.fetchDocumentaries, setDocumentariesList);

    fetchDataNode(requests.fetchTrending, setBannerData);
    // fetchData(requests.fetchTopRated, setTopRatedList);
    // fetchData(requests.fetchTrending, setTrendingList);
    // fetchData(requests.fetchActionMovies, setActionList);
    // fetchData(requests.fetchComedyMovies, setComedyList);
    // fetchData(requests.fetchHorrorMovies, setHorrorList);
    // fetchData(requests.fetchRomanceMovies, setRomanceList);
    // fetchData(requests.fetchDocumentaries, setDocumentariesList);
  }, []);

  return (
    <div className="app">
      <NavBar />
      <Banner data={bannerData} error={error} />

      <div className={styles.body}>
        <MovieList
          data={topRatedList}
          name="Xếp hạng cao"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={trendingList}
          name="Xu hướng"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={actionList}
          name="Hành động"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={comedyList}
          name="Hài"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={horrorList}
          name="Kinh dị"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={romanceList}
          name="Lãng mạn"
          type="backdrop"
          movieName="title"
        />
        <MovieList
          data={documentariesList}
          name="Tài liệu"
          type="backdrop"
          movieName="title"
        />
      </div>
    </div>
  );
}

export default Browse;
