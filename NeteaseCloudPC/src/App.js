import Router from './router';
import Layout from '@components/Layout';
import BackTop from '@/components/BackTop';
import localStore from '@/utils/localStore';
import loginFn from '@/utils/methods/login';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
	const token = useSelector(state => state.user.token);
	const localUser = localStore.get('user');
	useEffect(() => {
		if (token == null) { //未登录
			if (localUser?.remember) { //自动登录
				const {phone, password} = localUser;
				loginFn.login({phone, password});
			}
		}
	}, [])

	return (
		<Layout>
			{Router}
			<BackTop />
		</Layout>
	)
}

export default App;
