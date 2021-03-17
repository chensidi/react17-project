import Router from './router';
import Layout from '@components/Layout';
import BackTop from '@/components/BackTop';
function App() {
	return (
		<Layout>
			{Router}
			<BackTop />
		</Layout>
	)
}

export default App;
