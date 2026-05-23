import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux' // 1. 리덕스 Provider 불러오기
import { store } from './store/store.js' // 2. 우리가 만든 스토어 불러오기

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. 앱 전체를 Provider로 감싸고 store를 주입해 줍니다 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)