
import React, { useEffect } from "react";
import styles from './Loading.module.scss';
const Loading = () => {
    useEffect(() => {
        const div = document.body;
        div.style.overflow = 'hidden';

        // clean up function
        return () => {
            // remove resize listener
            const div = document.body;
            div.style.overflow = 'auto';
        }
    });

    return (
        <div className={styles.loadingWrap}>
            <section>
                <div className={styles.clock}></div>
                <p>Loading...</p>
            </section>
        </div>
    )
}

export const LoadingCircle = () => {
    return (
        <div>
            <div className={styles.loading}>
            </div>
            <div>
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loading;