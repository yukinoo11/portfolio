import React from 'react'
import { Link , useLocation } from "react-router-dom";
import styles from './navigation.module.css';

const Navigation = (props) => {
    const { number, max , onChange } = props;
    const handlePrev = () => onChange(Math.max(0, number - 1));
    const handleNext = () => onChange(Math.min(max - 1, number + 1));

    return (
        <div className= { styles.navigation }>
            <section>
                <div className={`${styles['control-left']}`}><button type='button' onClick={handlePrev} ><img src='/images/study/arrow_left.png' alt='left' /></button></div>
                <div className={`${styles['control-text']}`}>{number + 1} / {max}</div>
                <div className={`${styles['control-right']}`}><button type='button' onClick={handleNext}><img src='/images/study/arrow_right.png' alt='right' /></button></div>
            </section>
        </div>
    )
}

export const TopNavigation = ( props )=>{
    const { iconURL, onClicked  } = props;

    const handleClick = ( e ) => {
      if( onClicked ) onClicked();
    }

    return(
        <div className = {styles.topNavigation}>
            <section>
                <span className={`${styles['header-icon']}`}>
                  { iconURL ? (
                    <button onClick={ handleClick }><img src={iconURL} className={styles.prevIcon} alt='prev'/></button>
                  ) : (
                    <button onClick={ handleClick }><img src='/svg/menu.svg' className={styles.prevIcon} alt='prev'/></button>
                  )}
                </span>
            </section>
        </div>
    )
}

export const BtnNavigation = ( props ) => {
  const { text , link  } = props;
  return(
      <div className = {styles.topNavigation}>
          <section>
              <span className={`${styles['header-icon']}`}>
                  <Link to={link}><img src='/images/study/button_prev.png' className={styles.prevIcon} alt='prev' /></Link>
              </span>
              <span className={`${styles['header-title']}`}>{text}</span>
          </section>
      </div>
  )
}

export const SideMenu = ( props ) => {
    const { menus, onClicked } = props;
    const pathName = useLocation().pathname;

    const renderers = menus.map(( data, i) => {
      return(
        <li key={i} onClick={ (e) => onClicked }>
          <SelectedMenu 
            index = {i}
            selected = { pathName === data.url ? true : false} 
            label = { data.label } 
            url = { data.url }/>
        </li>
      );
    });
      
    return (
      <ul className={`${styles['navigation-menu']}`}>
        {renderers}
      </ul>
    ); 
}

const SelectedMenu = (props) => {
  const { url , label } = props;
  console.log(url)
  if(props.selected){
    return (
      <>
      <Link to={url} className='active'>{label}</Link>
      </>
    );
  }else{
    return(
      <>
      <Link to={url}>{label}</Link>
      </>
    );
  }
}

export const SliderMenu = ( props ) => {
  const { handleClose } = props;
  return(
    <div className= {`${styles['menu-container']}`}>
      <header>
        <button onClick = { handleClose }>&times;</button>
      </header>
      <section>
        { props.children }
      </section>
    </div>

  )
}
export default Navigation;