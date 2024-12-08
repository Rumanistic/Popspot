import styled from 'styled-components';

export const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

export const ReviewTitle = styled.h1`
  font-size: 2.4rem;
  color: #1F2933; /* 보조색 */
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
  border-bottom: 2px solid #006EB9; /* 강조색 */
  padding-bottom: 10px;
`;

export const ReviewForm = styled.div`
  margin-bottom: 30px;
  font-family: 'Roboto', sans-serif;
`;

export const ReviewInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  font-size: 1.2rem;
  border: 1px solid #1F2933; /* 보조색 */
  margin-bottom: 20px;
  box-sizing: border-box;

  &:focus {
    border-color: #006EB9; /* 강조색 */
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ReviewRatingSelect = styled.div`
  margin-bottom: 20px;
  text-align: center;

  p {
    font-size: 1.5rem;
    color: #006EB9; /* 강조색 */
    margin-bottom: 10px;
  }
`;

export const Star = styled.span`
  cursor: pointer;
  font-size: 30px;
  color: ${({ selected }) => (selected ? '#FFD700' : '#D3D3D3')}; /* 노란색으로 변경 */
  transition: color 0.3s ease;
  text-shadow: ${({ selected }) => (selected ? '0 0 5px #FFD700' : 'none')}; /* 노란색 강조 */
`;


export const SubmitButton = styled.button`
  display: inline-block;
  background-color: #006EB9; /* 강조색 */
  color: #FFFFFF; /* 주조색 */
  width: 200px;
  height: 50px;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #1F2933; /* 보조색 */
  border-width: 0.5px; /* 테두리 두께 조정 */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 0;

  &:hover {
    background-color: #004A8F; /* 강조색 다크 */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ReviewItem = styled.li`
  padding: 20px;
  border: 1px solid #1F2933; /* 보조색 */
  margin-bottom: 20px;
`;

export const ReviewContent = styled.p`
  font-size: 1.2rem;
  color: #1F2933; /* 보조색 */
  margin-bottom: 10px;
`;

// 평균 평점
export const ReviewRating = styled.p`
  font-size: 1.5rem;
  color: #FFD700; /* 노란색 */
  text-shadow: 0 0 5px #FFD700; /* 강조 */
  text-align: center;
  font-weight: bold;
`;

export const ReviewButton = styled.button`
  background-color: #006EB9; /* 강조색 */
  color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* 버튼 간 간격 조정 */
  border-width: 0.5px; /* 테두리 두께 조정 */
  border-radius: 0;

  &:hover {
    background-color: #004A8F;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const NoReviews = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #1F2933; /* 보조색 */
`;

export const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1.1rem;
  border: 1px solid #1F2933; /* 보조색 */
  margin-bottom: 10px;
  box-sizing: border-box;

  &:focus {
    border-color: #006EB9; /* 강조색 */
    outline: none;
  }
`;

export const EditButton = styled.button`
  background-color: #006EB9; /* 강조색 */
  color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* 버튼 간 간격 조정 */
  border-width: 0.5px; /* 테두리 두께 조정 */
  border-radius: 0;

  &:hover {
    background-color: #004A8F;
  }

  &:active {
    transform: scale(0.98);
  }
`;
export const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #006EB9; /* 강조색 */
  color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  border-width: 0.5px; /* 테두리 두께 조정 */
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0;

  &:hover {
    background-color: #004A8F;
  }
`;
// 탭 전환 버튼
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #006EB9;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ active }) => (active ? '#006EB9' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#006EB9')};

  &:hover {
    background-color: #004a8f;
    color: white;
  }
`;
