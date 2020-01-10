import { getOwnerFromPerson, getAdminTable } from './adminUtils';
import { getOwnerById } from './request';
import constants from '../constants';
import { Columns } from './schema';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

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
        const ownerTypes = ownerRecord[Columns.Owner.OwnerType];

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
