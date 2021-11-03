import '../../style/chat.css';
import one from '../../img/01.svg';
import smile from '../../img/smile.png';
import {HeaderComponent} from './header';
import ComponentCommon from './chat/ComponentCommon';
import ComponentClan from './chat/ComponentClan';
import ComponentFriends from './chat/ComponentFriends';
import ComponentNews from './chat/ComponentNews';
import {InpLang} from './header';
import {Formik} from 'formik';
import * as yup from 'yup';
import openSocket from "socket.io-client";
import {useEffect, useCallback, useRef} from 'react';
import {messagesAsyncCommon} from '../../app/reducers/messages/messagesCommon';
import {useAppDispatch,useAppSelector} from '../../app/hooks';
import {messagesCommon} from '../../app/reducers/messages/messagesCommon';
import {nanoid} from '@reduxjs/toolkit'

const ws = openSocket('wss://test-chat-backend-hwads.ondigitalocean.app', {
   transports: ["websocket"],
   upgrade: false,
});

const MainComponents = () => {
   const dispatch = useAppDispatch();
   const {chatType} = useAppSelector(state => state.chengedSlice);
   const {scrollAvailable} = useAppSelector(state => state.messagesCommon);

   const {messageNewCommon} = messagesCommon.actions;
   const {messageYourCommon} = messagesCommon.actions;

   const chatBody = useRef(null);
   const chatNumber = useRef<HTMLDivElement>(null);
   const valid = yup.object().shape({
      message: yup.string().required('имя Обязателен').max(200, "Максимум 200 симвовло в сообщении"),
   })

   useEffect(() => {
      if(chatBody.current !== null) {
         const chatBodyCurrent: any = chatBody.current
         chatBodyCurrent.scrollTop = chatBodyCurrent.scrollHeight;
      }
   }, [chatType])

   let handler = useCallback((data) => {
      dispatch(messageYourCommon(data));
   }, []);

   useEffect(() => {
      console.log(ws)
   }, [ws])

   useEffect(() => {
      ws.on('message', handler)

      return () => {
         ws.off('message', handler)
      }
   }, [ws, handler])

   useEffect(() => {
      let observerRef = new IntersectionObserver((entry) => { 
         if(entry[0].isIntersecting) {
            dispatch(messageNewCommon())
            dispatch(messagesAsyncCommon())
            if(chatBody.current !== null) {
               const chatBodyCurrent: any = chatBody.current
               chatBodyCurrent.scrollTop = chatBodyCurrent.scrollHeight;
            } 
         }
      })

      if(chatNumber.current !== null) {
         observerRef.observe(chatNumber.current)
      }
   },[])

   return (
      <div className="body">
          <div className="chat">
            <HeaderComponent />
               <div ref={chatBody} className="chat__body">
                  {scrollAvailable && <div ref={chatNumber} className="chat__number"></div>}
                  <div  className="chat__message">
                     <div className="chat__content">
                        <div className="message">
                           <div className="message__header">
                              <div className="message__icon">
                                 <img src={one} alt="btc" />
                              </div>
                              <p className="message__name">BivOld</p>
                              <div className="message__number">5</div>
                              </div>
                              <p className="message__body">Я думал, что они будут пополнятся разв н-ное время. А тут реально игра закончена</p>
                           </div>
                        </div>
                        <div className="chat__time">14:28</div>
                     </div>
                     <div  className="chat__message">
                     <div className="chat__content">
                        <div className="message">
                           <div className="message__header">
                              <div className="message__icon">
                                 <img src={one} alt="btc" />
                              </div>
                              <p className="message__name">Nigativ</p>
                              <div className="message__number">10</div>
                              </div>
                              <p className="message__body">wac можно только купить</p>
                           </div>
                        </div>
                        <div className="chat__time">14:31</div>
                     </div> 
                     <div className="chat__message">
                        <div className="chat__content">
                           <div className="message">
                              <div className="message__header">
                              <div className="message__icon">
                                 <img src={one} alt="btc" />
                              </div>
                              <p className="message__name">Skylifesky</p>
                              <div className="message__number">10</div>
                              </div>
                              <p className="message__body">Цена 1 wac =0,1$ и цена не изменится</p>
                           </div>
                        </div>
                        <div className="chat__time">14:31</div>
                     </div>

                     {chatType === 'common' && <ComponentCommon />}
                     {chatType === 'clan' && <ComponentClan />}
                     {chatType === 'friends' && <ComponentFriends />}
                     {chatType === 'news' && <ComponentNews />}

            </div>
            
            <div className="chat__footer">
            <Formik
               initialValues={{
                  message:''
               }}
               validationSchema={valid}
               onSubmit={(values, actions) => {
                  ws.emit('message', {
                     from: "username",
                     text: values.message
                  })
                  const messageAcion = {
                     createdAt: `${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()} `,
                     from: "username",
                     id: nanoid(20),
                     text:values.message
                  }

                  dispatch(messageYourCommon(messageAcion))

                  actions.resetForm({
                     values: {
                        message:''
                     }
                  })

                  if(chatNumber.current !== null) {
                     const chatBodyCurrent: any = chatBody.current;
                     chatBodyCurrent.scrollTop = chatBodyCurrent.scrollHeight;
                  }
               }}
         	>
               <InpLang />
            </Formik>
               <p className="chat__smile">
                  <img src={smile} alt="" />
               </p>
            </div>
         </div>
      </div>
   );
};

export default MainComponents;