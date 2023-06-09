'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46658757/original/212a11c6-4dec-478e-ba6f-89a45aebeec9.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/dd6c3149-2dc5-4290-af11-e65332738dcb.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/ba3fb5c2-da41-49e3-8344-3627b73b560b.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/b3551264-26a8-4377-a238-6dd1bd10bc36.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/f6a7d16d-983b-4dde-8d82-46c216520624.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-760766275864145425/original/bf1dba92-33ee-4ecb-bb61-ecfed4ea68ac.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-754495540134475520/original/ecdec66f-24ae-4737-af3f-74ad912bff13.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-754495540134475520/original/0b06c666-a476-4665-9715-85c1b48bd665.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-754495540134475520/original/b0840b6a-b8b2-44d2-82e7-cea8cbb829b1.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-754495540134475520/original/7d7b3339-5faf-44f3-b30f-702b29ba81a9.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679717885782059577/original/a3d4cf01-7b9b-4b5f-86af-f43321ba8509.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679717885782059577/original/f9354364-5554-4df0-8dfd-82f531132b06.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-679717885782059577/original/113c602c-dcd6-404d-93b6-f74465a48e06.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679717885782059577/original/983b77e9-4fa9-45ae-84fe-c2069cfe1bd5.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679717885782059577/original/3fe65c01-4ce2-427c-a104-4a58052b9300.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565074596864265259/original/911ba5bb-27fd-46e2-92f8-0453e4f09199.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565074596864265259/original/100caebd-e209-4b46-9968-f30eb4154b8c.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565074596864265259/original/845084af-d8c8-416b-84f9-d50ff4e7e19e.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565074596864265259/original/a720a583-8ce9-4efe-84d4-5514871abfc8.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565074596864265259/original/988d6bab-7eb4-4216-b81f-6a9a3f2f0fcc.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36914685/original/422bc5e3-7e8e-4906-ae76-176fddc0530e.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/09e82837-3d76-4795-a388-7d782d10a310.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36914685/original/e1622930-d1d3-4271-b19c-b348ee72fe96.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/c3f080df-3925-4eac-b61d-6c1b7fad4dbc.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/47220dbb-6d7f-49b6-8ccb-e35cd757dfdc.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-874893321750016859/original/4a6672c7-0d73-42e9-99ed-1a28ef431a07.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-874893321750016859/original/389a82a3-63b1-494f-a86e-2f56171f5849.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-874893321750016859/original/ac03a9c8-8b8e-4a7b-ac38-407c0a841c8a.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-874893321750016859/original/e2da35d1-20a3-496a-997d-f202640acf03.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-874893321750016859/original/30d78d98-954e-480a-b2ce-3004a5f0cf29.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695654868998429767/original/93cafadc-224e-447f-bfbe-486a97b2ab4d.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695654868998429767/original/265b1fd6-2140-40f1-b340-3231fa6cd643.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695654868998429767/original/a4590217-158c-4d4b-b7d4-cc502449da41.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695654868998429767/original/40691585-e946-4489-87cf-0f14fdb0e265.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695654868998429767/original/2f83937e-9887-408e-97e7-c9331f352361.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-807853905177847526/original/1adb0001-7a1e-4544-becd-74ec9bb4d641.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-807853905177847526/original/496f1f71-dcfe-4a0b-a156-85e49a170f6d.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-807853905177847526/original/907c3d9e-46e7-4c42-99fc-e92c9a23ab5f.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-807853905177847526/original/ef72abe8-35af-4a23-a303-11ccf083624b.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-807853905177847526/original/aa83ab3b-9812-4193-9633-bb26f3dda5ca.jpeg?im_w=720',
        preview: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
