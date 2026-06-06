import axios from "axios";

// ✅ axios 인스턴스 생성 - baseURL을 미리 설정해두면 매번 전체 URL을 쓰지 않아도 돼요!
const api = axios.create({
  baseURL: "https://efub6-seminar-front.p-e.kr",
});

// ✅ 게시글 목록 조회
// TODO 1: GET /api/posts 로 모든 게시글을 조회하는 함수를 완성하세요.
export const getPosts = async () => {
  try {
    const response = await api.get("/api/posts");
    return response.data; // 조회된 모든 게시글 목록(배열) 반환
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
};

// ✅ 게시글 단건 조회
// TODO 2: GET /api/posts/{id} 로 특정 게시글을 조회하는 함수를 완성하세요.
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/api/posts/${id}`);
    return response.data; // 특정 게시글 데이터 반환
  } catch (error) {
    console.error(`게시글 ${id}번 조회 실패:`, error);
    throw error;
  }
};

// ✅ 게시글 작성
// TODO 3: POST /api/posts 로 새 게시글을 작성하는 함수를 완성하세요.
// data 형태: { title: string, content: string }
export const createPost = async (data) => {
  try {
    const response = await api.post("/api/posts", data);
    return response.data; // 생성된 게시글 결과 반환
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};

// ✅ 게시글 수정
// TODO 4: PATCH /api/posts/{id} 로 특정 게시글을 수정하는 함수를 완성하세요.
// data 형태: { title: string, content: string }
export const updatePost = async (id, data) => {
  try {
    const response = await api.patch(`/api/posts/${id}`, data);
    return response.data; // 수정된 게시글 결과 반환
  } catch (error) {
    console.error(`게시글 ${id}번 수정 실패:`, error);
    throw error;
  }
};

// ✅ 게시글 삭제
// TODO 5: DELETE /api/posts/{id} 로 특정 게시글을 삭제하는 함수를 완성하세요.
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data; // 삭제 성공 여부 또는 결과 반환
  } catch (error) {
    console.error(`게시글 ${id}번 삭제 실패:`, error);
    throw error;
  }
};