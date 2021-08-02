import React, { useEffect, useState } from "react";
import FilePostForm from "../api/component/FilePostForm";
import axios, { post, get } from 'axios';
import styles from './AdminPortfolio.module.scss';
import useConfirm from './../component/useConfirm';

const AdminPortfolioWrite = (props) => {
    const { history } = props;
    const [state, setState] = useState({
        category: '',
        title: '',
        description: '',
        url: '',
        year: '',
        month: '',
        files: [],
        open: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createFormData().then((res) => {
            setState(prev => ({
                ...prev,
                open: true
            }));
        })
    }

    const createFormData = () => {
        const formData = new FormData();
        const url = '/api/img/upload';
        formData.append('category', state.category);
        formData.append('title', state.title);
        formData.append('description', state.description);
        formData.append('url', state.url);
        formData.append('year', state.year);
        formData.append('month', state.month);
        state.files.map(item => formData.append(item.id, item.file));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    const handleChangeInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        setState(prev => ({
            ...prev,
            [target.name]: value,
        }));
    }

    const handleChangeFiles = (e) => {
        const id = e.id;
        const file = e.file;
        let isChange = false;

        state.files.forEach(item => {
            if (item.id === id) {
                item.file = file;
                isChange = true;
            }
        });

        if (!isChange) {
            state.files.push({ id: id, file: file });
        }
    }

    const yearElements = [];
    let year = 2021;
    for (let i = 0; i < 30; i++) {
        const n = year - i;
        yearElements.push(<option key={i} value={n}> {n.toString()} </option>);
    }

    return (
        <div className={styles.form}>
            { state.open ? (
                <Message text='등록하였습니다.' open={true} handleClick={(e) => history.push('/admin/portfolio')} />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.title}>카테고리</div>
                        <div>
                            <select value={state.category} name="category" onChange={handleChangeInput}>
                                <option value="">선택해주세요.</option>
                                <option value="web">Web</option>
                                <option value="game">Game</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>이름</div>
                        <input name='title' onChange={handleChangeInput} type='text' value={state.title} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>설명</div>
                        <textarea name='description' onChange={handleChangeInput} value={state.description} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>날짜</div>
                        <div className={styles.date}>
                            <select value={state.year} name="year" onChange={handleChangeInput} >
                                <option value="">선택하세요</option>
                                {yearElements}
                            </select>
                            <span>년</span>
                            <select value={state.month} name="month" onChange={handleChangeInput} >
                                <option value="">모름</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <span>월</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>링크</div>
                        <input name='url' onChange={handleChangeInput} type='text' value={state.url} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>이미지 (1600 x 1200)</div>
                        <ul className={styles.inputFileList}>
                            <li>
                                <span>1</span>
                                <div className={styles.file}><FilePostForm id='image1' onChange={handleChangeFiles} /></div>
                            </li>
                            <li>
                                <span>2</span>
                                <div className={styles.file}><FilePostForm id='image2' onChange={handleChangeFiles} /></div>
                            </li>
                            <li>
                                <span>3</span>
                                <div className={styles.file}><FilePostForm id='image3' onChange={handleChangeFiles} /></div>
                            </li>
                        </ul>
                    </div>
                    <footer>
                        <div>
                            <button className='btn'>등록</button>
                        </div>
                    </footer>
                </form>
            )}
        </div>
    )
}

export default AdminPortfolioWrite;

function rmeovePortfolio(id) {
    const url = '/api/web/removeItem';
    return axios.post(url, { id: id });
}

function removeImgs(id) {
    const url = '/api/img/deleteImgs';
    return axios.post(url, { id: id });
}

