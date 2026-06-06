import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPostById, deletePost } from "../api/postApi";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // TODO 9: 컴포넌트가 처음 렌더링될 때 id에 해당하는 게시글을 불러오세요.
  // 힌트: useEffect와 getPostById(id)를 사용하세요.
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data); // 가져온 게시글 데이터를 상태에 저장
      } catch (error) {
        alert("게시글을 불러오는 데 실패했습니다.");
        console.error(error);
        navigate("/"); // 에러 발생 시 목록으로 튕겨내기
      }
    };

    fetchPost();
  }, [id]);

  // TODO 10: 게시글 삭제 핸들러를 완성하세요.
  // 삭제 후 홈("/")으로 이동하세요.
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;

    try {
      await deletePost(id); // API를 통해 삭제 요청
      alert("게시글이 삭제되었습니다.");
      navigate("/"); // 삭제 후 홈으로 이동
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>← 목록으로</BackButton>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <ButtonGroup>
        <EditButton onClick={() => navigate(`/edit/${post.id}`)}>수정</EditButton>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      </ButtonGroup>
    </Container>
  );
}

export default DetailPage;

// --- Styled Components ---
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
  padding: 0;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;

  &:hover {
    background-color: #1e88e5;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;

  &:hover {
    background-color: #e53935;
  }
`;