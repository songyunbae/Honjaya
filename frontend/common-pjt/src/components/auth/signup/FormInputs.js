import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkNickname, checkEmail, signup } from './signup-slice'
import EmailCheck from './EmailCheck'
import axios from '../../../api/http'

const FormInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  width: 95%;
  height: 1rem;
  font-family: Minseo;

  &:focus {
    border: 3px solid #00cfb4;
  }

  & + & {
    margin-top: 1rem;
  }

  &.email {
    width: 75%;
  }

  &.nickname {
    width: 75%;
  }

  &.birth {
    width: 75%;
    cursor: pointer;
  }
`

const StyledBtn = styled.button`
  height: 3rem;
  background-color: #00cfb4;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.4rem;
  font-family: Minseo;
  cursor: pointer;

  &:hover {
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const CheckDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const InBtn = styled.button`
  background-color: #00cfb4;
  color: white;
  width: 100%;

  border-radius: 0.5rem;
  border: 0;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1.5rem;
  font-family: Minseo;
  cursor: pointer;

  &:hover {
    background-color: #009c87;
    color: #e0e0e0;
    font-size: 1.6rem;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const ErrorText = styled.span`
  width: 100%;
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const SuccessText = styled.span`
  width: 100%;
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const FormInputs = () => {
  // 필드 유효성검사
  const [emailValid, setEmailValid] = useState(true)
  const [nicknameValid, setNicknameValid] = useState(true)
  const [nameValid, setNameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)

  // 비밀번호 재확인 변수
  const [checkedPwd, setCheckedPwd] = useState(true)

  // 닉네임, 이메일 중복체크
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] = useState(false)
  const [isDuplicateEmailChecked, setisDuplicateEmailChecked] = useState(false)

  //필드 값 입력
  const [userEmail, setUserEmail] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userGender, setUserGender] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [userBirthday, setUserBirthday] = useState('')

  // default에서 이메일, 닉네임 에러 메시지 방지
  const [defaultEmail, setDefaultEmail] = useState(false)
  const [defaultPwd, setDefaultPwd] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)
  const [defaultName, setDefaultName] = useState(false)

  const [confirmNickname, setConfirmNickname] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  // 이메일 인증 모달 변수
  const [emailModal, setEmailModal] = useState(false) // t: opend, f: closed
  const [checkedEmail, setCheckedEmail] = useState(false) // t: checked, f: notchecked
  const [code, setCode] = useState(null) // 난수

  // 이메일 인증 모달 열기
  async function openEmailModal(e) {
    const email = document.querySelector('.email').value

    // 이메일이 유효하고, 값이 존재할 경우
    if (emailValid && email && isDuplicateEmailChecked) {
      // 난수 생성
      const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
      setCode(randomCode)

      // 메일 전송
      axios
        .post('/honjaya/users/email', { code: randomCode, email })
        .catch((err) => console.log(err))

      setEmailModal(true)
    }
  }

  // 이메일 모달 닫기
  const closeEmailModal = (e) => {
    setEmailModal(false)
    setCode(null)
  }

  // 이메일 유효성 검사
  const validateEmail = (e) => {
    // ^ 시작일치, $ 끝 일치
    // {2, 3} 2개 ~ 3개
    // * 0회 이상, + 1회 이상
    // [-_.] - 또는 _ 또는 .
    // ? 없거나 1회

    if (e.target.value) {
      setDefaultEmail(true)
    } else {
      setDefaultEmail(false)
    }

    let regexp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (regexp.test(e.target.value)) return setEmailValid(true)
    else return setEmailValid(false)
  }

  // 비밀번호 유효성 검사 | 8이상 15이하의 영어 + 기호(~!@#$%^) + 숫자 
  const validatePwd = (e) => {
    var patternEngAtListOne = new RegExp(/[a-zA-Z]+/) // + for at least one
    var patternSpeAtListOne = new RegExp(/[~!@#$%^]+/) // + for at least one
    var patternNumAtListOne = new RegExp(/[0-9]+/) // + for at least one

    if (e.target.value) {
      setDefaultPwd(true)
    } else {
      setDefaultPwd(false)
    }

    if (
      patternEngAtListOne.test(e.target.value) &&
      patternSpeAtListOne.test(e.target.value) &&
      patternNumAtListOne.test(e.target.value) &&
      e.target.value.length >= 8 &&
      e.target.value.length <= 15
    ) {
      return setPwdValid(true)
    } else return setPwdValid(false)
  }

  // 비밀번호 재확인
  const checkPassword = (e) => {
    if (
      defaultPwd &&
      pwdValid &&
      e.target.value === document.querySelector('.userPassword').value
    ) {
      return setCheckedPwd(true)
    } else return setCheckedPwd(false)
  }

  // 닉네임 유효성 검사 | 2~10자 이하의 한글,영어,숫자만
  const validateNickname = (e) => {
    if (e.target.value) {
      setDefaultNickname(true)
    } else {
      setDefaultNickname(false)
    }

    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
    if (
      regexp.test(e.target.value) &&
      e.target.value.length <= 10 &&
      e.target.value.length >= 2
    )
      return setNicknameValid(true)
    else return setNicknameValid(false)
  }

  // 이름 유효성 검사 | 1~30자
  const validateName = (e) => {
    if (e.target.value.length <= 30 && e.target.value.length >= 1)
      return setNameValid(true)
    else return setNameValid(false)
  }

  // 성별 선택
  const changeGender = (e) => {
    setUserGender(e.target.value)
  }

  // 전화번호 유효성 검사 및 형식 자동 변환
  const [checkedPhone, setCheckedPhone] = useState(true)
  const checkPhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/
    if (regex.test(e.target.value)) {
      setUserPhone(e.target.value)
    }
  }

  useEffect(() => {
    if (userPhone.length === 10) {
      setUserPhone(userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (userPhone.length === 13) {
      setCheckedPhone(true)
      setUserPhone(
        userPhone
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      )
    } else setCheckedPhone(false)
  }, [userPhone])

  // 닉네임 중복 체크
  function isValidNickname() {
    dispatch(checkNickname(userNickname))
      .unwrap()
      .then((res) => {
        if (res.data.trueOrFalse) {
          return setisDuplicateNicknameChecked(false)
        } else return setisDuplicateNicknameChecked(true)
      })
      .catch((err) => {
        if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  // 이메일 중복체크
  function isValidEmail() {
    dispatch(checkEmail(userEmail))
      .unwrap()
      .then((res) => {
        //이메일이 중복이 아닐때만 중복검사결과가 true로 바뀜
        if (res.data.isDuplicated) {
          return setisDuplicateEmailChecked(false)
        } else return setisDuplicateEmailChecked(true)
      })
      .catch((err) => {
        if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  // 폼 제출 함수
  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      userEmail,
      userNickname,
      userPassword,
      userGender,
      userBirthday,
      userName,
      userPhone,
    }
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        history.push('/')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert('입력하신 정보를 한번 더 확인해주세요')
        } else if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  // 아래 모든 조건 만족시 계정 생성하기 버튼 활성화
  let btnDisabled = true
  if (
    checkedEmail && // 이메일 인증
    checkedPwd && // 비밀번호 재확인
    pwdValid && // 비밀번호 유효성
    isDuplicateNicknameChecked && // 닉네임 중복
    nicknameValid && // 닉네임 유효성
    nameValid && // 이름 유효성
    userBirthday && // 생일 입력
    userGender && // 성별 체크
    checkedPhone // 휴대폰 유효성
  ) { btnDisabled = false }


  return (
    <FormInputsBlock onSubmit={(e) => {
      if ( 
        checkedEmail && 
        checkedPwd && 
        isDuplicateNicknameChecked && 
        nameValid &&
        userBirthday && 
        userGender && 
        userPhone 
        ) { handleSubmit(e)}}}>


      <CheckDiv>
        <StyledInput
          type="email"
          autoComplete="userEmail"
          name="userEmail"
          placeholder="이메일"
          onChange={(e) => {
            setUserEmail(e.target.value)
            if (checkedEmail) setCheckedEmail(false)
          }}
          value={userEmail}
          className="email"
          onBlur={(e) => {
            validateEmail(e)
            isValidEmail(e)
          }}/>
        <StyledBtn type="button" onClick={openEmailModal} disabled={checkedEmail}>
          인증하기
        </StyledBtn>
      </CheckDiv>
      {defaultEmail && !emailValid ? (
        <ErrorText className="errorText">유효하지 않은 이메일입니다.</ErrorText>) : null}
      {defaultEmail && !isDuplicateEmailChecked && emailValid ? (
        <ErrorText className="errorText">이미 존재하는 이메일입니다</ErrorText>) : null}
      {emailModal ? (
        <EmailCheck
          closeEmailModal={closeEmailModal}
          setCheckedEmail={setCheckedEmail}
          code={code}
        />) : null}
      {checkedEmail ? <SuccessText>인증된 이메일입니다</SuccessText> : null}

      <StyledInput
        type="password"
        autoComplete="userPassword"
        name="userPassword"
        className="userPassword"
        placeholder="비밀번호"
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
        onBlur={validatePwd} />
      {!pwdValid && defaultPwd ? (
        <ErrorText>
          비밀번호는 8~15자의 영어, 숫자, 기호(~!@#$%^)를 조합해주세요
        </ErrorText> ) : null}

      <StyledInput
        type="password"
        autoComplete="userPassword"
        placeholder="비밀번호 확인"
        onBlur={checkPassword} />
      {pwdValid ? (
        checkedPwd ? null : (
          <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>
        )) : null}

      <CheckDiv>
        <StyledInput
          className="nickname"
          autoComplete="userNickname"
          name="userNickname"
          placeholder="닉네임"
          onChange={(e) => {
            setUserNickname(e.target.value)
            if (isDuplicateNicknameChecked) { setisDuplicateNicknameChecked(false) }
            if (confirmNickname) { setConfirmNickname(false) }
            }}
          value={userNickname}
          onBlur={(e) => { validateNickname(e) }} />
        <StyledBtn
          type="button"
          onClick={(e) => {
            if (nicknameValid && defaultNickname) { isValidNickname(e) }
            setConfirmNickname(true)
          }}>
          중복확인
        </StyledBtn>
      </CheckDiv>
      {defaultNickname && !nicknameValid ? (
        <ErrorText>
          닉네임은 2~10자 이하의 한글,영어,숫자만 입력할 수 있어요
        </ErrorText>) : null}
      {defaultNickname && nicknameValid &&
        !isDuplicateNicknameChecked && !confirmNickname ? (
          <ErrorText>닉네임 중복확인이 필요합니다</ErrorText>) : null}
      {defaultNickname && nicknameValid &&
        !isDuplicateNicknameChecked && confirmNickname ? (
          <ErrorText>사용불가능한 닉네임입니다</ErrorText> ) : null}
      {isDuplicateNicknameChecked ? (
        <SuccessText>사용 가능한 닉네임입니다</SuccessText> ) : null}

      <StyledInput
        autoComplete="userName"
        name="userName"
        placeholder="이름"
        onChange={(e) => {
          setUserName(e.target.value)
          if (e.target.value) { setDefaultName(true)
          } else { setDefaultName(false) }
          if (nameValid) { setNameValid(false) }
        }}
        onBlur={validateName}
        value={userName} />
      {defaultName && !nameValid ? (
        <ErrorText>이름은 1~30자로 입력할 수 있어요</ErrorText>
      ) : null}

      <CheckDiv>
        <StyledInput
          type="date"
          autoComplete="userBirthday"
          name="userBirthday"
          onChange={(e) => setUserBirthday(e.target.value)}
          value={userBirthday}
          className="birth" />

        <div style={{ fontSize: '1.5rem' }}>
          <label>
            <input
              name="userGender"
              type="radio"
              value="m"
              checked={userGender === 'm'}
              onChange={changeGender} />
            남
          </label>
          <label>
            <input
              name="userGender"
              type="radio"
              value="f"
              checked={userGender === 'f'}
              onChange={changeGender} />
            여
          </label>
        </div>
      </CheckDiv>

      <StyledInput
        autoComplete="userPhone"
        name="userPhone"
        placeholder="전화번호 ex)010-0000-0000"
        onChange={checkPhone}
        onBlur={(e) => { this.onChange(e) }}
        value={userPhone}
      ></StyledInput>
      {!checkedPhone && userPhone ? (
        <ErrorText>전화번호를 11자리 모두 입력해주세요.</ErrorText>) : null}
      <InBtn disabled={btnDisabled}>계정 생성하기</InBtn>
    </FormInputsBlock>
  )
}

export default FormInputs