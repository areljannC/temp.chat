// EXTERNAL IMPORTS
import * as Yup from 'yup';

// LOCAL IMPORTS
import { FIELD } from './constants';

const FormValidationSchema = Yup.object({
  [FIELD.NAME.NAME]: Yup.string().required('Name required.'),
  [FIELD.ROOM.NAME]: Yup.string().required('Room required.'),
  [FIELD.USE_PRIVATE_ROOM.NAME]: Yup.boolean(),
  [FIELD.PASSWORD.NAME]: Yup.string().when(FIELD.USE_PRIVATE_ROOM.NAME, {
    is: true,
    then: (schema) => schema.required('Room password required.')
  })
});

export default FormValidationSchema;
