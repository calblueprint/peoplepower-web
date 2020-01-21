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

export default validatePersonRecord;
