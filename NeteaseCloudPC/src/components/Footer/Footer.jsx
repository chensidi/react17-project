import './index.scss';
import { Fragment } from 'react';

const links = ['服务条款', '隐私政策', '儿童隐私政策', '版权投诉指引', '意见反馈'];
const copys = [
    {
        href: 'https://web-amped.music.163.com/',
        name: 'amped'
    },
    {
        href: 'https://music.163.com/st/userbasic#/auth',
        name: 'auth'
    },
    {
        href: 'https://music.163.com/musician/artist',
        name: 'musician'
    },
    {
        href: 'https://music.163.com/web/reward',
        name: 'reward'
    },
    {
        href: 'https://music.163.com/uservideo#/plan',
        name: 'cash'
    }
]

const CopyItem = (props) => {
    const {name, href} = props;
    return (
        <li className="unit">
            <a className={`logo logonew logo-${name} f-tid`} href={href} target="_blank"></a>
            <span className={`tt tt-${name}`}></span>
        </li>
    )
}

const Footer = () => {
    return (
        <div className="g-ft">
            <div className="m-ft">
                <div className="wrap f-cb">
                    <div className="copy">
                        <p className="link">
                            {
                                links.map((link, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <a href="//st.music.163.com/official-terms/service" target="_blank" className="item s-fc4">{link}</a>
                                            <span className="line">|</span>    
                                        </Fragment>
                                    )
                                })
                            }
                        </p>
                        <p className="right s-fc3">
                            <span className="sep span">
                            网易公司版权所有©1997-2021
                            </span>
                            <span className="span">杭州乐读科技有限公司运营：</span>
                            <a href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png" target="_blank" className="alink s-fc3">浙网文[2018]3506-263号</a>
                        </p>
                        <p className="contact s-fc3">
                            <span className="sep span">
                            违法和不良信息举报电话：0571-89853516
                            </span>
                            <span className="span">
                            举报邮箱：
                            </span>
                            <a href="mailto:ncm5990@163.com" className="alink">ncm5990@163.com</a>
                        </p>
                        <p className="right s-fc3">
                            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" className="alink s-fc3">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
                            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" className="alink s-fc3 police-link">
                                <span className="police-logo"></span>
                                <span className="police-text">浙公网安备 33010902002564号</span>
                            </a>
                        </p>
                    </div>
                    <ul className="enter f-fr">
                        {
                            copys.map(copy => {
                                return (
                                    <CopyItem key={copy.name} {...copy} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;