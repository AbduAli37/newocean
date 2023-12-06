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

    const body = {
      messaging_product: "whatsapp",
      to: "020" + 1276549343,
      type: "template",
      template: {
        name: "hello_world",
        language: { code: "en_US" },
        components: [
          {
            "type": "body",
            "parameters": [
                {
                  "type": "text",
                  "text": "{1}"
                }
              ]
          }
        ]
      }
    };
    axios
      .post(
        `https://graph.facebook.com/v18.0/105954558954427/messages`,
        body,Headers
      )
      .then((res) => console.log("sent successfully", res))
      .catch((err) => console.log("error while sending", err));
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
              'edwdw'
              // <a style={{ color:'white' }} href={`https://wa.me/${phone}?text=${encodeURIComponent('welcome to you bro')}&source=${'senderPhoneNumber'}`}>إرسال</a>
            )
          }
        </button>
      </form>
    </div>
  )
}

export default TestWhatsApp
