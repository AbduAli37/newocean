import React, { useState } from 'react'
import './testwhatsapp.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';
const TestWhatsApp = () => {
  const [phone,setPhone]=useState("");
  const [loading,setLoading]=useState(false)

  const handleWhatsCon=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("token","EAAEfUFF0i30BOxwDYrMHcI7CqIZA5aWcw6yCU8TQ7UjGx3bnsSHH0rn9B2aZAUpSW1LIY1mBDEeiS6AcIIe6BNpZCihFIMAAfWvXMYNiXz3oTIfrA3ZBcklUoQCBZC1cQfatK6KbCJ8vZAgfVQ5VbC3HdkUbswGglhQiVZBYPexSZABk2OdZA7pfTK1wvgPgokTmeDZAnlyZABjcYN0KZAJPHIuJGr7WgpMHrhWSXlh1L4UOnRrzlyLnGHmOubpOPOwvOSkZD");
    urlencoded.append("to","+0201276549343");
    urlencoded.append("body","رسالة تجريبية من UltraMsg.com");


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
fetch("https://graph.facebook.com/v18.0/105954558954427/messages", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
  }
  return (
    <div className='whatsapp_contact'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleWhatsCon()
      }} className='contact_form'>
        <h4>يمكنك إرسال رقمك وسوف نتواصل معك</h4>
        <input onChange={(e)=>{
          setPhone(e.target.value)
        }} placeholder='إكتب رقمك' type="text"  />
        <button

          disabled={loading}
          style={{cursor:loading?'no-drop':'pointer'}}
        >
          {
            loading?<AiOutlineLoading/>:
            (
              <a style={{ color:'white' }} href={`https://wa.me/${phone}?text=${encodeURIComponent('welcome to you bro')}&source=${'senderPhoneNumber'}`}>إرسال</a>
            )
          }
        </button>
      </form>
    </div>
  )
}

export default TestWhatsApp
