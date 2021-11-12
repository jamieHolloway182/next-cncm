import Header from './Header'
import styles from '../styles/layout.module.css'

const Layout = ({body}) => {
    return (
        <div>
           <Header></Header>
           <div className={styles.bodyDivider}>
                <marquee>
                    Breaking News: Alex Staicu sucks!
                </marquee>
            </div> 
            {body}
            <div className={styles.bodyDivider}></div>

            <div>
                <footer>
                    <ul>
                    <li><a href="https://github.com/Loganmaxwell6/CNCM">Github repo</a></li>
                    <li><a href="https://cipherchallenge.org">Cipher challenge</a></li>
                    <li><a href="https://open.spotify.com/artist/1GLnyPuL45vOsZPs5iANcC">Ciphertools</a></li>
                    <li><a href="https://www.youtube.com/channel/UCEngD8C9GIJmDryhI8Rkqtg">morg</a></li>
                    </ul>
                    <p>&copy; Crooked Nazgul Code Men 2021</p>
                </footer>
            </div>
        </div>
    )
}

export default Layout
