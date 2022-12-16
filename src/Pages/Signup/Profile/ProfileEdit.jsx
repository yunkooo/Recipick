import React from 'react';
import {
  ProfileWrapper,
  ProfileTitle,
  InputWrapper,
  Label,
  Input,
  DescText,
  InpImg,
  ImgLabel,
  ImgInp,
} from './ProfileEdit.style';
import Button from '../../../Components/Common/Button/Button.style';
import ProfileThumb from '../../../Components/Common/ProfileThumb/ProfileThumb';
import ImgBtnUpload from '../../../Assets/Images/btn_upload_file_mainColor.png';

export default function ProfileEdit() {
  return (
    <ProfileWrapper>
      <ProfileTitle>프로필 설정</ProfileTitle>
      <DescText>나중에 언제든지 변경 할 수 있습니다.</DescText>
      <form>
        <InpImg>
          <ProfileThumb />
          <ImgLabel htmlFor='userImgInp'>
            <img src={ImgBtnUpload} alt='유저 이미지 등록' />
          </ImgLabel>
          <ImgInp id='userImgInp' type='file' />
        </InpImg>
        <InputWrapper>
          <Label htmlFor='userName'>사용자 이름</Label>
          <Input id='userName' type='text' placeholder='2~10자 이내여야 합니다.' required />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor='userId'>계정 ID</Label>
          <Input id='userId' type='text' placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.' required />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor='userDesc'>소개</Label>
          <Input id='userDesc' type='text' placeholder='자신과 판매할 상품에 대해 소개해 주세요!' required />
        </InputWrapper>
        <Button className='large' content='시작하기' />
      </form>
    </ProfileWrapper>
  );
}
