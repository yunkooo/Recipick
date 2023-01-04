import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ProfileWrapper,
  Follow,
  Followers,
  Followings,
  Profile,
  ButtonWrapper,
  UserProfileWrapper,
} from './UserProfile.style';
import Button from './../../../../Components/Common/Button/Button';
import ProfileThumb from './../../../../Components/Common/ProfileThumb/ProfileThumb';
import iconChat from '../../../../Assets/Icons/icon_chat.png';
import iconShare from '../../../../Assets/Icons/icon_share.png';
import Product from '../../../../Components/Product/Product';
import GetPost from '../../../../Components/Common/GetPost/GetPost';
import { getProfile, unFollow, follow } from '../../../../API/api';
import Alert from '../../../../Components/Common/Alert/Alert';

export default function UserProfile() {
  // 유저 프로필 정보 가져오기

  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [follower, setFollower] = useState('');
  const [following, setFollowing] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const [isOwn, setIsOwn] = useState(false);
  const { accountName } = useParams();
  const localID = localStorage.getItem('user ID');
  const ownCheck = (urlID, ownID) => {
    urlID === ownID ? setIsOwn(true) : setIsOwn(false);
  };

  const [isFollowing, setIsFollowing] = useState();

  const followClickHandler = () => {
    if (isFollowing) {
      unFollow(name).then(response => setIsFollowing(response));
    } else {
      follow(name).then(response => setIsFollowing(response));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsAlert(true);
  };

  useEffect(() => {
    getProfile(accountName).then(response => {
      const { accountname, username, intro, image, followerCount, isfollow, followingCount } = response.profile;

      setUserId(prev => accountname);
      setName(prev => username);
      setIntroduce(prev => intro);
      setProfileImg(prev => image);
      setFollower(prev => followerCount);
      setFollowing(prev => followingCount);

      ownCheck(accountName, localID);

      setIsFollowing(isfollow);
    });
  }, []);
  return (
    <>
      <UserProfileWrapper>
        <ProfileWrapper>
          <Follow>
            <Followers>
              <Link to={`/profile/${userId}/followers`}>
                <strong>{follower}</strong>
                <p>followers</p>
              </Link>
            </Followers>
            <ProfileThumb size='xlarge' src={profileImg} />
            <Followings>
              <Link to={`/profile/${userId}/following`}>
                <strong>{following}</strong>
                <p>followings</p>
              </Link>
            </Followings>
          </Follow>
          <Profile>
            <strong>{name}</strong>
            <span>@ {userId}</span>
            <p>{introduce}</p>
          </Profile>
          <ButtonWrapper>
            {isOwn ? (
              <>
                <Button
                  className='small'
                  disabled={false}
                  onClick={() => navigate(`/profile/${accountName}/edit`)}
                  content='프로필 수정'
                />
                <Button className='small' disabled={false} onClick={() => navigate('/product')} content='상품 등록' />
              </>
            ) : (
              <>
                <div>
                  <img src={iconChat} alt='채팅하기 버튼' onClick={() => navigate(`/chat/${accountName}`)} />
                </div>
                {isFollowing ? (
                  <Button className='medium' content='취소' disabled={false} active onClick={followClickHandler} />
                ) : (
                  <Button className='medium' content='팔로우' disabled={false} onClick={followClickHandler} />
                )}

                <button onClick={handleCopy}>
                  <img src={iconShare} alt='공유하기' />
                </button>
              </>
            )}
          </ButtonWrapper>
        </ProfileWrapper>
        <Product accountName={userId} />
        <GetPost userId={userId} />
      </UserProfileWrapper>
      {isAlert && <Alert alertMSG='주소가 복사되었습니다' stateFunc={setIsAlert} />}
    </>
  );
}
