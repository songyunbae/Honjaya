import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import { loadUser } from '../../auth/login/login-slice'
import { checkNickname, modifyUserInfo } from '../../auth/signup/signup-slice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25%;
  background-color: #ccf3ee;
`

const LogoDiv = styled.div`
  height: 50%;
  margin-top: 1.8rem;
`

const Logo = styled.img`
  height: 100%;
`

const HeaderText = styled.p`
  font-family: Minseo;
  font-size: 3rem;
  color: #00cfb4;
  margin: 0;
`

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
`

const FormBox = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  position: absolute;
  margin-left: 4rem;
  bottom: 1rem;
  width: 50%;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`
const InfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  height: 70%;
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const GenderSelect = styled.select`
  width: 77%;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1.5px solid #333333;
  font-family: Minseo;
  font-size: 1.3rem;
  cursor: pointer;

  &:focus {
    border: 3px solid #00cfb4;
  }
`

const GenderOption = styled.option``

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  padding: 1rem 0.5rem;
  width: 70%;
  height: 1rem;
  font-family: Minseo;

  &:focus {
    border: 3px solid #00cfb4;
  }
  & + & {
    margin-top: 1rem;
  }

  &.email {
    width: 70%;
  }

  &.nickname {
    width: 45%;
    margin-right: 1.5rem;
  }

  &.birth {
    width: 75%;
    cursor: pointer;
  }
`

