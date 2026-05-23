import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // 1. useSelector 임포트
import NetflixLogoImg from '../assets/Netflix_Logo_RGB.png'; 
import { IoSearchOutline, IoNotificationsOutline, IoCaretDownSharp } from 'react-icons/io5';

// 2. 배경색과 하단 테두리를 테마에 맞게 분기 처리
const Nav = styled.nav`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 0 4%;
  
  /* 다크모드면 검은색, 라이트모드면 흰색 */
  background-color: ${props => props.isDarkMode ? '#141414' : '#ffffff'};
  /* 하단에 연한 경계선 추가 */
  border-bottom: 1px solid ${props => props.isDarkMode ? '#222222' : '#eaeaea'};
  
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img.attrs({
  src: NetflixLogoImg,
  alt: 'NETFLIX',
})`
  height: 50px; 
  margin-right: 50px;
  cursor: pointer;
  object-fit: contain;
`;

// 3. 글자 색상과 마우스 오버 색상을 테마에 맞게 수정
const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  
  /* 다크모드면 밝은 회색, 라이트모드면 짙은 회색/검은색 */
  color: ${props => props.isDarkMode ? '#e5e5e5' : '#141414'};
  
  font-size: 0.85rem;
  padding: 0;
  margin: 0;
  transition: color 0.3s ease;
  
  li { 
    cursor: pointer; 
    /* 마우스 올렸을 때 다크모드면 약간 연하게, 라이트모드면 회색으로 변경 */
    &:hover { color: ${props => props.isDarkMode ? '#b3b3b3' : '#666666'}; } 
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; 
`;

// 4. 검색 아이콘 색상 연동
const SearchIcon = styled(IoSearchOutline)`
  color: ${props => props.isDarkMode ? '#e5e5e5' : '#141414'};
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: ${props => props.isDarkMode ? '#b3b3b3' : '#666666'}; }
`;

// 5. 알림 아이콘 색상 연동
const NotiIcon = styled(IoNotificationsOutline)`
  color: ${props => props.isDarkMode ? '#e5e5e5' : '#141414'};
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: ${props => props.isDarkMode ? '#b3b3b3' : '#666666'}; }
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  
  &:hover {
    .caret-icon {
      transform: rotate(180deg);
    }
  }
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3b82f6; 
  border-radius: 4px;
`;

// 6. 드롭다운 화살표 아이콘 색상 연동
const CaretIcon = styled(IoCaretDownSharp)`
  color: ${props => props.isDarkMode ? '#e5e5e5' : '#141414'};
  font-size: 0.6rem;
  transition: transform 0.2s ease, color 0.3s ease; 
`;

const Header = () => {
  // 7. 리덕스 스토어에서 현재 테마 상태 가져오기
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    // 8. 스타일 컴포넌트들에게 props로isDarkMode 값을 전달해줍니다.
    <Nav isDarkMode={isDarkMode}>
      <LeftNav>
        <Logo />
        <MenuList isDarkMode={isDarkMode}>
          <li>홈</li>
          <li>시리즈</li>
          <li>영화</li>
          <li>게임</li>
          <li>NEW! 요즘 대세 콘텐츠</li>
          <li>내가 찜한 리스트</li>
          <li>언어별로 찾아보기</li>
        </MenuList>
      </LeftNav>

      <RightNav>
        <SearchIcon isDarkMode={isDarkMode} />
        <NotiIcon isDarkMode={isDarkMode} />
        <ProfileWrapper>
          <ProfileAvatar />
          <CaretIcon isDarkMode={isDarkMode} className="caret-icon" /> 
        </ProfileWrapper>
      </RightNav>
    </Nav>
  );
};

export default Header;