import axios from 'axios';
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const isLogin = () => {


    const onLogin = (email, password) => {
        const data = {
            email,
            password,
        };
        axios.post('/login', data)
            .then(onLoginSuccess)
            .catch(error => {
                // ... 에러 처리
            });
    }

    const onSilentRefresh = ( data ) => {
        axios.post('/silent-refresh', data)
            .then(onLoginSuccess)
            .catch(error => {
                // ... 로그인 실패 처리
            });
    }

    const onLoginSuccess = (response) => {
        const { accessToken } = response.data;

        // accessToken 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    }
}
export default isLogin;

