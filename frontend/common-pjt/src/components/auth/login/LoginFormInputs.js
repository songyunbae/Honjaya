import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { login,savePoint } from './login-slice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginFormInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
`

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  padding: 1rem 0.5rem;
  width: 95%;
  height: 1rem;
  font-family: Jua;
  margin-top: 1.5rem;

  &:focus {
    border: 3px solid #adff45;
  }
`

const LoginBtn = styled.button`
  background-color: #FF728E;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 0.5rem;
  border: 0;
  padding: 1rem 0.5rem;
  margin: 1.5rem 0;
  font-size: 1.2rem;
  font-family: Jua;

  &:hover{
    background-color: #FF728E;
    color: #e0e0e0;
  }
`


const LoginFormInputs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    const data = {
      userEmail,
      userPassword
    }
    dispatch(login(data))
    .unwrap()
    .then(() => {
      // console.log(res) 이렇게 쓸려면 ()안에 인자로 담으면됨
      navigate('/main')

    })
    .catch((err) => {
      // console.log("error 도착")
      // console.log(err.status)
      if (err.status === 400) {
        alert('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
      } else if (err.status === 401) {//refresh token 발급
        console.log('토큰발급필요')
      } else if (err.status === 403) {
        alert('신고누적으로 사용이 정지된 유저입니다')
      } else if (err.status === 500) {
        navigate('/error')
      } 
      })
  }


  return (
    <LoginFormInputsBlock
      onSubmit = {handleSubmit}
    >
      <StyledInput
        autoComplete="userEmail"
        name="userEmail"
        placeholder="이메일을 입력하세요"
        onChange={(e) => setEmail(e.target.value)}
        value={userEmail}
        className="email"
      />
      <StyledInput
        type="password"
        autoComplete="userPassword"
        name="userPassword"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
        value={userPassword}
        className="password"
        
      />

      <LoginBtn>로그인</LoginBtn>
    </LoginFormInputsBlock>
  );
};

export default LoginFormInputs;