export const AdminPortfolioView = (props) => {
    const { match, history } = props;
    const [isModify, setModify] = useState(false);
    const [state, setState] = useState({
        isDelete: false,
        data: {},
        imgs: []
    });
    useEffect(() => {
        //console.log(match.params.id)
        async function fetchData() {
            //카테고리
            get(`/api/web/shots/${match.params.id}`).then((result) => {
                const item = result.data.data[0];
                const imgs = result.data.list;
                //console.log(result.data)
                setState(prev => ({
                    ...prev,
                    data: item,
                    imgs: imgs
                }));
            });
        }
        fetchData();
        return () => {

        }
    }, [match.params.id]);

    const renderer = state.imgs.map((item, index) => {
        return (
            <li key={index}><img src={`/imgUploads/${item.IMAGES_NAME}`} alt='이미지' /></li>
        )
    });

    //뒤로가기 버튼 클릭
    const handleClickedBack = () => {
        history.goBack();
    }

    //수정하기 버튼 클릭
    const handleClickModify = () => {
        setModify(true);
    }
    const okConfirm = () => removeItems();
    const cancelConfirm = () => console.log('취소되었습니다.');
    const confirmDelete = useConfirm('삭제하시겠습니까?', okConfirm, cancelConfirm);

    async function removeItems() {
        //전체삭제
        try {
            await axios.all([rmeovePortfolio(match.params.id), removeImgs(match.params.id)])
                .then(axios.spread(function (acct, perms) {
                    // Both requests are now complete
                    //console.log(acct);
                    //console.log(perms);
                    setState(prev => ({
                        ...prev,
                        isDelete: true
                    }))

                }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            { state.isDelete ? (
                <Message text='삭제하였습니다.' open={true} handleClick={(e) => history.push('/admin/portfolio')} />
            ) : (
                <>
                    { isModify ? (
                        /** 수정 Form */
                        <ModifyForm
                            id={state.data.PORTFOLIO_NO}
                            onClickPrevBtn={(e) => setModify(false)}
                            onClickComplete={(e) => history.push('/admin/portfolio')}
                            title={state.data.PORTFOLIO_TITLE}
                            category={state.data.PORTFOLIO_CATEGORY}
                            description={state.data.PORTFOLIO_CONTENT}
                            year={state.data.PORTFOLIO_YEAR}
                            month={state.data.PORTFOLIO_MONTH}
                            url={state.data.PORTFOLIO_URL}
                            imgs={state.imgs} />
                    ) : (
                        <div className={styles.view}>
                            <div className={styles.row}>
                                <div className={styles.title}>카테고리</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_CATEGORY}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>제목</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_TITLE} </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>설명</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_CONTENT}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>날짜</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_YEAR} / {state.data.PORTFOLIO_MONTH}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>등록날짜</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_YMD}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>링크</div>
                                <div className={styles.content}>{state.data.PORTFOLIO_URL}</div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.title}>이미지 (1600 x 1200)</div>
                                <ul className={styles.imgList}>
                                    {renderer}
                                </ul>
                            </div>
                            <footer>
                                <button onClick={handleClickedBack} className='btn'>뒤로가기</button>
                                <button onClick={confirmDelete} className='btn'>삭제하기</button>
                                <button onClick={handleClickModify} className='btn'>수정하기</button>
                            </footer>
                        </div>

                    )}
                </>
            )}
        </>
    )
}

