import React, { Component} from "react";
import styles from './AdminUser.module.css';
class AdminUser extends Component {
  render(){
    return(
      <div className={styles.userContainer}>
        <section>
        <div className={`${styles['my-info']}`}>데지꿍깡</div>
        <div className={`${styles['avatar-conatiner']}`}>
          <img className={`${styles['avatar']}`} alt='user' src='/images/userimg.jpg'/>
        </div>
        </section>
      </div>
    );
  }
}

export default AdminUser;