import React from 'react';
import { UserWrapper } from '../../Components/comment/commentItem.style';
import { AuthorInfo, CommentInputBox, CommentInput } from './comment.style';
import ProfileThumb from '../Common/ProfileThumb/ProfileThumb';
import Button from '../Common/Button/Button.style';

export function MyCommentInput({ inputValue }) {
  return (
    <CommentInputBox>
      <UserWrapper>
        <ProfileThumb size='small' />
        <CommentInput placeholder='댓글 입력하기' /> {/* <PostContent content={inputValue} />; */}
      </UserWrapper>
      <Button className='small' content='게시' />
    </CommentInputBox>
  );
}
