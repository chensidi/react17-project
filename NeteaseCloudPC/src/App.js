import Router from './router';
import Layout from '@components/Layout';
import BackTop from '@/components/BackTop';
import localStore from '@/utils/localStore';
import loginFn from '@/utils/methods/login';
import { routerRef } from './router/generateRoute';
import LrcPanel from '@/components/PlayBar/LrcPanel';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export let historyAlpha;

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
		historyAlpha = routerRef.current;
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
			<LrcPanel />
		</Layout>
	)
}

export default App;
