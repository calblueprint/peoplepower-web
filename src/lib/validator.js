// VALIDATION FUNCTIONS
const validateRecordAndField = record => {
  if (record == null) {
    throw Error('null record passed into validateRecordAndField');
  }
  if (record == null) {
    throw Error(
      'record passed into validateRecordAndField has no field record'
    );
  }
};

const validatePersonRecord = record => {
  validateRecordAndField(record);
  if (record.ID == null) {
    throw Error('null record.ID passed into validatePersonRecord');
  }
};

const validateSubscriberOwnerRecord = res => {
  if (res == null) {
    throw Error('null passed into validateSubscriberOwnerRecord');
  }

  if (res.length < 1) {
    throw Error('record has length < 1');
  }

  if (res[0] == null) {
    throw Error('res has no 0th item');
  }
};

export { validatePersonRecord, validateSubscriberOwnerRecord };
