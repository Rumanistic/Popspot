import { styled } from 'styled-components';

export const FooterMain = styled.footer`
	position: relative;
	display: flex;
	flex-flow: column;
  height: auto;
  margin: 0;
  padding: 0 2%;
	background-color: #CECECE;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const FooterHorizontalSpan = styled.span`
	display: flex;
	flex-flow: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const FooterVerticalSpan = styled.span`
	display: flex;
	flex-flow: column;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
`;

export const FooterVerticalBar = styled.span`
  width: 3px;
  height: 150px;
  background-color: #6a6a6a;
  border: solid 1px #6a6a6a;
`;

export const FooterHorizontalBar = styled.span`
  height: 3px;
  background-color: #000000;
  border: solid 1px #000000;
`;

export const FooterContentSpan = styled.span`
	width: 35%;
	min-height: 100px;
	height: auto;
`;

export const GithubLabel = styled.label`
	margin-top: 5px;
	transition: color 0.3s;
`;