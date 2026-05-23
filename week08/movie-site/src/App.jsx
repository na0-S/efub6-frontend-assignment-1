import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components'; // 1. createGlobalStyle 추가
import { useSelector } from 'react-redux'; // 2. useSelector 추가
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import Footer from './components/Footer';
import ThemeToggler from './components/ThemeToggler'; // 3. 토글 버튼 불러오기

// 4. 화면 전체(body) 배경색과 글자색을 변경할 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.isDarkMode ? '#141414' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#141414'};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    font-family: sans-serif;
  }
`;

// 5. 고정값이던 배경색(#141414)을 제거하고, 전체적인 테마 흐름에 맞춤
const Container = styled.div`
  min-height: 100vh;
  padding-top: 80px; /* Header 높이만큼 띄워줌 */
`;

// 6. 고정값이던 흰색(white) 대신, 테마 상태에 따라 제목 색상이 바뀌도록 수정
const SectionTitle = styled.h2`
  color: ${props => props.isDarkMode ? '#ffffff' : '#141414'};
  margin: 20px 4%;
  font-size: 1.4vw;
  transition: color 0.3s ease;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  padding: 0 4%;
`;

const App = () => {
  const [movies, setMovies] = useState([]);

  // 7. 리덕스 스토어에서 다크모드 여부(true/false) 실시간으로 감시하기
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get('https://movies-api.accel.li/api/v2/list_movies.json?quality=3D');
        setMovies(response.data.data.movies);
      } catch (e) {
        console.error(e);
      }
    };
    getMovies();
  }, []);

  return (
    <Container>
      {/* 8. 글로벌 스타일에 현재 테마 상태(isDarkMode)를 넣어주기 */}
      <GlobalStyle isDarkMode={isDarkMode} />
      
      <Header />
      
      <main>
        {/* 9. 보기 좋은 위치에 테마를 바꿀 수 있는 토글 버튼 배치 */}
        <div style={{ padding: '0 4%', marginTop: '20px' }}>
          <ThemeToggler />
        </div>

        {/* 10. 제목 컴포넌트에도 props로 상태를 전달해 색상이 변하게 만듦 */}
        <SectionTitle isDarkMode={isDarkMode}>지금 뜨는 영화</SectionTitle>
        
        <MovieGrid>
          {movies.map(movie => (
            <MovieCard 
              key={movie.id}
              title={movie.title}
              poster={movie.medium_cover_image}
              rating={movie.rating}
            />
          ))}
        </MovieGrid>
      </main>

      <Footer />
    </Container>
  );
};

export default App;