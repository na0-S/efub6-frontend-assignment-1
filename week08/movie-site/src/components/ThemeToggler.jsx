import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice'; // 위에서 만든 액션 임포트

const TogglerButton = styled.button`
  background-color: ${props => props.isDarkMode ? '#ffffff' : '#141414'};
  color: ${props => props.isDarkMode ? '#141414' : '#ffffff'};
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.3s ease;
`;

const ThemeToggler = () => {
  const dispatch = useDispatch();
  // store 등록 시 key 이름을 theme로 주었기 때문에 state.theme.isDarkMode로 읽어오기
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <TogglerButton isDarkMode={isDarkMode} onClick={() => dispatch(toggleTheme())}>
      {isDarkMode ? '라이트 모드 전환' : '다크 모드 전환'}
    </TogglerButton>
  );
};

export default ThemeToggler;