const Label = styled.div`
  font-family: 'Minseo';
  font-size: 1.4rem;
`
const StyledBtn = styled.button`
  height: 3rem;
  width: 3rem;
  background-color: #00cfb4;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.5rem;
  font-family: Minseo;

  cursor: pointer;

  &:hover {
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const CheckDiv = styled.div``

const BirthdayDiv = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Btn = styled.button`
  &.update {
    background-color: #00cfb4;
    color: white;
    width: 100%;
    border-radius: 0.5rem;
    border: 0;
    padding: 0.5rem;
    font-size: 1.5rem;
    font-family: Minseo;
    cursor: pointer;

    &:hover {
      background-color: #009c87;
      color: #e0e0e0;
    }
  }

  &.cancel {
    background-color: #ff728f;
    color: white;
    width: 100%;
    border-radius: 0.5rem;
    border: 0;
    padding: 0.5rem;
    font-size: 1.5rem;
    font-family: Minseo;
    cursor: pointer;

    &:hover {
      background-color: #ed5c7a;
      color: #e0e0e0;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`
const ErrorText = styled.span`
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Minseo';
`
const SuccessText = styled.span`
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Minseo';
`

const UpdateDiv = styled.div`
  display: flex;
  width: 30%;
`

const CacelDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
`

const CancelLink = styled(Link)`
  display: flex;
  width: 100%;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;
  margin-right: 4rem;
`

const UpdateProfile = () => {
  // ?????? ??????????????? ????????? ???????????? ????????? ???????????? ?????? ????????????
  const { userEmail, userName } = useSelector((state) => state.login.user)

  // ???????????? ?????????????????? ?????????, now+????????????????????????
  // ??????, ????????? ????????? ????????? ???????????? ????????? ???
  const nowUserInfo = useSelector((state) => state.login.user)
  const nowUserNickname = nowUserInfo.userNickname
  const nowUserPhone = nowUserInfo.userPhone
  const nowuserBirthday = nowUserInfo.userBirthday
  const nowUserGender = nowUserInfo.userGender
  const nowUserPassword = nowUserInfo.userPassword
  const nowUserProfilePicUrl = nowUserInfo.userProfilePicUrl
  console.log(nowUserInfo)

  // ??????, ????????? ????????????
  // ?????? ??? ??????
  const [userNickname, setUserNickname] = useState(nowUserNickname)
  const [userPhone, setUserPhone] = useState(nowUserPhone)
  const [userBirthday, setUserBirthday] = useState(nowuserBirthday)
  const [userGender, setUserGender] = useState(nowUserGender)
  const [userPassword, setUserPassword] = useState(nowUserPassword)
  const [userProfilePicUrl, setUserProfilePicUrl] =
    useState(nowUserProfilePicUrl)

  // ?????? ???????????????
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)

  // ????????? ?????? ?????? ?????? ??????
  // t: ????????????, f: ???????????????
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] =
    useState(true)

  // ???????????? ????????? ??????
  const [checkedPwd, setCheckedPwd] = useState(false)

  // ???????????? ????????? ??????
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

  // ???????????? ??????
  const checkPassword = (e) => {
    if (
      defaultPwd &&
      pwdValid &&
      e.target.value === document.querySelector('.userPassword').value
    ) {
      return setCheckedPwd(true)
    } else return setCheckedPwd(false)
  }
  // ????????? ????????? ?????? | 2~10??? ????????? ??????,??????,?????????
  const validateNickname = (e) => {
    if (e.target.value) {
      setDefaultNickname(true)
    } else {
      setDefaultNickname(false)
    }

    let regexp = /^[???-???|???-???|a-z|A-Z|0-9|]+$/
    if (
      regexp.test(e.target.value) &&
      e.target.value.length <= 10 &&
      e.target.value.length >= 2
    )
      return setNicknameValid(true)
    else return setNicknameValid(false)
  }

  // ?????? ??????
  const changeGender = (e) => {
    setUserGender(e.target.value)
  }

  // ???????????? ????????? ?????? ??? ?????? ?????? ??????
  const [checkedPhone, setCheckedPhone] = useState(false)
  const checkPhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/
    if (regex.test(e.target.value)) {
      setUserPhone(e.target.value)
    }
  }

  useEffect(() => {
    if (userPhone !== undefined && userPhone.length === 10) {
      setUserPhone(userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (userPhone !== undefined && userPhone.length === 13) {
      setCheckedPhone(true)
      setUserPhone(
        userPhone
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      )
    } else {
      setCheckedPhone(false)
    }
  }, [userPhone])

  // default?????? ????????? ?????? ????????? ??????
  const [defaultPwd, setDefaultPwd] = useState(true)
  const [defaultPwdCheck, setDefaultPwdCheck] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  //?????? ?????? ?????? ??????
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        alert.err('????????????')
      })
  }, [])

  //????????? ?????? ??????
  function isValidNickname() {
    dispatch(checkNickname(userNickname))
      .unwrap()
      .then((res) => {
        if (
          userNickname === nowUserNickname ||
          res.data.trueOrFalse === false
        ) {
          return setisDuplicateNicknameChecked(true)
        } else return setisDuplicateNicknameChecked(false)
      })
      .catch((err) => {
        if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  //???????????? ?????? ??????
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
      userProfilePicUrl,
    }

    dispatch(modifyUserInfo(data))
      .unwrap()
      .then(() => {
        history.push('/')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert('???????????? ????????? ?????? ??? ??????????????????')
        } else if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  // ?????? ?????? ?????? ????????? ?????? ?????? ?????????
  let disabled = true
  if (
    isDuplicateNicknameChecked && // ????????? ????????????
    nicknameValid && // ????????? ????????? ??????
    checkedPwd && // ???????????? ?????????
    pwdValid && // ???????????? ????????? ??????
    userBirthday && // ?????? ?????? ??????
    checkedPhone // ???????????? ????????? ??????
  ) {
    disabled = false
  }

  return (
    <Background>
      <Header>
        <LogoDiv>
          <Link to="/main" style={{ width: 'fit-content', height: '50%' }}>
            <Logo src={logo}></Logo>
          </Link>
        </LogoDiv>
        <HeaderText>???????????? ??????</HeaderText>
      </Header>

      <Container>
        <FormBox
          onSubmit={(e) => {
            if (
              checkedPwd &&
              isDuplicateNicknameChecked &&
              userBirthday &&
              userGender &&
              userPhone
            ) handleSubmit(e)
          }}
        >
          <InfoBox>
            <LeftBox>
              <CheckDiv>
                <Label>?????????</Label>
                <div>
                  <StyledInput
                    className="nickname"
                    autoComplete="userNickname"
                    name="userNickname"
                    onChange={(e) => {
                      setUserNickname(e.target.value)
                      if (isDuplicateNicknameChecked) {
                        setisDuplicateNicknameChecked(false)
                      }
                    }}
                    value={userNickname}
                    onBlur={(e) => { validateNickname(e) }}
                  ></StyledInput>
                  <StyledBtn
                    type="button"
                    onClick={(e) => {
                      if (nicknameValid && defaultNickname) {isValidNickname(e)}
                    }}>
                    ??????
                  </StyledBtn>
                </div>

                {defaultNickname && !nicknameValid ? (
                  <ErrorText>
                    ???????????? 2~10??? ????????? ??????,??????,????????? ????????? ??? ?????????
                  </ErrorText>
                ) : defaultNickname &&
                  nicknameValid &&
                  !isDuplicateNicknameChecked ? (
                  <ErrorText>????????? ??????????????? ???????????????.</ErrorText>
                ) : null}
                {nowUserNickname !== userNickname &&
                isDuplicateNicknameChecked ? (
                  <SuccessText>?????? ????????? ??????????????????.</SuccessText>
                ) : null}
              </CheckDiv>

              <div>
                <Label>??????(????????????)</Label>
                <StyledInput
                  autoComplete="userName"
                  disabled={true}
                  name="userName"
                  value={userName}
                ></StyledInput>
              </div>

              <div>
                <Label>????????????</Label>
                <StyledInput
                  autoComplete="userPhone"
                  name="userPhone"
                  onChange={checkPhone}
                  placeholder={nowUserPhone}
                  onBlur={(e) => {
                    this.onChange(e)
                  }}
                  value={userPhone}
                ></StyledInput>
              </div>

              <CheckDiv>
                <Label>?????????(????????????)</Label>
                <StyledInput
                  type="email"
                  disabled={true}
                  value={userEmail}
                  className="email"
                ></StyledInput>
              </CheckDiv>
            </LeftBox>

            <RightBox>
              <BirthdayDiv>
                <Label>????????????</Label>
                <StyledInput
                  type="date"
                  autoComplete="userBirthday"
                  name="userBirthday"
                  className="birth"
                  onChange={(e) => setUserBirthday(e.target.value)}
                  value={userBirthday}
                ></StyledInput>
              </BirthdayDiv>

              <CheckDiv>
                <Label>??????</Label>
                <div>
                  <GenderSelect onChange={changeGender} value={userGender}>
                    <GenderOption value="m" key="m">
                      ???
                    </GenderOption>
                    <GenderOption value="f" key="f">
                      ???
                    </GenderOption>
                  </GenderSelect>
                </div>
              </CheckDiv>

              <div>
                <Label>????????????</Label>
                <StyledInput
                  type="password"
                  autoComplete="userPassword"
                  name="userPassword"
                  className="userPassword"
                  placeholder="????????????"
                  onChange={(e) => {
                    setUserPassword(e.target.value)
                  }}
                  value={userPassword}
                  onBlur={validatePwd}
                ></StyledInput>
                {!pwdValid && defaultPwd ? (
                  <ErrorText>
                    ??????????????? 8~15?????? ??????, ??????, ??????(~!@#$%^)??? ??????????????????
                  </ErrorText>
                ) : null}
              </div>

              <div>
                <Label>???????????? ??????</Label>
                <StyledInput
                  type="password"
                  autoComplete="userPassword"
                  placeholder="???????????? ??????"
                  onChange={(e) => {
                    if (e.target.value) {
                      setDefaultPwdCheck(true)
                    } else {
                      setDefaultPwdCheck(false)
                    }
                  }}
                  onBlur={checkPassword}
                ></StyledInput>
                <div>
                  {pwdValid && !checkedPwd && defaultPwdCheck ? (
                    <ErrorText>??????????????? ???????????? ????????????</ErrorText>
                  ) : null}
                </div>
              </div>
            </RightBox>
          </InfoBox>

          <BtnDiv>
            <UpdateDiv>
              <Btn className="update" disabled={disabled}>
                ??????
              </Btn>
            </UpdateDiv>

            <CacelDiv>
              <CancelLink to="/main" style={{ textDecoration: 'none' }}>
                <Btn className="cancel">??????</Btn>
              </CancelLink>
            </CacelDiv>
          </BtnDiv>
        </FormBox>
      </Container>
    </Background>
  )
}

export default UpdateProfile
