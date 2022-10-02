export const FIELD = Object.freeze({
  NAME: Object.freeze({
    ID: 'name-input',
    NAME: 'name',
    LABEL: 'Name',
    PLACEHOLDER: 'ex. random_name_9999'
  }),
  ROOM: Object.freeze({
    ID: 'room-input',
    NAME: 'room',
    LABEL: 'Room',
    PLACEHOLDER: 'ex. random_room_9999'
  }),
  USE_PRIVATE_ROOM: Object.freeze({
    ID: 'usePrivateRoom-checkbox',
    NAME: 'usePrivateRoom',
    LABEL: 'Use private room?'
  }),
  PASSWORD: Object.freeze({
    ID: 'password-input',
    NAME: 'password',
    LABEL: 'Password'
  })
});

export const BUTTON = Object.freeze({
  CREATE_ROOM: Object.freeze({
    ID: 'createRoom-button',
    NAME: 'createRoom',
    LABEL: 'Create Room'
  }),
  JOIN_ROOM: Object.freeze({
    ID: 'joinRoom-button',
    NAME: 'joinRoom',
    LABEL: 'Join Room'
  })
});
