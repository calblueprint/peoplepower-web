import { getOwnerFromPerson, getAdminTable } from './adminHelper';
import { getRecord } from './request';

export default function applyCredentials(userID) {
  const OWNER_TABLE = 'Owner';
  const SUBSCRIBER_OWNER = 'Subscriber';
  const GENERAL_OWNER = 'General';

  let credentials = '';

  return getOwnerFromPerson(userID).then(ownerID => {
    return getAdminTable(ownerID)
      .then(isAdminPayload => {
        if (isAdminPayload !== -1) {
          credentials += 'A';
        }
      })
      .then(() => {
        return getRecord(OWNER_TABLE, ownerID);
      })
      .then(ownerRecord => {
        const ownerTypes = ownerRecord.record['Owner Type'];

        if (ownerTypes.includes(SUBSCRIBER_OWNER)) {
          credentials += 'S';
        }

        if (ownerTypes.includes(GENERAL_OWNER)) {
          credentials += 'G';
        }

        return credentials;
      });
  });
}
