async function logMovies() {
    const response = await fetch("http://localhost:3025/getallstudents");
    const movies = await response.json();
    console.log(movies);
  }

logMovies()