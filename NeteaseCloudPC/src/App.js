import Router from './router';
import Layout from '@components/Layout';
import BackTop from '@/components/BackTop';
import localStore from '@/utils/localStore';
import loginFn from '@/utils/methods/login';
import { routerRef } from './router/generateRoute'

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	const token = useSelector(state => state.user.token);
	const localUser = localStore.get('user');
	const dispatch = useDispatch();
	useEffect(() => {
		if (token == null) { //未登录
			if (localUser?.remember) { //自动登录
				const {phone, password} = localUser;
				loginFn.login({phone, password});
			}
		}
		routerRef.current.history.listen((route) => {
			console.log(route);
			if (route.pathname.startsWith('/video')) {
				dispatch({type: 'setShowPlaybar', show: false});
				document.querySelector('.j-flag.pas')?.click();
			} else {
				dispatch({type: 'setShowPlaybar', show: true});
			}
		})
	}, [])
	return (
		<Layout>
			{Router}
			<BackTop />
		</Layout>
	)
}

export default App;
