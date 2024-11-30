import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import {
  ReviewContainer,
  ReviewTitle,
  ReviewInput,
  Star,
  ReviewRatingSelect,
  SubmitButton,
  ReviewList,
  ReviewItem,
  ReviewContent,
  NoReviews,
  ReviewTextArea,
  ReviewButton,
  EditButton,
  ReviewRating,
  ReviewForm,  // ReviewForm 추가
  LoginButton  // 로그인 버튼을 위한 스타일 추가 필요
} from '../styles/ReviewStyle'; // LoginButton 스타일도 여기에 추가 필요

function Review({ eventNo, eventTitle, reviews }) {
  const [review, setReview] = useState([...reviews]);
  const [newReview, setNewReview] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [editingReviewNo, setEditingReviewNo] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingRating, setEditingRating] = useState(0);

  const navigate = useNavigate(); // useNavigate 사용

  // localStorage에서 사용자 ID 추출 
  const savedUser = sessionStorage.getItem('name');

  // 리뷰 목록 가져오기
/*  useEffect(() => {
    setReview([...reviews]);
  }, [reviews]);*/

  // 리뷰 제출 처리
  const handleReviewSubmit = () => {
    if (!newReview || selectedRating === 0) {
      alert('리뷰 내용과 평점을 입력하세요.');
      return;
    }

    setSubmitting(true);

    const newReviewData = {
      content: newReview,
      rating: selectedRating,
      eventNo,
      userId: savedUser
    };

    axios.post('/api/reviews/submit', newReviewData)
      .then(() => axios.get(`/api/reviews/${eventNo}`))
      .then(response => {
		  setReview(response.data.reviews)
		  // 리뷰 제출 후 입력 폼 초기화
          setNewReview('');
          setSelectedRating(0);
      })
      .catch(error => {
        console.error('리뷰 제출 중 오류가 발생했습니다.', error);
        alert('리뷰 제출 중 오류가 발생했습니다.')
        })
      .finally(() => setSubmitting(false));
      }

  // 리뷰 삭제 처리
  const handleReviewDelete = (reviewNo, reviewUserId) => {
    if (savedUser !== reviewUserId.toString()) {
      alert('이 리뷰를 삭제할 권한이 없습니다.');
      return;
    }

    if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      axios.delete(`/api/reviews/${reviewNo}`)
        .then(() => {
          alert('삭제되었습니다.');
          setReview(reviews.filter(review => review.reviewNo !== reviewNo));
        })
        .catch(error => {
          console.error('리뷰 삭제 중 오류가 발생했습니다.', error);
          alert('리뷰 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  // 리뷰 수정 버튼 클릭 처리
  const handleEditClick = (review) => {
    if (savedUser !== review.userId.toString()) {
      alert('이 리뷰를 수정할 권한이 없습니다.');
      return;
    }

    setEditingReviewNo(review.reviewNo);
    setEditingContent(review.content);
    setEditingRating(review.rating);
  };

  // 리뷰 수정 처리
  const handleReviewUpdate = () => {
    if (!editingContent || editingRating === 0) {
      alert('수정할 리뷰 내용과 평점을 입력하세요.');
      return;
    }

    const updatedReviewData = {
      content: editingContent,
      rating: editingRating,
    };

    axios.put(`/api/reviews/${editingReviewNo}`, updatedReviewData)
      .then(response => {
        setReview(reviews.map(review =>
          review.reviewNo === editingReviewNo ? response.data : review
        ));
        setEditingReviewNo(null);
        setEditingContent('');
        setEditingRating(0);
      })
      .catch(error => {
        console.error('리뷰 수정 중 오류가 발생했습니다.', error);
        alert('리뷰 수정 중 오류가 발생했습니다.');
      });
  };

  // 별점 표시를 위한 함수
  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => (
      <Star key={index} selected={index < rating}>★</Star>
    ));
  };

  return (
    <ReviewContainer>
      <ReviewTitle>{eventTitle} 리뷰</ReviewTitle>

      {/* 리뷰 작성 폼 */}
      {savedUser ? (
        <ReviewForm>
          <ReviewInput
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰 내용을 작성하세요."
          />
          <ReviewRatingSelect>
            <p>평점 선택:</p>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                selected={selectedRating >= rating}
                onClick={() => setSelectedRating(rating)}
              >
                ★
              </Star>
            ))}
          </ReviewRatingSelect>
          <SubmitButton
            onClick={handleReviewSubmit}
            disabled={submitting}
          >
            {submitting ? '제출 중...' : '리뷰 제출'}
          </SubmitButton>
        </ReviewForm>
      ) : (
        <>
          <h2>로그인 후 이용 가능합니다!</h2>
          <LoginButton onClick={() => navigate('/login')}>로그인 페이지로 이동</LoginButton> {/* 로그인 버튼 추가 */}
        </>
      )}

      {/* 기존 리뷰 목록 */}
      {review.length > 0 ? (
        <ReviewList>
          {review.map(review => (
            <ReviewItem key={review.reviewNo}>
              {editingReviewNo === review.reviewNo ? (
                <>
                  <ReviewTextArea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <ReviewRatingSelect>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        onClick={() => setEditingRating(rating)}
                        selected={editingRating >= rating}
                      >
                        ★
                      </Star>
                    ))}
                  </ReviewRatingSelect>
                  <EditButton onClick={handleReviewUpdate}>수정 완료</EditButton>
                  <EditButton onClick={() => setEditingReviewNo(null)}>취소</EditButton>
                </>
              ) : (
                <>
                  <ReviewRating>{renderStars(review.rating)}</ReviewRating>
                  <ReviewContent>{review.content}</ReviewContent>
                  {/* 탈퇴한 회원 표시 */}
                  <p>{review.userId ? `작성자 : ${review.userId}` : '탈퇴한 회원입니다'}</p>

                  {/* 리뷰 작성 날짜 표시 */}
                  {review.createdDate && (
                    <p>
                      작성일 : {new Date(review.createdDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  {savedUser === review.userId.toString() && (
                    <div>
                      <ReviewButton onClick={() => handleEditClick(review)}>수정</ReviewButton>
                      <ReviewButton onClick={() => handleReviewDelete(review.reviewNo, review.userId)}>삭제</ReviewButton>
                    </div>
                  )}
                </>
              )}
            </ReviewItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviews>리뷰가 없습니다.</NoReviews>
      )}
    </ReviewContainer>
  );
}

export default Review;
