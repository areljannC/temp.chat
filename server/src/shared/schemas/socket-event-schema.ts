// EXTERNAL IMPORTS
import Joi from 'joi';

// SHARED IMPORTS
import { SOCKET_EVENT } from '@constants';

const socketEventSchema = Joi.object({
  timestamp: Joi.number().required().messages({
    'number.base': '`timestamp` must be a number.',
    'any.required': '`timestamp` is required.'
  }),
  type: Joi.string()
    .valid(
      SOCKET_EVENT.ROOM.CREATE,
      SOCKET_EVENT.ROOM.JOIN,
      SOCKET_EVENT.ROOM.LEAVE,
      SOCKET_EVENT.MESSAGE.SEND,
      SOCKET_EVENT.WHISPER.SEND
    )
    .required()
    .messages({
      'string.base': '`type` must a string.',
      'any.valid': '`type` must be a valid socket event type.',
      'any.required': '`type` is required.'
    }),
  data: Joi.object({
    user: Joi.object({
      uuid: Joi.string().required().messages({
        'string.base': '`uuid` must be a string.',
        'any.required': '`uuid` is required.'
      }),
      name: Joi.string().required().messages({
        'string.base': '`name` must be a string.',
        'any.required': '`name` is required.'
      })
    })
      .required()
      .messages({
        'object.base': '`user` must be an object containing user info.',
        'any.required': '`user` is required.'
      }),
    room: Joi.object({
      uuid: Joi.string().required().messages({
        'string.base': '`uuid` must be a string.',
        'any.required': '`uuid` is required.'
      }),
      name: Joi.string().required().messages({
        'string.base': '`name` must be a string.',
        'any.required': '`name` is required.'
      }),
      password: Joi.string().messages({ 'boolean.base': '`password` must be a string.' })
    })
      .required()
      .messages({
        'object.base': '`room` must be an object containing room info.',
        'any.required': '`room` is required.'
      }),
    message: Joi.string().messages({ 'string.base': '`message` must be a string.' })
  })
    .required()
    .messages({
      'any.required': '`data` is required.'
    })
});

export default socketEventSchema;
