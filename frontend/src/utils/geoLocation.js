export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("geoLoction not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          coordinates: [longitude, latitude], // for mongo db..
          latitude,
          longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};