// 수정하기 폼
const ModifyForm = (props) => {
    const { id, title, category, description, url, year, month, imgs, onClickPrevBtn, onClickComplete } = props;
    const [open, SetOpen] = useState(false);
    const [state, setState] = useState({
        id: '',
        category: '',
        title: '',
        description: '',
        url: '',
        year: '',
        month: '',
        files: [],
        imgs: [],
        deleteImg: []
    });

    useEffect(() => {
        setState(prev => ({
            id: id,
            category: category,
            title: title,
            description: description,
            url: url,
            year: year,
            month: month,
            imgs: imgs,
            deleteImg: new Array(imgs.length),
            files: [],
        }));
    }, [id, title, category, description, url, year, month, imgs]);

    const sendFormData = () => {

        const url = '/api/img/modify';
        const formData = new FormData();
        formData.append('id', state.id)
        formData.append('category', state.category);
        formData.append('title', state.title);
        formData.append('description', state.description);
        formData.append('url', state.url);
        formData.append('year', state.year);
        formData.append('month', state.month);
        state.files.map(item => formData.append(item.id, item.file));

        state.deleteImg.forEach((item, index) => {
            if (item) {
                formData.append('deleteImgs[]', imgs[index].IMAGES_NAME);
            }
        });

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendFormData().then((res) => {
            SetOpen(true);
        })
    }

    const handleChangeInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        setState(prev => ({
            ...prev,
            [target.name]: value,
        }));
    }
    const handleChangeFiles = (e) => {
        const id = e.id;
        const file = e.file;
        let isChange = false;

        state.files.forEach(item => {
            if (item.id === id) {
                item.file = file;
                isChange = true;
            }
        });

        if (!isChange) {
            state.files.push({ id: id, file: file });
        }
    }

    const yearElements = [];
    let currentYear = 2021;
    for (let i = 0; i < 30; i++) {
        const n = currentYear - i;
        yearElements.push(<option key={i} value={n}> {n.toString()} </option>);
    }

    const handleClickImgRenerer = (index, isDelete) => {
        state.deleteImg[index] = isDelete;
    }

    const renderer = state.imgs.map((item, index) => {
        return (
            <ImgRenderer key={index}
                index={index}
                url={`/imgUploads/${item.IMAGES_NAME}`}
                handleClick={handleClickImgRenerer} />
        )
    });

    return (
        <>
            { open ? (
                <Message text='수정하였습니다.' handleClick={onClickComplete} />
            ) : (
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.title}>카테고리</div>
                            <div>
                                <select value={state.category} name="category" onChange={handleChangeInput}>
                                    <option value="">선택해주세요.</option>
                                    <option value="web">Web</option>
                                    <option value="game">Game</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.title}>이름</div>
                            <input name='title' onChange={handleChangeInput} type='text' value={state.title} />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.title}>설명</div>
                            <textarea name='description' onChange={handleChangeInput} value={state.description} />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.title}>날짜</div>
                            <div className={styles.date}>
                                <select value={state.year} name="year" onChange={handleChangeInput} >
                                    <option value="">선택하세요</option>
                                    {yearElements}
                                </select>
                                <span>년</span>
                                <select value={state.month} name="month" onChange={handleChangeInput} >
                                    <option value="">모름</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <span>월</span>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.title}>링크</div>
                            <input name='url' onChange={handleChangeInput} type='text' value={state.url} />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.title}>이미지 (1600 x 1200)</div>
                            <ul className={styles.imgList}>
                                {renderer}
                            </ul>
                            <ul className={styles.inputFileList}>
                                <li>
                                    <span>1</span>
                                    <div className={styles.file}><FilePostForm id='image1' onChange={handleChangeFiles} /></div>
                                </li>
                                <li>
                                    <span>2</span>
                                    <div className={styles.file}><FilePostForm id='image2' onChange={handleChangeFiles} /></div>
                                </li>
                                <li>
                                    <span>3</span>
                                    <div className={styles.file}><FilePostForm id='image3' onChange={handleChangeFiles} /></div>
                                </li>
                            </ul>
                        </div>
                        <footer>
                            <div>
                                <button onClick={onClickPrevBtn} className='btn'>뒤로가기</button>
                                <button className='btn'>적용하기</button>
                            </div>
                        </footer>
                    </form>
                </div>
            )}

        </>
    )
}

//이미지 랜더러
const ImgRenderer = (props) => {
    const { index, url, handleClick } = props;
    const [state, setState] = useState({
        isDelete: false
    });
    const handleDeleteBtn = () => {

        handleClick(index, !state.isDelete);
        setState(prev => ({
            ...state,
            isDelete: !prev.isDelete
        }));
    }

    return (
        <li>
            <div className={styles.imgWrap}>
                {state.isDelete ? (
                    <div className={styles.cover}>X</div>
                ) : null}
                <img src={url} alt='이미지' /></div>
            <div><button type='button' onClick={handleDeleteBtn} className='button-color'>
                {!state.isDelete ? '삭제' : '취소'} </button></div>
        </li>
    )
}

//메시지
const Message = (props) => {

    const { text, handleClick } = props;
    return (
        <div className={styles.message}>
            <div className={styles.icon} >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" /></svg>
            </div>
            <span>
                {text}
            </span>
            <div className={styles.footer}>
                <button onClick={handleClick} className='btn'>확인</button>
            </div>
        </div>
    )
}