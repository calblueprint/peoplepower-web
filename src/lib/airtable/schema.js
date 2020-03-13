/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  Owner: 'Owner',
  ProjectGroup: 'Project Group',
  Announcement: 'Announcement',
  SolarProject: 'Solar Project',
  SubscriberBill: 'Subscriber Bill',
  RateSchedule: 'Rate Schedule',
  PledgeInvite: 'Pledge Invite',
  Payment: 'Payment',
  TestDevelopment: 'Test (Development)'
};

export const Columns = {
  Owner: {
    primaryKey: `Primary Key`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    projectGroupId: `Project Group`,
    paymentIds: `Payments`,
    ownerTypes: `Owner Types`,
    id: `ID`,
    subscriberBillIds: `Subscriber Bills`,
    pledgeInvite: `Pledge Invite`,
    adminOfId: `Admin Of`,
    numberOfShares: `Number of Shares`,
    isReceivingDividends: `Is Receiving Dividends?`,
    solarProjectId: `Solar Project`,
    firstName: `First Name`,
    lastName: `Last Name`,
    email: `Email`,
    alternateEmail: `Alternate Email`,
    permanentStreet1: `Permanent Street 1`,
    permanentStreet2: `Permanent Street 2`,
    permanentCity: `Permanent City`,
    permanentState: `Permanent State`,
    permanentZipcode: `Permanent Zipcode`,
    mailingStreet1: `Mailing Street 1`,
    mailingStreet2: `Mailing Street 2`,
    mailingCity: `Mailing City`,
    mailingState: `Mailing State`,
    mailingZipcode: `Mailing Zipcode`,
    phoneNumber: `Phone Number`,
    onboardingStep: `Onboarding Step`,
    password: `Password`,
    announcementIds: `Announcements`,
    name: `Name`,
    permanentAddress: `Permanent Address`,
    mailingAddress: `Mailing Address`,
    mailingAddressSame: `Mailing Address Same`,
    bylaw1: `Bylaw 1`,
    bylaw2: `Bylaw 2`,
    certifyPermanentAddress: `Certify Permanent Address`,
    rateScheduleId: `Rate Schedule`,
    latestBillNumber: `Latest Bill Number`,
    meterId: `Meter ID`,
    isSuperAdmin: `Is Super Admin?`,
    invited: `Invited?`
  },
  'Project Group': {
    primaryKey: `Primary Key`,
    ownerIds: `Owners`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    isPublic: `Is Public?`,
    isTakingPledges: `Is Taking Pledges?`,
    name: `Name`,
    solarProjectIds: `Solar Projects`,
    adminIds: `Admins`,
    announcementIds: `Announcements`,
    street1: `Street 1`,
    street2: `Street 2`,
    state: `State`,
    zipcode: `Zipcode`,
    city: `City`,
    description: `Description`,
    latitude: `Latitude`,
    longitude: `Longitude`,
    isDefault: `Is Default?`,
    id: `ID`,
    address: `Address`,
    pledgeInviteId: `Pledge Invite`
  },
  Announcement: {
    primaryKey: `Primary Key`,
    link: `Link`,
    attachments: `Attachments`,
    projectGroupId: `Project Group`,
    authorId: `Author`,
    message: `Message`,
    eventType: `Event type`,
    id: `ID`,
    location: `Location`,
    time: `Time`,
    title: `Title`,
    isGlobal: `Is Global?`
  },
  'Solar Project': {
    primaryKey: `Primary Key`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    name: `Name`,
    size: `Size`,
    address: `Address`,
    status: `Status`,
    projectGroupId: `Project Group`,
    street1: `Street 1`,
    street2: `Street 2`,
    city: `City`,
    state: `State`,
    zipcode: `Zipcode`,
    id: `ID`,
    subscriberIds: `Subscribers`,
    enphaseSystemId: `Enphase System ID`,
    enphaseUserId: `Enphase User ID`,
    subscriberBillId: `Subscriber Bill`
  },
  'Subscriber Bill': {
    primaryKey: `Primary Key`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    subscriberId: `Subscriber`,
    statementDate: `Statement Date`,
    startDate: `Start Date`,
    endDate: `End Date`,
    rateScheduleId: `Rate Schedule`,
    estimatedRebate: `Estimated Rebate`,
    previousTotalEstimatedRebate: `Previous Total Estimated Rebate`,
    balanceOnPreviousBill: `Balance on Previous Bill`,
    paymentIds: `Payments`,
    amountDue: `Amount Due`,
    id: `ID`,
    statementNumber: `Statement Number`,
    netPgeUsage: `Net PGE Usage`,
    ebceRebate: `EBCE Rebate`,
    systemProduction: `System Production`,
    ppRate: `PP Rate`,
    rebateRate: `Rebate Rate`,
    currentCharges: `Current Charges`,
    balance: `Balance`,
    amountReceived: `Amount Received`,
    totalEstimatedRebate: `Total Estimated Rebate`,
    status: `Status`,
    solarProjectId: `Solar Project`,
    billPdf: `Bill PDF`,
    dueDate: `Due Date`
  },
  'Rate Schedule': {
    primaryKey: `Primary Key`,
    subscriberBillId: `Subscriber Bill`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    rate: `Rate`,
    rebateRate: `Rebate Rate`,
    id: `ID`,
    subscriberIds: `Subscribers`
  },
  'Pledge Invite': {
    primaryKey: `Primary Key`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    firstName: `First Name`,
    lastName: `Last Name`,
    shareAmount: `Share Amount`,
    wantsDividends: `Wants Dividends?`,
    phoneNumber: `Phone Number`,
    email: `Email`,
    id: `ID`,
    projectGroupId: `Project Group`
  },
  Payment: {
    primaryKey: `Primary Key`,
    dateCreated: `Date Created`,
    dateUpdated: `Date Updated`,
    ownerId: `Owner`,
    status: `Status`,
    type: `Type`,
    amount: `Amount`,
    subscriberBillId: `Subscriber Bill`,
    orderId: `Order ID`,
    payerId: `Payer ID`,
    currencyCode: `Currency Code`,
    address: `Address`,
    payerFullName: `Payer Full Name`,
    intent: `Intent`,
    paymentCreateTime: `Payment Create Time`,
    paymentUpdateTime: `Payment Update Time`,
    notes: `Notes`,
    payerEmail: `Payer Email`,
    id: `ID`
  },
  'Test (Development)': {
    name: `Name`,
    tag: `Tag`,
    id: `ID`
  }
};
