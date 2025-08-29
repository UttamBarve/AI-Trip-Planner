import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center text-gray-500'>
       <div>
        <h2>Created By Uttam Barve</h2>
       </div>
       <div className='flex gap-5 items-center justify-center'>
        <Link to={'https://www.linkedin.com/in/uttambarve/'} target='_blank'>
        <FaLinkedin  />
        </Link>
        <Link to={'https://github.com/UttamBarve'}  target='_blank'>
        <FaGithub  />
        </Link>
        <Link to={'https://leetcode.com/u/uttambarve/'}  target='_blank'>
        <SiLeetcode />
        </Link>
       </div>
    </div>
  )
}
