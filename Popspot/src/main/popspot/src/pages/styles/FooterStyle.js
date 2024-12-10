import { styled } from 'styled-components';
export const FooterMain = styled.footer`
  	font-family: 'Freesentation';
	position: relative;
	display: flex;
	flex-flow: column;
	padding: 0 2%;
	background-color: #1F2933;
`;

export const FooterHorizontalSpan = styled.span`
	display: flex;
	flex-flow: row;
	justify-content: center;
	align-items: center;
`;

export const FooterVerticalSpan = styled.span`
	display: flex;
	flex-flow: column;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	margin: 0 10px;
`;

export const FooterVerticalBar = styled.span`
	width: 1px;
	height: 150px;
	background-color: #6a6a6a;
`;

export const FooterHorizontalBar = styled.span`
	height: 1px;
	background-color: #6a6a6a;
`;

export const FooterContentSpan = styled.span`
	height: auto;
	color: #FFFFFF;
	padding: 0 45px;
`;

export const GithubLabel = styled.label`
	margin-top: 5px;
	transition: color 0.3s;
`;