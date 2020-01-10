import { getOwnerFromPerson, getAdminTable } from './adminUtils';
import { getOwnerById } from './request';
import constants from '../constants';

const { OWNER_TYPE_FIELD, SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

export default function applyCredentials(userID) {
  let credentials = '';

  if (userID == null) {
    return credentials;
  }

  return getOwnerFromPerson(userID).then(ownerID => {
    return getAdminTable(ownerID)
      .then(isAdminPayload => {
        if (isAdminPayload !== -1) {
          credentials += 'A';
        }
      })
      .then(() => {
        return getOwnerById(ownerID);
      })
      .then(ownerRecord => {
        const ownerTypes = ownerRecord[OWNER_TYPE_FIELD];

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
