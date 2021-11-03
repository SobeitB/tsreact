import {chengedSlice} from '../../app/reducers/messages/chengedSlice';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {useState} from 'react';
import {Field, Form} from 'formik';
import nav from '../../img/arrow_nav.svg';
import circle from '../../img/header__circle.svg';

export const HeaderComponent = () => {
   const [dropdownLanguage, setDropdownLanguage] = useState(false)
   const {language} = useAppSelector((state) => state.chengedSlice)
   const {chatType} = useAppSelector((state) => state.chengedSlice)

   const dispatch = useAppDispatch();

   const {languageChanged} = chengedSlice.actions;
   const {ChatChanged} = chengedSlice.actions;

   return(
      <nav className="chat__header">
         {language === 'ZHO' ? 
            <div className="chat__header-nav">
               <p className={`chat__header-item ${chatType === 'common' && 'chat__header-item--active'}`} 
                  onClick={() => dispatch(ChatChanged('common'))}>氏族</p>
                   
               <p className={`chat__header-item ${chatType === 'clan' && 'chat__header-item--active'}`} 
                  onClick={() => dispatch(ChatChanged('clan'))}>一般事务</p>

               <p className={`chat__header-item ${chatType === 'friends' && 'chat__header-item--active'}`} 
                  onClick={() => dispatch(ChatChanged('friends'))}>朋友</p> 

               <p className={`chat__header-item ${chatType === 'news' && 'chat__header-item--active'}`} 
                  onClick={() => dispatch(ChatChanged('news'))}>新闻中心</p>
            </div>
            :
            <div className="chat__header-nav">
               <p 
               className={`chat__header-item ${chatType === 'common' && 'chat__header-item--active'}`} 
               onClick={() => dispatch(ChatChanged('common'))}>
                  {language === 'RU' ? 'общий' : 'common'}
               </p>

               <p 
               className={`chat__header-item ${chatType === 'clan' && 'chat__header-item--active'}`} 
               onClick={() => dispatch(ChatChanged('clan'))}>
                  {language === 'RU' ? 'клан' : 'clan'}
               </p> 

               <p 
               className={`chat__header-item ${chatType === 'friends' && 'chat__header-item--active'}`} 
               onClick={() => dispatch(ChatChanged('friends'))}>
                  {language === 'RU' ? 'друзья' : 'friends'}
               </p>

               <p 
               className={`chat__header-item ${chatType === 'news' && 'chat__header-item--active'}`} 
               onClick={() => dispatch(ChatChanged('news'))}>
                  {language === 'RU' ? 'новости' : 'news'}
               </p> 

            </div>
         } 
         <img className="chat__arrow" src={nav} />
         <div className="chat__nav-right">
            <div className="chat__language-change">
               <p className="chat__language-text" onClick={() => setDropdownLanguage(!dropdownLanguage)}>{language}</p>
               <img src={nav} onClick={() => setDropdownLanguage(!dropdownLanguage)}  className="chat__arrow-lang"/> 
               <div className={`chat__dropout-lang ${dropdownLanguage && 'dropout-active'}`}>
                  <p onClick={() => {
                     dispatch(languageChanged('RU'))
                     setDropdownLanguage(!dropdownLanguage)
                  }} className="language-change--link">RU</p>
                  <p onClick={() => {
                     dispatch(languageChanged('EN'))
                     setDropdownLanguage(!dropdownLanguage)
                  }} className="language-change--link">EN</p>
                  <p onClick={() => {
                     dispatch(languageChanged('ZHO'))
                     setDropdownLanguage(!dropdownLanguage)
                  }} className="language-change--link">ZHO</p>
               </div>
            </div>
                  
            <img className="chat__circle chat__circle-items" src={circle} />

            <div className="chat__circle chat__circle-two">
               <div className="chat__circle-items-two"></div>
            </div>
         </div>
      </nav>
   );
}

export function InpLang ()  {
   const {language} = useAppSelector((state) => state.chengedSlice)
   return (
      <Form>
         {language === 'EN' ? 
            <Field name="message" type="text" className="chat__footer-input" placeholder="Write a message..." />
         :
            <Field name="message" type="text" className="chat__footer-input" placeholder={language === 'RU' ? 'Напишите сообщение...' : '写一封信。..' } />
         }
      </Form>
   )
}