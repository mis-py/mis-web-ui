import React from 'react';
import styles from "assets/css/components/common/LoadingOverlay.module.css"

const Overlay = () => {
    return (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50">
            <div className={styles.spinner} />
        </div>
    );
};

export default Overlay;
