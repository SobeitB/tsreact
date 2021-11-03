import one from '../../../img/01.svg';
import two from '../../../img/02.svg';
import {useAppSelector} from '../../../app/hooks';
import {useCallback, memo} from 'react';

function random(min: number, max: number): number {
   return Math.round(Math.random() * (max-min) + min)
}

const ComponentClan = () => {
   const {messages} = useAppSelector(state => state.messagesClan);

   const randomCallback = useCallback(() => {
      console.log(messages)
      return random(10, 20)
   }, []);
   return(
      <>
         {
            messages.length === 0 ?
               <h1 className="chat__title-error">Нету сообщений</h1>
            :
               messages.map(message => {
                  return(
                     message.from === "username" 
                     ?
                        <div key={message.id} className="chat__message chat__message--my" >
                           <div className="chat__time">{message.createdAt}</div>
                              <div className="message">
                                 <p className="message__body message__body--my">{message.text}</p>
                              </div>
                           </div>
                     :
                        <div key={message.id} className="chat__message">
                           <div className="chat__content">
                              <div className="message">
                                 <div className="message__header">
                                    <div className="message__icon">
                                       <img src={one} alt="btc" />
                                    </div>
                                    <p className="message__name">{message.from}</p>
                                    <img src={two} className="btc-rigth" alt="btc" />
                                    <div className="message__number">{randomCallback()}</div>
                                 </div>
                                    <p className="message__body">{message.text}</p>
                              </div>
                        </div>
                           <div className="chat__time">{new Date(message.createdAt).toLocaleTimeString().slice(0,-3)}</div>
                        </div>
                  )
               })
         }
      </>
   )
};

export default memo(ComponentClan);