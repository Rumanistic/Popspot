import styled from 'styled-components';

export const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fffaf0;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewTitle = styled.h1`
  font-size: 2.4rem;
  color: #f08a5d; /* 코랄색 */
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewForm = styled.div`
  margin-bottom: 30px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 2px solid #f39c12;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-family: 'Pretendard-Regular', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 */
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 포커스 시 그림자 확대 */
    border-color: #f08a5d; /* 포커스 시 테두리 색상 */
  }
`;

export const ReviewRatingSelect = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Pretendard-Regular', sans-serif;

  p {
    font-size: 1.5rem;
    color: #e67e22;
    margin-bottom: 10px;
  }
`;

export const Star = styled.span`
  cursor: pointer;
  font-size: 30px;
  color: ${({ selected }) => (selected ? '#ffcc00' : '#d3d3d3')};
  transition: color 0.3s ease;
  text-shadow: ${({ selected }) => (selected ? '0 0 5px #ffcc00' : 'none')};
`;

export const SubmitButton = styled.button`
  display: inline-block;
  background-color: #f08a5d;
  color: white;
  width: 200px;
  height: 50px;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular', sans-serif;
  border-radius: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e76f51;
    transform: scale(1.05);
  }

  &:active {
    background-color: #d1603d;
    transform: scale(0.98);
  }
`;

export const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0; /* 상하 간격을 없애기 위해 기본 마진을 제거 */
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewItem = styled.li`
  padding: 20px 0; /* 위아래 간격을 20px으로 조정 */
  border-bottom: 2px dashed #f39c12;
  margin-bottom: 20px; /* 각 리뷰 항목 간의 간격 추가 */
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0; /* 마지막 항목 아래에는 간격을 없앰 */
  }
`;


export const ReviewContent = styled.p`
  font-size: 1.2rem;
  color: #2d3436;
  margin-bottom: 10px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewRating = styled.p`
  font-size: 1.2rem;
  color: #ffcc00;
  font-weight: bold;
  text-shadow: 0 0 5px #ffcc00;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewButton = styled.button`
  background: linear-gradient(45deg, #f08a5d, #f39c12); /* 코랄-오렌지 그라디언트 */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 5px;
  min-width: 60px;
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;

  &:hover {
    background: linear-gradient(45deg, #e67e22, #f08a5d); /* 오렌지-코랄 색상 */
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(45deg, #d35400, #e67e22); /* 더 강렬한 오렌지 */
    transform: scale(0.95);
  }
`;

export const NoReviews = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #e67e22;
  margin-top: 30px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1.1rem;
  margin-bottom: 10px;
  border: 2px solid #f39c12;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Pretendard-Regular', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 */

  &:focus {
    outline: none;
    border-color: #f08a5d;
  }
`;

export const EditButton = styled.button`
  background: #f08a5d; /* 코랄색 */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 5px;
  transition: background 0.3s ease, transform 0.3s ease;
  font-family: 'Pretendard-Regular', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #e67e22; /* 호버 시 따뜻한 오렌지색 */
    transform: translateY(-2px);
  }

  &:active {
    background: #d35400; /* 더 강렬한 오렌지 */
    transform: scale(0.95);
  }
`;

export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${ReviewContainer} {
      padding: 20px;
    }

    ${ReviewTitle} {
      font-size: 2rem;
    }

    ${ReviewInput} {
      font-size: 1rem;
      height: 100px;
    }

    ${ReviewContent} {
      font-size: 1rem;
    }

    ${SubmitButton} {
      font-size: 1rem;
      width: 180px;
      height: 45px;
      line-height: 45px;
    }

    ${ReviewButton} {
      font-size: 0.9rem;
      padding: 8px 16px;
    }
  }
`;

export const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #f08a5d;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e88e5;
  }
`;
