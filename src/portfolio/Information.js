import React from 'react'
import styls from './information.module.scss';

const Infomation = () => {
    const message  = '처음 웹디자이너로 IT업계에 들어와 활동하다가 웹디자인, 웹퍼블리셔, Flash 제작 관련 업무를 하다가     우연한 기회에 게임업계에  발을 들이게 되었고 ActionScript3.0, gfx기반의 게임UI 개발과 디자인을 병행하게 되었습니다.    하지만 계속 프로젝트들이 드랍이 되었고 그러던중에 바른손게임즈 ( 현재는 Studio8 )에 들어가게 되었고    당시 UI Scaleform개발자가 없어 클라이언트쪽에서 UI개발을 하고있었고 정형화된 구조가 없었기때문에 개발자마다의 방향성이 달라서 처음에 파악할때 어려움이 많았으나     다시 처음부터 구조를 다시잡아 Controller, View, Model로 나누어'
    return (
        <div className={styls.Infomation}>
            <h1>ABOUT</h1>
            <div className={styls.Profile}>
                <p className={styls.myname}>고 연정</p>
                <p>1980.12.23</p>
                <p>(Mobile) 010-7677-3813</p>
                <p>yukinoo11@navre.com</p>
            </div>
            <div>

            </div>

            <div>
                <h1>경력기술서</h1>
                <ul>
                    <li>
                        <div className={styls.wrap}>
                            <h2>스튜디오8</h2>
                            <p>UI 파트 팀장</p>
                            <p className={styls.date}>2015.06 ~ 2021.07</p>
                            <div className={styls.description}>
                                <ul>
                                    <li><label>프로젝트명</label>아스텔리아 PC MMORPG</li>
                                    <li><label>개발환경</label>Unreal3.0, Scaleform , ActionScript3.0</li>
                                    <li><label>담당업무</label>MVC 디자인패턴을 기반으로 한 UI 개발 및 UI디자인</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styls.wrap}>
                            <h2>레드모바일</h2>
                            <p>과장</p>
                            <p className={styls.date}>2014.10 ~ 2015.06</p>
                            <div className={styls.description}>
                                <ul>
                                    <li><label>프로젝트명</label>블소 – 린족의 모험 (Mobile)</li>
                                    <li><label>개발환경</label>Unity3D 4.6, NGUI 2.6</li>
                                    <li><label>담당업무</label>UI디자인, 캐릭터(2D) 140개정도의 Sprite 파츠 나누어 IDLE Animaiton 개발경험</li>
                                </ul>
                                <ul>
                                    <li><label>프로젝트명</label>용족Q전 (Mobile)</li>
                                    <li><label>개발환경</label>Unity3D 4.6, NGUI 3.6</li>
                                    <li><label>담당업무</label>UI디자인</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styls.wrap}>
                            <h2>이스트인터렉티브</h2>
                            <p>과장</p>
                            <p className={styls.date}>2013.05~2014.10</p>
                            <div className={styls.description}>
                                <ul>
                                    <li><label>프로젝트명</label>동유기 PC MMORPG</li>
                                    <li><label>개발환경</label>게임브리오, Gfx4.1버전 , ActionScript3.0</li>
                                    <li><label>담당업무</label>UI 개발 및 UI디자인, AffectEffect 홍보영상 제작</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styls.wrap}>
                            <h2>그라비티 게임즈</h2>
                            <p className={styls.date}>2012.02 ~ 2014.03</p>
                            <div className={styls.description}>
                                <ul>
                                    <li><label>프로젝트명</label>동유기 PC MMORPG</li>
                                    <li><label>개발환경</label>게임브리오, Gfx4.1버전 , ActionScript3.0</li>
                                    <li><label>담당업무</label>UI 개발 및 UI디자인</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styls.wrap}>
                            <h2>ETC</h2>
                            <div className={styls.description}>
                                <ul>
                                    <li><label>프로젝트명</label>포트폴리오 사이트</li>
                                    {/*
                                    <li><label>Github</label>https://github.com/yukinoo11/portfolio</li>
                                    */}
                                    <li><label>Link</label>mcgo.cafe24App.com</li>
                                    <li><label>개발환경</label>Express(Node.js), Javascript(ES6), Javascript, scss, MySQL</li>
                                    <li><label>담당업무</label>포트폴리오 DB구현, 
                                    React 활용한 SPA 개발, MySql백엔드, 프론트엔드</li>
                                </ul>
                                <ul>
                                    <li><label>프로젝트명</label>카드매칭게임</li>
                                    <li><label>Github</label>https://github.com/yukinoo11/MatchingCard</li>
                                    <li><label>Link</label><a href='http://yukinoo11.cafe24.com/html5/cardMatching/index.html'>랑크</a></li>
                                    <li><label>개발환경</label>Phaser3, Javascript(ES6)</li>
                                    <li><label>담당업무</label>Jsavascript, Phaser3 framework 이용한 간단한 게임개발</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
            <h1>보유기술</h1>
                <div className={styls.wrap2}>
                    <ul>
                        <li>ActionScript 2.0, 3.0</li>
                        <li>MySQL</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>SCSS</li>
                        <li>NodeJS</li>
                        <li>Express</li>
                        <li>Phaser3</li>
                        <li>Unreal4.0, BluePrint </li>
                        <li>Photoshop</li>
                        <li>AfterEffect</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Infomation;