import Axios from 'axios';
import { useDispatch } from 'react-redux';

export const avatarUpload = (e) => {
  const dispatch = useDispatch();
  const reader = new FileReader();
  console.log(e.target.files[0]);
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = async (e) => {
    console.log(e);
    await Axios.patch(`/api/user/${myUser.id}`, {
      avatar: e.target.result,
    });
    dispatch({
      type: 'user:avatar',
      avatar: e.target.result,
    });
  };
};
