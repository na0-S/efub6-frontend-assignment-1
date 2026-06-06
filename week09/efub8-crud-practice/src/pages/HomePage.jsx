import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPosts, deletePost } from "../api/postApi";

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // TODO 6: 컴포넌트가 처음 렌더링될 때 게시글 목록을 불러오세요.
  // 힌트: useEffect와 getPosts()를 사용하세요.
  useEffect(() => {
    /* TODO: 여기에 코드를 작성하세요 */
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  // TODO 7: 게시글 삭제 핸들러를 완성하세요.
  // 힌트: deletePost(id) 호출 후 목록을 다시 불러오거나 state를 업데이트하세요.
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;
    /* TODO: 여기에 코드를 작성하세요 */
    try {
      await deletePost(id);
      // 삭제 후 최신 목록으로 state 업데이트 (필터링 방식)
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>📋 게시판</h1>
        <WriteButton onClick={() => navigate("/create")}>글 작성</WriteButton>
      </Header>

      {/* TODO 8: posts 배열을 map으로 순회하며 게시글 목록을 렌더링하세요. */}
      <PostList>
        {posts.map((post) => (
          <PostCard key={post.id}>
          {/* 본문 텍스트 구역 (클릭 시 상세페이지 이동) */}
          <div onClick={() => navigate(`/post/${post.id}`)} style={{ flex: 1, cursor: "pointer" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>{post.title}</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#666", lineHeight: "1.4" }}>{post.content}</p>
          </div>
          
          {/* 우측 버튼 구역 */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
            <button onClick={() => navigate(`/post/${post.id}`)} style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}>상세보기</button>
            <button onClick={() => handleDelete(post.id)} style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px", border: "none", backgroundColor: "#f44336", color: "white" }}>삭제</button>
          </div>
        </PostCard>
        ))}
        {/* 힌트: 각 게시글 카드에 제목, 내용 미리보기, 상세보기/수정/삭제 버튼이 있으면 좋아요! */}
      </PostList>
    </Container>
  );
}

export default HomePage;

// --- Styled Components ---
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
  }
`;

const WriteButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;

  &:hover {
    background-color: #43a047;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  
  background-color: #ffffff;      /* 전체 배경색과 다르게 흰색 바탕 지정 */
  border-radius: 10px;           /* 모서리를 부드럽게 라운딩 */
  border: 1px solid #eef0f2;     /* 아주 연한 테두리 */
  
  /* 2. 카드 느낌을 주는 부드러운 그림자(Shadow) 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
  
  transition: transform 0.2s, box-shadow 0.2s; /* 마우스 올렸을 때 애니메이션 */

  &:hover {
    transform: translateY(-2px); /* 마우스를 올리면 카드가 살짝 위로 뜸 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08); /* 그림자가 더 짙어짐 */
  }
`;