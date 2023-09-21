import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/BaseLayout.module.css';

const BaseLayout = ({children,isDarkMode}) => {
    return (
        <div className={`${styles.baseLayout} ${isDarkMode?styles.baseLayoutDark:""}`}>
            <div>{children}</div>
        </div>
    )
}

const mapStateToProps = ({theme})=>({
    isDarkMode:theme.isDarkMode
});

export default connect(mapStateToProps)(BaseLayout);