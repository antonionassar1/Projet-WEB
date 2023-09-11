import { USERS } from '../shared/users';

//State is USERS[0] temporarily
export const User = (state = USERS[0], action) => {
    switch (action.type) {
        default:
          return state;
      }
};