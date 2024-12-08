import React, { useState } from 'react';
import { FooterContentSpan, FooterHorizontalBar, FooterHorizontalSpan, FooterMain, FooterVerticalBar, FooterVerticalSpan, GithubLabel } from './styles/FooterStyle';
import Github from './component/github';

const Footer = () => {
  const [hovered, setHovered] = useState(null);
  
  const members = [
    { name: '김현수', githubId: '@rumanistic', url: 'https://github.com/rumanistic' },
    { name: '김솔', githubId: '@ksks0911', url: 'https://github.com/ksks0911' },
    { name: '김요한', githubId: '@setYourId', url: 'https://github.com/' },
    { name: '김효빈', githubId: '@0biin0', url: 'https://github.com/0biin0' },
    { name: '최서진', githubId: '@seojinchoiiii', url: 'https://github.com/seojinchoiiii' },
    { name: '현민환', githubId: '@setYourId', url: 'https://github.com/' }
  ];

  return (
    <FooterMain>
      <FooterHorizontalSpan style={{ justifyContent: 'start', padding: '5px 0', maxHeight: '50px' }}>
        <img src='/img/logo.png' alt='' style={{ height: '50px' }} />
        <img src='/img/popspot.png' alt='' style={{ height: '90%', marginLeft: '10px' }} />
        <img src='/img/tjoeun.png' alt='' style={{ height: '90%', marginLeft: '10px' }} />
      </FooterHorizontalSpan>
      <FooterHorizontalBar />
      <FooterHorizontalSpan>
        <FooterContentSpan>
          <p>
            더조은컴퓨터아카데미<br /><br />
            자바&클라우드 활용 풀스택 취업캠프과정 세미프로젝트
          </p>
        </FooterContentSpan>
        <FooterVerticalBar />
        <FooterContentSpan>
        	<p>
            ◎ 제작 참여<br />
            └ 김현수(조장) 김솔 김요한 김효빈 최서진 현민환 <br />
          </p>
          <FooterHorizontalSpan style={{justifyContent: 'space-around'}}>
	        	<p>Contact...</p>
            {members.map((member, i) => (
              <FooterVerticalSpan
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => window.open(member.url, '_blank')}
              >
                <Github color={hovered === i ? '#EE3224' : '#000000'} />
                <GithubLabel style={{ color: hovered === i ? '#B49B57' : '#000000' }}>
                  {member.name}<br />{member.githubId}
                </GithubLabel>
              </FooterVerticalSpan>
            ))}
          </FooterHorizontalSpan>
          <p/>
        </FooterContentSpan>
      </FooterHorizontalSpan>
      <FooterHorizontalBar />
      <span>
        <p>© {new Date().getFullYear()} Popspot. All Rights Reserved.</p>
      </span>
    </FooterMain>
  );
};

export default Footer;