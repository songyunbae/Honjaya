import React, { useState } from "react"
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Background = styled.div`
    background-color: #FFFDDE;
    width: 100vw;
    height: 100vh;    
    overflow: hidden;
`

const Form = styled.div`
    display: flex;
    justify-content: center; 
    flex-direction: column; 
    align-items: center;
`

const PledgeTemplate = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 1rem;
    height: 600px;
    width: 500px;
    border-radius: 3%;
    background-color: #CCF3EE;
`

const Title = styled.div`
    display: flex;
    height: 15%;
    margin: 1.2rem;
`

const Logo = styled.img`
    height: 100%;
`

const Phrase = styled.p`
    font-family: 'Jua';
    font-size: 2rem;
    padding-top: 2.5rem;
    color: #333333;
`

const TextBox = styled.div`
    position: absolute;
    top: 8rem;
    height: 62%;
    width: 80%;
    border-radius: 3%;
    padding: 20px;
    background-color: #ffffff;
`

const Agree = styled.div`
    position: absolute;
    top: 35rem;
`
const CheckBox = styled.input`
    position: absolute;
    right: 2rem;
    top: 0.1rem;
    
`

const Button = styled.button`
  position: relative;
  top:1rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin:auto;

  /* 크기 */
  height: 2.25rem;
  width: 7rem;
  font-size: 1rem;

  /* 색상 */
  background: #FF728E;
  
  &:disabled {
    cursor: default;
    background: #FF728E;
  }
  
  /* &:hover {

  } */
  &:active {
    background: #FF728E;
  }

`

const Pledge = () => {

    // 동의 체크 여부 판별
    const [check, setCheck] = useState(false);
    const clickEvent = () => {
        if (check === false){
            setCheck(true)
        } else{
            setCheck(false)
        }
    }

    console.log(check)
    return (
        <Background>
            <Form>
                <PledgeTemplate>
                    <Title>
                        <Logo src={logo}/>
                        <Phrase >이용을 위한 서약서</Phrase>
                    </Title>
                    <TextBox>
                        <li style={{fontFamily:"Jua", fontSize:'1.5rem'}}>제발 이거는 지켜 주십쇼</li>
                    </TextBox>
                    <Agree> 
                        <CheckBox type="checkbox" checked={check} onChange={clickEvent}></CheckBox>
                        <label>동의</label>
                    </Agree>
                </PledgeTemplate>
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <div >
                        {
                            check === true 
                            ? (<Button hover={true} >다음</Button>)
                            : (<Button hover={false} disabled={!check}>다음</Button>)
                        }
                    </div>
                </Link>
            </Form>
        </Background>
    )
}

export default Pledge